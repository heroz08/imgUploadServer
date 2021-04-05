const fs = require("fs");
const path = require('path')

function readDir(pathName) {
  return new Promise(function (resolve, reject) {
    fs.readdir(pathName, function(err, files) {
      if(err) {
        console.log(err)
        reject(err)
      } else {
        const data = [];
        files.forEach(file => {
          data.push(file)
        })
        resolve(data);
      }
    })
  })
}
const get = [
  {
    path: '/getImages',
    fun: async (ctx, next) => {
      await next();
      const pathName = path.resolve(__dirname, '../public/uploads')
      let err ;
      const data = await readDir(pathName)
      .catch(_err =>  {
        err = _err
      })
      if (err) {
        ctx.body= { code: 1, message: '获取失败', data}
      } else {
        ctx.body= { code: 0, message: '获取成功', data}
      }
    }
  }
]

const post = [];

module.exports = {
  get, post
}



