import http from 'http'
import express from 'express'
import socketio from 'socket.io'
import request from 'request'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000
const io = socketio(server)

app.use(express.static('dist'))

var messages = [
    {id: 1, message: 'Bienvenidos', nick: 'PragmaChat', gif: ""},
    {id: 3, message: 'Silvio', nick: 'Silvio', gif: "http://media3.giphy.com/media/9IRX12VhoXoR2/200_d.gif"}];

var users = [
    /* {socket_id : 'dfasdfasfd', nick: 'Example'}*/
];

app.get('/api/getchats', (req, res) => {
    res.json(messages)
});

app.get('/api/users', (req, res) => {
    res.json(users)
});

io.on('connection', (socket) => {
    console.log(`Conecto ${socket.id}`)

    socket.on('send-message', (message) => {
        console.log(message + ' ID:::' + socket.id);
        socket.broadcast.emit('new-message', message)
    })

    socket.on('req-message-gif', (msg) => {
        console.log(msg);
        request(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${msg.message}`, (error, response, body) => {
            var url_gif = ""
            url_gif = JSON.parse(body).data.fixed_height_downsampled_url
            console.log(url_gif)
            msg.gif = url_gif
            socket.emit('res-message-gif', msg)
            socket.broadcast.emit('res-message-gif', msg)
        })
    })

    socket.on('disconnect', () => {
        console.log(`Got disconnect:: ${socket.id}`);
        //var index = users.indexOf(5);
        console.log(users);
        users = users.filter( (u) => {
            if(u.socket_id !== socket.id){
                return u
            }
        });
        console.log("sin user"+ users);
        socket.broadcast.emit('active-users', users)
    })

    socket.on('user-new', (nickname) => {
        console.log("Nuevo usuario: " + nickname + " Hay " + users.length)
        users.push({socket_id: socket.id, nick: nickname})
        socket.broadcast.emit('active-users', users)

    })

})

server.listen(port, () => console.log(`servidor en el puerto ${port}`))