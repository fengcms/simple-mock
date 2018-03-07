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
