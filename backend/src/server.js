const express = require('express');
const mougoose = require('mongoose')
const routes = require('./router.js');
const path = require('path')
const cors = require('cors')
const httpserver = express();
const server = require('http').Server(httpserver)
const io = require('socket.io')(server)
const connectedUsers = {};

io.on('connection', socket => {
    const {user} = socket.handshake.query
    connectedUsers[user] = socket.id
    console.log('novo', socket.id)
})

mougoose.connect('mongodb+srv://andregomides:Password@cluster0.3sjnhb7.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
httpserver.use((req,res,next) =>{
    req.io = io;
    req.connectedUsers = connectedUsers

    return next()
})

httpserver.use(cors())
httpserver.use(express.json())
httpserver.use(routes);
httpserver.use('/image', express.static(path.resolve(__dirname, '..' , 'uploads')))

server.listen(process.env.PORT || 3333);