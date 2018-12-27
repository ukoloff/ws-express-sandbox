const http = require('http')
const wss = require('ws').Server
const express = require('express')
const opener = require('opener')

const Port = 3000

const app = express()
const server = http.createServer(app)
const ws = new wss({server})

var connections = 0

ws.on('connection', socket=>{
    connections++
    socket.on('close', onClose)
    socket.isAlive = true
    socket.on('pong', heartBeat)
    socket.on('message', gotIt)
})

setInterval(pingAll, 2000)

app.use(express.static('.'))

server.listen(Port)
opener(`http://127.0.0.1:${Port}`)

function dieHard() {
    if (!connections) {
        process.exit()
    }
}

function onClose() {
    if (!--connections)
      setTimeout(dieHard, 1000)
}

function heartBeat() {
    // console.log('PONG')
    this.isAlive = true
}

function gotIt(msg) {
    console.log('Got:', msg)
    this.send(`Re: ${msg}`)
}

function pingAll() {
    ws.clients.forEach(pingOne)
}

function pingOne(ws) {
  if (false === ws.isAlive) {
      ws.terminate()
      return
  }
  ws.isAlive = false
  ws.ping()   
//   console.log('PING') 
}
