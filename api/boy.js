const makeList = (req, res) => {
  res.json({
    status: 0,
    data: {
      list: []
    }
  })
}
module.exports = {
  list: {
    get: makeList,
  }
}
