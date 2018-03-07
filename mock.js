// 设定自定义接口前缀
const prefix = '/api/v1/'

const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path')
const srcPath = path.resolve(__dirname, './api')

// 读取当前所有接口文件
function getApis () {
  let apis = []
  let result = fs.readdirSync(srcPath)
  result.forEach(r => {
    apis.push(r.split('.')[0])
  })
  return apis
}
const apis = getApis()

app.all('*', (req, res) => {
  // 处理接口前缀是否正确
  if (req.originalUrl.substr(0, prefix.length) !== prefix) {
    console.log('接口前缀不正确')
    res.json({"error": "接口前缀不正确"})
    return
  }

  // 分析接口参数
  let apiStr = req.originalUrl.replace(new RegExp(prefix), '')
  let apiName = apiStr.split('/')[0]
  let apiId = apiStr.split('/')[1]

  // 处理接口不存在的状态
  if (apis.indexOf(apiName) === -1) {
    console.log('访问接口不存在')
    res.json({"error": "访问接口不存在"})
    return
  }

  // 引入接口文件
  let apiJs = require('./api/' + apiName)

  // 处理接口文件内容不完善
  if (apiId) {
    if (!apiJs.item) {
      console.log('mock数据不完善，请完善文件')
      res.json({"error": "mock数据不完善，请完善文件"})
      return
    }
  } else {
    if (!apiJs.list) {
      console.log('mock数据不完善，请完善文件')
      res.json({"error": "mock数据不完善，请完善文件"})
      return
    }
  }
  let resultObj = apiId ? apiJs.item : apiJs.list

  // 处理方法不存在
  let regMethod = req.method.toLowerCase()
  if (!resultObj[regMethod]) {
    console.log('请求接口不存在该方法')
    res.json({"error": "请求接口不存在该方法"})
    return
  }

  // 返回相应数据
  res.json(resultObj[regMethod])
})
app.listen(3000, () => console.log('Simple mock listening on port 3000!'))
