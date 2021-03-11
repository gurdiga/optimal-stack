const connect = require("connect");
const static = require("serve-static");
const livereload = require("livereload");

const server = connect();

server.use(static(__dirname + "/"));
livereload.createServer({ applyCSSLive: false }).watch([__dirname + "/src", "index.html"]);

server.listen(process.env.PORT);
