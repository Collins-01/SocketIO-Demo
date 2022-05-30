const express = require('express');
var http = require('http')
var io = require('socket.io')

const  cors = require('cors')
const app= express()

const PORT = process.env.PORT ||  3000;

var server = http.createServer(app);
app.use(express.json())
// app.use(cors())
const socketIO = io.Server


// socketIO.on("Connection", (socket)=>{
//     console.log("Socket COnnection")
// })
server.listen(PORT, ()=> {
    console.log(`Server Started on PORT : ${PORT}`)
})

