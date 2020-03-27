const config = require('./config')
const express = require('express')
const fs = require('fs')
const path = require('path')
const clc = require('cli-color')

const prefix = config.prefix || '/api/v1/'
const port = config.port || 3000
const host = config.host || 'localhost'

const app = express()

const srcPath = path.resolve(__dirname, './api')

function calcApiLink (apis) {
  const res = []
  apis.forEach(api => {
    res.push(`http://${host}:${port}${prefix}${api}`)
  })
  return res
}

function showApisList (apis) {
  apis.forEach((api, index) => {
    index < 10 && console.log(clc.cyan(`[apilink] ${api}`))
  })
}

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
const apiLink = calcApiLink(apis)

showApisList (apiLink)

app.get('/', (req, res) => {
  res.json({
    host, port, prefix,
    "apis": apiLink
  })
})

app.all('*', (req, res) => {
  // Processing error prefix
  if (req.originalUrl.substr(0, prefix.length) !== prefix) {
    res.json({"error": "error prefix"})
    return
  }

  // Analysis parameters
  let apiStr = req.originalUrl.replace(new RegExp(prefix), '')
  let apiName = apiStr.split('/')[0].split('?')[0]
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
app.listen(
  port,
  host,
  () => {
    console.log(`Simple mock listening on http://${host}:${port}!`)
  }
)
