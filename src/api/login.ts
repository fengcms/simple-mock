function checkLogin(req, res) {
  const { username, password } = req.body
  // 如果没有 username 或者 password 参数，则返回错误信息，要求填写用户名密码
  if (!username || !password) {
    return {
      status: -1,
      msg: '请输入用户名密码',
    }
  }
  // 给客户端设置 cookie
  res.cookie('token', '1234567890', { httpOnly: true })
  // 返回模拟用户登录完成信息
  return {
    status: 0,
    data: {
      token: '1234567890',
      profile: {
        name: 'fungleo',
        sex: 'boy',
        old: 35,
        job: 'Front-End Engineer',
        web: 'https://blog.csdn.net/fungleo',
      },
    },
    msg: '登录成功',
  }
}
export default {
  name: '登录',
  info: '登录接口的演示文件',
  list: {
    post: checkLogin,
  },
}
