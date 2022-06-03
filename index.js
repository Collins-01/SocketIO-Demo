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
  const id= socket.handshake.query.id
  console.log(`Connected User -> ${username}`)
  socket.on('message', (data)=>{
    const message = {
      id : data.id,
      msg: data.msg,
      recieverID: data.recieverID,
      senderID: data.senderID,
      sentAt: data.sentAt
    }
    console.log(`Recieved Message => ${message}`);
    messages.push(message)
    // io.emit('message', message)
    //* Emits Delivered once the message get to  the server.
    io.emit('delivered', {
      id: message.id,
      recieverID: message.recieverID,
      senderID: message.senderID,
    })
  })

  
  
})

// io.on('typing',(data)=>{
//   console.log(data)
//   io.emit('typing', `${username} is Typing...`)
// })

const PORT= 3000;
server.listen(PORT, ()=>{
  console.log(`Server has started on PORT : ${PORT}`)
}) 


/*
emits sent()=> when a user sends a message, and  there is network connection to send the message to the server.
emits delivered(messageID)=> when the message gets to the sever, it emits a delivered response to the user, and updates the message in the SQL table[false to true]
emits read(messageID)=> when the message gets delivered to Alice, it gets saved in the SQL table. when Alice opens a chat with a particular user, it emits [Read] to all the messages that show delivered to that user.
it should take a list of messageIDs
example, in the table messages..... SELECT * FROM messages WHERE
*/