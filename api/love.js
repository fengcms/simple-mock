function makeList () {
  let o = []
  for (let i = 0; i < 10; i++) {
    o.push({
      id: i,
      name: 'fungleo',
      old: 30
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
        name: 'fungleo',
        old: 30
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
