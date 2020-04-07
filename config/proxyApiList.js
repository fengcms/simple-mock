/* 
  代理接口列表
  如代理 topics 接口，则直接写字符串即可，
  如是 apiname/:id 这样的二层接口，则在接口名后面加 /** 通配符
  如一个接口名，即有 一层的，请求，又有二层的请求，则要写两个
    比如 'book', 'book/**'
*/
const proxyApiList = [
  'topics',
  'topic/**',
]
module.exports = proxyApiList
