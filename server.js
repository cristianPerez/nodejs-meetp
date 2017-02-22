import http from 'http'
import express from 'express'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000
const io = socketio(server)

app.use(express.static('dist'))

app.get('/api/getchats', (req, res) => {
   res.json([{id: 1, message: 'Hola como estas', nick: 'johnaagude' }, {id: 2, message: 'Muy bien', nick: 'cperez'}, {id: 3, message: 'Y para cuando', nick: 'mimimi'}])
});

io.on('connection', (socket) =>{
    console.log(`Conecto ${socket.id}`)

    socket.on('send-message', (message) => { 
        console.log(message);
        socket.broadcast.emit('new-message', message)
    })


})

server.listen(port, () => console.log(`servidor en el puerto ${port}`))