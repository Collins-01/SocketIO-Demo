const express = require('express')
const app= express();
const http= require('http')
const server= http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)




io.on('connection', (socket)=>{
  console.log("A user connected")
})
const PORT= 3000;
server.listen(PORT, ()=>{
  console.log(`Server has started on PORT : ${PORT}`)
})