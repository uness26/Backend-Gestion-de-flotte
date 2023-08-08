const app = require('./app')
const port = process.env.PORT || 5000
const http = require("http");
const server = http.createServer(app);
const socketManager = require('./socket_manager')

socketManager(server)

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
})


