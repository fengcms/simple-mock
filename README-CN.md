
[README](https://github.com/fengcms/simple-mock/blob/master/README.md) | [中文说明](https://github.com/fengcms/simple-mock/blob/master/README-CN.md)

# Simple mock server

这是一个简单的支持 `restful` 风格的 `mock` 服务项目。

## 安装

```#
git clone https://github.com/fengcms/simple-mock

cd simple-mock

npm install

npm start
```

## 使用

### 配置前缀和运行端口

我们可以通过编辑 `config.json` 文件来进行这两项配置。

```JSON
{
  "prefix": "/api/v1/",
  "port": 3000
}
```

### 添加一个新的接口

我们只需要在 `api` 文件夹当中添加一个以接口名命名的 `js` 或者 `json` 文件即可。例如，我们现在需要一个 `book` 的接口，就直接添加一个 `book.js` 或者 `book.json` 文件，然后编辑它就可以了。

当然，这个文件还是有一定的规范的。


#### book.js 的示例

像这样就可以：

```js
module.exports = {
  list: {
    get: {
      status: 0,
      data: {
        list: [
          {
            id: 1,
            name: 'The three-body problem'
          }, {
            id: 2,
            name: 'Interstellar'
          }
        ]
      }
    },
    post: {
      status: 0,
      msg: '添加成功'
    }
  },
  item: {
    get: {
      status: 0,
      data: {
        id: 1,
        name: 'The three-body problem'
      }
    },
    put: {
      status: 0,
      msg: '修改成功'
    },
    delete: {
      status: 0,
      msg: '删除成功'
    }
  }
}
```

一般 `restful` 风格的接口，我们会对应两种请求方式，分别是 `/book` 和 `/book/:id`。而上面的例子中， `list` 部分的内容就是给  `/book` 使用的。而 `item` 是给  `/book/:id` 使用的。

你需要支持某个请求方法，就以该请求方法的英文小写为键名在对应的区域创建一个对象，而他的值就是你想要返回的数据。

如果你感觉写这些数据比较麻烦，还可以写一个函数来更加方便的创建假数据，像下面的这个例子：

```js
function makeList () {
  let o = []
  for (let i = 0; i < 10; i++) {
    o.push({
      id: i,
      name: 'fungleo'
    })
  }
  return o
}

module.exports = {
  list: {
    get: {
      status: 0,
      data: {
        list: makeList()
      }
    }
  }
}
```

#### book.json 的示例

本项目还支持 `json` 文件格式的假数据接口。基本和上面是一样的，不过不支持循环之类的 `js` 写法。就是直接给一个大 `json` 就OK了。

```JSON
{
  "list": {
    "get": {
      "status": 0,
      "data": {
        "list": [
          {
            "id": 1,
            "name": "The three-body problem"
          }, {
            "id": 2,
            "name": "Interstellar"
          }
        ]
      }
    },
    "post": {
      "status": 0,
      "msg": "add success"
    }
  },
  "item": {
    "get": {
      "status": 0,
      "data": {
        "id": 1,
        "name": "The three-body problem"
      }
    },
    "put": {
      "status": 0,
      "msg": "edit success"
    },
    "delete": {
      "status": 0,
      "msg": "delete success"
    }
  }
}
```
更多的示例，请参看 `api` 文件夹中的文件。

## 接口请求示例

```#
fungleo@GoodBoy ~
$ curl 0.0.0.0:3000/api/v1/book -X GET
{"status":0,"data":{"list":[{"id":1,"name":"The three-body problem"},{"id":2,"name":"Interstellar"}]}}

fungleo@GoodBoy ~
$ curl 0.0.0.0:3000/api/v1/book -X POST
{"status":0,"msg":"add success"}

fungleo@GoodBoy ~
$ curl 0.0.0.0:3000/api/v1/book/1 -X GET
{"status":0,"data":{"id":1,"name":"The three-body problem"}}

fungleo@GoodBoy ~
$ curl 0.0.0.0:3000/api/v1/book/1 -X PUT
{"status":0,"msg":"edit success"}

fungleo@GoodBoy ~
$ curl 0.0.0.0:3000/api/v1/book/1 -X DELETE
{"status":0,"msg":"delete success"}

fungleo@GoodBoy ~
$ curl 0.0.0.0:3000/api/v1/book/1 -X POST
{"error":"Method undefined"}

fungleo@GoodBoy ~
$ curl 0.0.0.0:3000/api/v1/bookS -X POST
{"error":"bookS is undefined"}

fungleo@GoodBoy ~
$ curl 0.0.0.0:3000/api/v2/book -X POST
{"error":"error prefix"}
```

## Copyright and License

Copyright by FungLeo(web@fengcms.com)

License: MIT
