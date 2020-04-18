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
      name: `Boy's Name #INDEX#`
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
  list: {
    get: makeList,
  }
}
