module.exports = {
  name: '文章列表',
  info: '演示与代理冲突的接口，该文件不会起作用',
  // GET POST /book 接口 的 Mock 数据
  list: {
    get: {
      data: '因为与代理配置里的 topics 接口冲突，因此，你请求不到这里的数据'
    }
  }
}
