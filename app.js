const http = require("http");
const routesHandler = require("./routes");
const port = 3000;

const server = http.createServer(routesHandler);

server.listen(port);
console.log(`Server created at http://localhost:${port}`);
