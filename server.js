import http from 'http'
import express from 'express'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000
const io = socketio(server)

app.use(express.static('dist'))

app.get('/api/getchats', (req, res) => {
   res.json([{id: 1, message: 'Hola como estas'}, {id: 2, message: 'Muy bien'}, {id: 3, message: 'Y para cuando'}])
});

io.on('connection', (socket) =>{
    console.log(`Conecto ${socket.id}`)

    socket.on('ping', ()=> socket.emit('pong'))
})

server.listen(port, () => console.log(`servidor en el puerto ${port}`))