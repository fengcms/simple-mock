[README](https://github.com/fengcms/simple-mock/blob/master/README.md) | [中文说明](https://github.com/fengcms/simple-mock/blob/master/README-CN.md)

# Simple mock server

This is a simple restful style mock service project

## Installation

```#
git clone https://github.com/fengcms/simple-mock

cd simple-mock

npm install

npm start
```

## How to use

### Config api prefix or listening port

You can edit `config.js` file.

```js
module.exports = {
  prefix: '/api/v1/',
  port: 3000,
  host: '0.0.0.0'
}
```

### Add mock api

If you need a mock api is `book`, You can create a new file under the API folder. The name of the file is `book.js` or `book.json`. and then you can write this file.

#### Demo of book.js

Like this.

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
      msg: 'add success'
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
      msg: 'edit success'
    },
    delete: {
      status: 0,
      msg: 'delete success'
    }
  }
}
```

the `list` content is for `/book` api, and the `item` is for `/book/:id` api.

You need to support some kind of request method, create an object key value with the lowercase of the name of the method, and then write the mock data in it.

If you need to create some data in a circular way, you can also write a function.

Like this:

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

#### Demo of book.json

Of course, this project also supports the JSON file format. And it's easier to write, for example, the example above can be written in this way:

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

For more examples, look directly at the sample file under the `api` folder

## Request sample

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
