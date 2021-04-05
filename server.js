const Koa  = require('koa');
const path = require('path');
const static = require('koa-static');
const koabody = require('koa-body');
const cors = require('koa-cors');


const router = require('./createRouter')();

const app =  new Koa();


app.use(cors());

app.use(static(path.join(__dirname, 'public')))

app.use(koabody({
  multipart: true,
  formidable: {
    maxFileSize: 1000*1024*1024,
    uploadDir: path.join(__dirname, 'public/uploads'),
    keepExtensions: true
  }
}));


app.use(async (ctx, next) => {
  await next();
  console.log(ctx.path)
})

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log('run error:', err.message);
    ctx.status = err.status || 500;
    ctx.body = {data: null, msg: err.message};
  }
});

app.use(router.routes());


app.listen(1088);
console.log('service on 1088')
