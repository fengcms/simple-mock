export default {
  name: '书本',
  info: '这是一个完整的 RESTFul 接口的演示文件',
  // GET POST /book 接口 的 Mock 数据
  list: {
    get: {
      status: 0,
      data: {
        list: [
          {
            id: 1,
            name: 'The three-body problem',
          },
          {
            id: 2,
            name: 'Interstellar',
          },
        ],
      },
    },
    post: {
      status: 0,
      msg: 'add success',
    },
  },
  // GET PUT DETETE /book/:id 接口 的 Mock 数据
  item: {
    get: {
      status: 0,
      data: {
        id: 1,
        name: 'The three-body problem',
      },
    },
    put: {
      status: 0,
      msg: 'edit success',
    },
    delete: {
      status: 0,
      msg: 'delete success',
    },
  },
}
