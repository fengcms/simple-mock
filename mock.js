// 引用 http 服务依赖
const express = require('express')
const cookieParser = require('cookie-parser')
const formidableMiddleware = require('express-formidable')
const { createProxyMiddleware } = require('http-proxy-middleware')
// 引入辅助三方依赖
const fs = require('fs')
const path = require('path')
const clc = require('cli-color')
const { intersection } = require('lodash')
// 引入自定义工具库
const { toType } = require('./utils')

// 引入配置
const {
  prefix = '/api/v1/',
  port = 3000,
  host = 'localhost',
  delay = 0,
  checkToken,
  proxyConfig
} = require('./config')

// 计算 mock 对象中包含哪些请求方法
function calcApiMethods (item) {
  const itemMethods = Object.keys(item).map(i => i.toUpperCase())
  const allMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD', 'CONNECT', 'TRACE']
  return intersection(itemMethods, allMethods)
}

// 计算 mock 接口的详细信息
function calcMockApis (apis) {
  const res = []
  Object.keys(apis).forEach(i => {
    const { name = '-', info = '-', list, item } = apis[i]
    const api = `http://${host}:${port}${prefix}${i}`
    if (list) {
      res.push({
        api,
        name,
        info,
        methods: calcApiMethods(list)
      })
    }
    if (item) {
      res.push({
        api: `${api}/:id`,
        name,
        info,
        methods: calcApiMethods(item)
      })
    }
  })
  return res
}

// 在控制台显示 5 条 mock Api 链接
function showApisList (apis) {
  apis.forEach((item, index) => {
    if (index < 5) console.log(clc.cyan(`[apilink] ${item.api}`))
  })
}

// 自动加载所有的 mock 文件并返回
function getApis () {
  const ApisPath = path.resolve(__dirname, './api')
  const apis = {}
  const files = fs.readdirSync(ApisPath)
  files.forEach(fileName => {
    const breakIndex = fileName.lastIndexOf('.')
    const apiName = fileName.slice(0, breakIndex)
    const fileSuffix = fileName.slice(breakIndex)
    if (apiName && ['.js', '.json'].includes(fileSuffix)) {
      const temp = require('./api/' + apiName)
      if (temp) apis[apiName] = temp
    }
  })
  return apis
}

// 给客户端发送数据方法
function sendData (data, res) {
  if (toType(data) === 'object') {
    res.json(data)
  } else {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

/*
  导入所有的 Mock Api，并计算相应信息
*/
const apis = getApis()
const mockApis = calcMockApis(apis)

// 在控制台打印前五条 Mock Api 链接，不喜欢可删除
showApisList(mockApis)

// 创建 Mock App 服务，并使用必要中间件
const app = express()
app.use(cookieParser())
app.use(formidableMiddleware())

// 代理接口处理
const proxyApis = []
if (proxyConfig.status) {
  const { proxyApiList, proxyOption } = proxyConfig
  proxyApiList.forEach(item => {
    const api = item.api || item
    if (!api) return
    const { name = '-', info = '-' } = item
    const fullApi = prefix + api
    proxyApis.push({
      api: `http://${host}:${port}${fullApi}`,
      name,
      info
    })
    app.use(fullApi, createProxyMiddleware(proxyOption))
  })
}

// 默认首页，在首页可以显示我们所有的 mock 和 proxy 接口信息
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './pages/home.html'))
})

// mock 服务信息接口，用于默认首页展示
app.get('/mock-server-info', (req, res) => {
  res.json({ host, port, prefix, proxyApis, mockApis })
})

// mock 接口处理主方法
app.all('*', (req, res) => {
  // 处理接口前缀错误
  if (req.originalUrl.substr(0, prefix.length) !== prefix) {
    res.status(404).json({ error: 'api prefix error' })
    return
  }

  // 从请求路径中获取 接口名称 以及 查询 ID
  const apiStr = req.params['0'].replace(new RegExp(prefix), '')
  const [apiName, apiId] = apiStr.split('/')

  // 从 Mock apis 缓存中取得 apiName 对应的 Mock 信息
  const api = apis[apiName]

  if (!api) {
    res.status(404).json({ error: apiName + ' not found' })
    return
  }

  // 检查请求的接口对应的 Mock 信息是否存在
  if ((apiId && !api.item) || (!apiId && !api.list)) {
    res.status(404).json({
      error: `${apiName}${apiId ? '/:id' : ''} not found, Please check /api/${apiName}.js`
    })
    return
  }

  // 获取对应的 Mock 信息
  const resObj = apiId ? api.item : api.list

  // 检查 Mock 数据是否包含对应的请求方法数据
  const reqMethod = req.method.toLowerCase()
  if (!resObj[reqMethod]) {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  // 根据配置校验登录状态
  if (checkToken.status) {
    const { tokenField = 'token', tokenPosition = 'headers', noTokenApiList } = checkToken
    const noTokenApi = noTokenApiList.includes(apiName)
    const hasToken = req[tokenPosition][tokenField.toLowerCase()]
    if (!noTokenApi && !hasToken) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
  }

  // 返回 Mock 数据
  setTimeout(() => {
    let data = resObj[reqMethod]
    // 因使用 formidableMiddleware 处理 form-data 数据，导致自带中间件无法兼容
    // 所以在这里将 formidableMiddleware 的 fields 字段 = body 字段
    // 保持 mock 接口编写文件的书写习惯一致, 毕竟都是习惯 req.body 拿数据的
    req.body = req.fields
    if (toType(data) === 'function') {
      data = data(req, res)
      data && sendData(data, res)
    } else {
      sendData(data, res)
    }
  }, delay)
})

app.listen(
  port,
  host,
  () => {
    console.log(`Simple mock listening on http://${host}:${port}!`)
  }
)
