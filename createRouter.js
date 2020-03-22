const fs = require('fs');
const router = require('koa-router')();

const getJsRouterConfig = function (dirPath) {
  const path = __dirname + '/' + dirPath + '/';
  var files = fs.readdirSync(path);

  var jsFiles = files.filter(file => {
    return file.endsWith('.js');
  });

  for (var f of jsFiles) {
    let routerConfig = require(path + f);
    const { get = [], post = [] } = routerConfig;

    if (get.length) {
      get.forEach(interface => {
        router.get(interface.path, interface.fun)
      });
    }
    if (post.length) {
      post.forEach(interface => {
        router.post(interface.path, interface.fun)
      })
    }
  }

  return router;

};

module.exports = function (dir) {
  const dirPath = dir || "controllers";
  return getJsRouterConfig(dirPath);
};