/* 上传文件 mock 接口演示
 * 上传文件接口一般使用 from-data 来传输，而不是 json 格式
 * 需要约定上传文件在 from-data 中的字段，本示例为 file
 * 如果你想简单的话，完全可以直接 return 一个成功数据回去即可
 * 这里是演示判断上传文件是否为空
 * 当然，你完全可以在其中增加判断，比如图片类型，图片大小等等
*/
const fileField = 'file'
const imageList = [
  'http://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&f=JPEG',
  'http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&f=JPEG',
  'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG',
  'http://t9.baidu.com/it/u=3363001160,1163944807&fm=79&app=86&f=JPEG',
  'http://t9.baidu.com/it/u=583874135,70653437&fm=79&app=86&f=JPEG',
  'http://t9.baidu.com/it/u=1307125826,3433407105&fm=79&app=86&f=JPEG'
]

const upload = (req, res) => {
  // 如果有上传文件
  if (req.files[fileField]) {
    return {
      status: 0,
      data: {
        url: imageList[~~(Math.random() * 6)]
      },
      msg: '上传成功'
    }
  } else {
    return {
      status: -1,
      msg: '上传文件不能为空'
    }
  }
}

module.exports = {
  name: '上传文件',
  info: '这是一个上传文件的演示接口',
  list: {
    post: upload
  }
}
