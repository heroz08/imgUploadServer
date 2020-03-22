
const get = [
  {
    path: '/',
    fun: async (ctx, next) => {
      await next();
      ctx.type = 'text/html';
      ctx.body = '<h1>hello word</h1>'
    }
  }
]

const post = [];

module.exports = {
  get, post
}



