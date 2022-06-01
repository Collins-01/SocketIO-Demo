const express = require('express')
const app= express();
const http= require('http')
const server= http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

const messages =[];



io.on('connection', (socket)=>{
  console.log("A user connected")
  const username= socket.handshake.query.username
  console.log(`Connected User -> ${username}`)
  socket.on('message', (data)=>{
    const message = {
      message: data.message,
      sender: username,
      sentAt: Date.now()
    }
    console.log(message);
    messages.push(message)
    io.emit('message', message)
  })
})



const PORT= 3000;
server.listen(PORT, ()=>{
  console.log(`Server has started on PORT : ${PORT}`)
}) 