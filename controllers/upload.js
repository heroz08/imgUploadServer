const path = require('path')

const get = [
  // {
  //   path: '/upload',
  //   fun: async (ctx, next) => {
  //     await next();
  //     ctx.type = 'text/html';
  //     ctx.body = '<h1>uploader</h1>'
  //   }
  // }
]

const post = [
  {
    path: '/upload',
    fun: async (ctx, next) => {
      await next();
      const files = ctx.request.files;
      const data = [];
      Object.keys(files).forEach((key) => {
        const baseName = path.basename(files[key].path);
        data.push({url: `${ctx.origin}/uploads/${baseName}`})
      });

      ctx.body = {data, msg: 'success'};
    }
  }
];

module.exports = {
  get, post
}
