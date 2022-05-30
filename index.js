import express from "express";
import { Socket } from "socket.io";
const PORT = 3000;

const app= express()

app.listen((v)=>{
    console.log('Server  has started')
})