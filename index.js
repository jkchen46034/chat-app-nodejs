const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
  //res.send('<h1>Hello World</h1>')
  res.sendFile(__dirname + '/index.html')
})

io.on('connect', (socket) => {
  console.log('a user connected')

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.emit('hello', 'world', (response) => {
    console.log(response) // "got it"
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
