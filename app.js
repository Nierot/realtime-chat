const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 8080;
let users = new Map();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html')
})

app.get('/static/*', (req, res) => {
    res.sendFile(__dirname + req.url)
})

io.on('connection', socket => {

    this.username = undefined;
    
    socket.on('username', name => {
        console.log(`User connected with name: ${name}`);
        this.username = name;
        users.set(socket, name);
        io.emit('username', name);
    })
    
    socket.on('chat message', msg => {
        console.log(`Message: ${msg}`);
        socket.broadcast.emit('chat message', {
            text: msg,
            date: new Date().toUTCString(),
            user: this.username
        });
    })

    socket.on('disconnect', () => {
        console.log('A user has disconnected');
        disconnect(socket);
        users.delete(socket);
    })
})

function disconnect(socket) {
    console.log(users)
    for (let user in users) {
        console.log(user)
        user.emit('user disconnect', users.get(socket))
    }
}

http.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})