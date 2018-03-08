const config = require('./config')
const express = require('express')
const fs = require('fs')
const path = require('path')

const prefix = config.prefix
const port = config.port

const app = express()

const srcPath = path.resolve(__dirname, './api')

// Get all the api files
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
  // Processing error prefix
  if (req.originalUrl.substr(0, prefix.length) !== prefix) {
    res.json({"error": "error prefix"})
    return
  }

  // Analysis parameters
  let apiStr = req.originalUrl.replace(new RegExp(prefix), '')
  let apiName = apiStr.split('/')[0]
  let apiId = apiStr.split('/')[1]

  // Processing api files undefined
  if (apis.indexOf(apiName) === -1) {
    res.json({"error": apiName + " is undefined"})
    return
  }

  // Auto load api file
  let apiJs = require('./api/' + apiName)

  // Processing api file error
  if (apiId) {
    if (!apiJs.item) {
      res.json({"error": "Incomplete api files"})
      return
    }
  } else {
    if (!apiJs.list) {
      res.json({"error": "Incomplete api files"})
      return
    }
  }
  let resultObj = apiId ? apiJs.item : apiJs.list

  // Processing Method undefined
  let reqMethod = req.method.toLowerCase()
  if (!resultObj[reqMethod]) {
    res.json({"error": "Method undefined"})
    return
  }

  // Return the correct data
  res.json(resultObj[reqMethod])
})
app.listen(port, () => console.log('Simple mock listening on port ' + port + '!'))
