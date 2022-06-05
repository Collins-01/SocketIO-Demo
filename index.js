const express = require('express')
const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const messages = [];
const clients = {};


io.on('connection', (socket) => {
  console.log("A user connected")
  /// Gets the values from the onConnection Method of the client.
  const username = socket.handshake.query.username
  const id = socket.handshake.query.id
  /// Assign the new socket value from the connected user, to the user's id.
  clients[id] = socket;
  /// Adds a new user to the active list of connected users.
  console.log(`Connected User -> ${username}`)
  //* Listening for message events
  socket.on(events.message, (data) => {
    const message = {
      id: data.id,
      msg: data.msg,
      recieverID: data.recieverID,
      senderID: data.senderID,
      sentAt: data.sentAt
    }
    console.log(`Recieved Message => ${message}`);
    if(clients[id]){
        clients[id].emit(events.message_sent, {
          id: message.id
        })
    }else{
      return;
    }
    //* Populates the Messages
    messages.push(message)
    if (clients[id]) {
      clients[index].emit(events.message, message);
    }
    else {
      console.log("Do Nothing, since the user is not connected")
      return;
    }

    //* Emits Delivered once the message gets to the user

    if(clients[id]){
        clients[id].emit(events.message_delivered, {
          id: message.id
        })
    }else{
      return;
    }
    /// Message seen by the user
    if(clients[id]){
      clients[id].on(events.message_seen, () => {
        id: message.id
       })
    }
  })




})

const events = {
  message: 'message',
  message_sent: 'message_sent',
  message_delivered: 'message_delivered',
  last_seen: 'last_seen',
  message_seen: 'message_seen'

}

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server has started on PORT : ${PORT}`)
})


/*
emits sent()=> when a user sends a message, and  there is network connection to send the message to the server.
emits delivered(messageID)=> when the message gets to the sever, it emits a delivered response to the user, and updates the message in the SQL table[false to true]
emits read(messageID)=> when the message gets delivered to Alice, it gets saved in the SQL table. when Alice opens a chat with a particular user, it emits [Read] to all the messages that show delivered to that user.
it should take a list of messageIDs
example, in the table messages..... SELECT * FROM messages WHERE
*/