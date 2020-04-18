// 精确判断数据类型函数
const toType = obj => {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

/* 构建分页列表数据方法
   参数说明
   obj => 数组对象模板，如需动态替换值，可用 #INDEX# 来处理
   page => 正整数，模拟第几页数据
   pageSize => 正整数，模拟一页多少条数据
*/
const mockPageListData = (obj, page = 1, pageSize = 10) => {
  const list = []
  // 根据参数计算最大最小 index 值
  const maxIndex = pageSize * page
  const minIndex = maxIndex - pageSize + 1
  // 默认只有前五页返回数据，并且第五页只返回一半数据
  if (page <= 5) {
    const max = page === 5 ? parseInt(maxIndex - pageSize / 2) : maxIndex
    for (let i = minIndex; i <= max; i++) {
      const objStr = JSON.stringify(obj).replace(/#INDEX#/g, i)
      list.push(JSON.parse(objStr))
    }
  }
  return list
}

module.exports = {
  toType,
  mockPageListData
}
