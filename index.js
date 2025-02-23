const Express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = Express();
const server = http.createServer(app);
const io = new Server(server);

app.use("/", require("./server"));

server.listen(3000, () => console.log("Server running on port 3000"));