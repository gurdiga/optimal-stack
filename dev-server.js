const server = require('connect')();
const port = process.env.PORT || 3333;

server.use(require('serve-static')(__dirname + '/'));
require('livereload')
  .createServer({ applyCSSLive: false })
  .watch([__dirname + '/src', 'index.html']);

server.listen(port, function () {
  console.log(`Listeninig on port ${port}`);
});
