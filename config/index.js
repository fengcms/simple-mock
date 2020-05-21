const noTokenApiList = require('./noTokenApiList') || []
const proxyApiList = require('./proxyApiList') || []

module.exports = {
  // 接口前缀
  prefix: '/api/v1/',
  // 运行端口
  port: 3000,
  // 运行 IP ，若只允许运行在本地，设置为 127.0.0.1 或 localhost
  host: '0.0.0.0',
  // 接口返回延时，单位毫秒 （模拟网络延迟）
  delay: 100,
  // 校验 token 设置
  checkToken: {
    // 是否需要校验，如不开启校验，则设置 false
    status: true,
    // token 字段名称，根据接口设定约定填写
    tokenField: 'token',
    // 读取 token 的位置
    // 可设置值为 headers 或 cookies
    tokenPosition: 'headers',
    // 免校验 token 接口列表，如登录一般是不需要检验的
    // 在 /config/noTokenApiList.js 维护免校验接口名单
    noTokenApiList
  },
  // 真实接口代理设置
  // 用于部分真实接口已开发完成，这部分接口需要真实请求
  // 其它接口使用 mock 数据
  proxyConfig: {
    // 是否需要开启代理
    status: true,
    // 代理接口列表
    // 在 /config/proxyApiList.js 维护
    proxyApiList,
    // 代理配置，参考 http-proxy-middleware 配置项
    // https://github.com/chimurai/http-proxy-middleware#readme
    proxyOption: {
      // 真实接口域名以及端口，结尾不要斜杠
      target: 'https://cnodejs.org',
      // 是否需要改变原始主机头为目标URL
      changeOrigin: true,
      // 接口前缀重定向配置
      pathRewrite: {
        // '^/api/v2': '/api/v1'
      }
    }
  }
}
