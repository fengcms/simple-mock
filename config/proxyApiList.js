/*
  代理接口列表 proxyApiList 为数组格式，内容可以是对象，和可以是字符串。
  为字符串时，字符串内容为接口名称，支持通配符
    如代理 topics 接口，则直接写字符串即可，
    如是 apiname/:id 这样的二层接口，则在接口名后面加 /** 通配符
    如一个接口名，即有 一层的，请求，又有二层的请求，则要写两个
      比如 'book', 'book/**'
  为对象时，可以添加更多的接口配置信息
    {
      api: 'xxx',          // 接口名称，规则同上
      name: '接口名称中文',
      info: '接口备注信息'
    }
    如 不写 method 表示支持所有请求方法
    name 和 info 只是为了便于后续维护存在，在 mock server 服务的首页可以查看你的配置信息
*/
const proxyApiList = [
  'topics',
  'topic/**',
  {
    api: 'topic_collect/collect',
    name: '收藏主题',
    info: '在用户登录的状态下，可以通过此接口获取用户的收藏主题'
  }
]
module.exports = proxyApiList
