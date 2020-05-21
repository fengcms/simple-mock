# Mock 接口开发说明


## 简单接口说明

对于我们要 `mock` 的接口，只需要在 `/api` 文件夹中，创建一个与接口名同名的 `js` 文件，然后编写以下的基本结构，然后在对应请求方法里面，放上模拟数据即可。

```js
module.exports = {
  name: '书本',
  info: '这是一个完整的 RESTFul 接口的演示文件',
  // GET POST /book 接口 的 Mock 数据
  list: {
    get: {},
    post: {}
  },
  // GET PUT DETETE /book/:id 接口 的 Mock 数据
  item: {
    get: {},
    put: {},
    delete: {}
  }
}
```

在最简单的情况下，这样做就可以满足基本的使用需求了。如果你希望有所变化，比如根据不同的参数，返回不同的内容，这里也是支持的。这些请求方法字段除了支持对象，还支持函数。并且，在函数入参中，是可以拿到请求的各种参数的。

## 使用函数构建动态数据

如 `/api/boy.js` 这个演示文件里，代码如下：

```js
// 模拟分页数据
const { mockPageListData } = require('../utils')
const makeList = (req, res) => {
  // 从请求中获取 pageSize 和 page 参数，如是 post 请求，则从 req.body 中获取
  let { pageSize, page } = req.query
  pageSize = Number(pageSize) || 10
  page = Number(page) || 1
  // 通过 mockPageListData 函数 mock 分页数据
  // #INDEX# 字符串会替换为动态循环的 index 值，通常用于模拟ID
  // 如 mockPageListData 无法满足你的需求，可以参考其逻辑，自行构建更强大的方法
  const list = mockPageListData(
    {
      id: '#INDEX#',
      name: 'Boy\'s Name #INDEX#'
    },
    page,
    pageSize
  )
  // 返回 mock 数据
  res.json({
    status: 0,
    data: {
      list,
      page,
      count: parseInt(pageSize * 4.5)
    }
  })
}
module.exports = {
  name: '男生',
  info: '普通分页接口的演示文件',
  list: {
    get: makeList
  }
}
```

由于项目底层采用了 `express` 框架，因此，在这个函数里面，是可以完整的支持 `express` 的所有功能的。针对常见的分页数据，我写了一个公共方法，简化我们的 `mock` 数据的难度。如果这个公共方法不能满足你的需求，你可以自己参考代码逻辑，去写相应的逻辑。

## 读取请求参数信息

底层使用了 `express-formidable` 中间件，因此在函数中，可以通过 `req.body` 来获取客户端发起的请求的各种参数。同时 `cookie-parser` 中间件，支持对客户端的 `cookie` 进行设置。

具体使用，可以参考 [/api/login.js](https://github.com/fengcms/simple-mock/blob/master/api/login.js) 文件，这里面对获取参数和设置 `cookie` 都有简单的演示。

上传文件也是支持的。[/api/upload.js](https://github.com/fengcms/simple-mock/blob/master/api/upload.js) ，文件简单的演示了上传文件接口。

----

总结一下，如果简单的使用，直接复制 `mock` 数据进来就可以了。如果要使用高级一点的功能，可以自己构建函数来实现动态数据。并且由于采用了  `express-formidable` `cookie-parser` 等中间件，因此，基本的各种功能都可以实现。

写法都是纯粹的 `javascript` ，不需要额外的学习啥特殊的东西。

当然，如果对 `express` 框架有一些想法，可以去 [express 官方网站](https://expressjs.com/zh-cn/) 里查找各种资料。

即使是纯粹的前端开发人员（没有写过任何后端程序的开发人员），阅读这些文档都是没有任何压力的。

祝好！

如果还有哪里没有说清楚的，可以给我发起 `Issues`，我会听取大家的意见，逐渐完善项目的各种文档。


