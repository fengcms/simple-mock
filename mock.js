// Modify your api prefix
const config = require('./config')
const prefix = config.prefix
const port = config.port
const express = require('express')
const fs = require('fs')
const app = express()
const path = require('path')
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
  let regMethod = req.method.toLowerCase()
  if (!resultObj[regMethod]) {
    res.json({"error": "Method undefined"})
    return
  }

  // Return the correct data
  res.json(resultObj[regMethod])
})
app.listen(port, () => console.log('Simple mock listening on port ' + port + '!'))
