const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
var keepAlive = () => {
  server.listen(3000);
}
module.exports = keepAlive