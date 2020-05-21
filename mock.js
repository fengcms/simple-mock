// 引用 http 服务依赖
const express = require('express')
const cookieParser = require('cookie-parser')
const formidableMiddleware = require('express-formidable')
const { createProxyMiddleware } = require('http-proxy-middleware')
// 引入辅助三方依赖
const fs = require('fs')
const path = require('path')
const clc = require('cli-color')
// 引入配置文件
const config = require('./config')
// 引入自定义工具库
const utils = require('./utils')

const { prefix = '/api/v1/', port = 3000, host = 'localhost', delay = 0, checkToken, proxyConfig } = config

function calcApiLink (apis) {
  const res = []
  apis.forEach(api => {
    res.push(`http://${host}:${port}${prefix}${api}`)
  })
  return res
}

function showApisList (apis) {
  apis.forEach((api, index) => {
    index < 5 && console.log(clc.cyan(`[apilink] ${api}`))
  })
}

// Get all the api files
function getApis () {
  const srcPath = path.resolve(__dirname, './api')
  const apis = []
  const result = fs.readdirSync(srcPath)
  result.forEach(r => {
    const apiName = r.split('.')[0]
    apiName && apis.push(apiName)
  })
  return apis
}
function sendData(data, res) {
  if (utils.toType(data) === 'object') {
    res.json(data)
  } else {
    res.status(500).json({"error": "Internal Server Error"})
  }
}

const apis = getApis()
const apiLink = calcApiLink(apis)

showApisList (apiLink)

const app = express()
app.use(cookieParser())
app.use(formidableMiddleware())

// 默认首页
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/home.html')
})

// 代理接口处理
const proxyApis = []
if (proxyConfig.status) {
  const { proxyApiList, proxyOption } = proxyConfig
  proxyApiList.forEach(i => {
    if (!i) return
    const apiName = prefix + i
    proxyApis.push(`http://${host}:${port}${apiName}`)
    app.use(apiName, createProxyMiddleware(proxyOption))
  })
}

app.get('/all-apis', (req, res) => {
  res.json({
    host, port, prefix, proxyApis,
    "mockApis": apiLink,
  })
})
// mock 接口处理
app.all('*', (req, res) => {
  // Processing error prefix
  if (req.originalUrl.substr(0, prefix.length) !== prefix) {
    res.status(404).json({"error": "api prefix error"})
    return
  }

  // Analysis parameters
  const apiStr = req.params['0'].replace(new RegExp(prefix), '')
  const [apiName, apiId] = apiStr.split('/')

  // Processing api files undefined
  if (apis.indexOf(apiName) === -1) {
    res.status(404).json({"error": apiName + " not found"})
    return
  }

  // Auto load api file
  const apiJs = require('./api/' + apiName)

  // Processing api file error
  if ((apiId && !apiJs.item) || (!apiId && !apiJs.list)) {
    res.status(404).json({
      "error": `${apiName} not found, Please check /api/${apiName}.js`
    })
    return
  }

  const resObj = apiId ? apiJs.item : apiJs.list
  // Processing Method undefined
  const reqMethod = req.method.toLowerCase()
  if (!resObj[reqMethod]) {
    res.status(403).json({"error": "Method not supported"})
    return
  }

  // check token
  if (checkToken.status) {
    const { tokenField, tokenPosition, noTokenApiList } = checkToken
    const noTokenApi = noTokenApiList.includes(apiName)
    const hasToken = req[tokenPosition][tokenField.toLowerCase()]
    if (!noTokenApi && !hasToken) {
      res.status(401).json({"error": "没有登录"})
      return
    }
  }

  // Return Response Data
  setTimeout(() => {
    let data = resObj[reqMethod]
    // 因使用 formidableMiddleware 处理 form-data 数据，导致自带中间件无法兼容
    // 所以在这里将 formidableMiddleware 的 fields 字段 = body 字段
    // 保持 mock 接口编写文件的书写习惯一致, 毕竟都是习惯 req.body 拿数据的
    req.body = req.fields
    if (utils.toType(data) === 'function') {
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
