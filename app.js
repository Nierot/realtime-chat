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
        users.forEach(user => socket.emit('username', user));
        users.set(socket, name);
        io.emit('username', name);
        userlist();
    })
    
    socket.on('chat message', msg => {
        console.log(`Message: ${msg}`);
        socket.broadcast.emit('chat message', {
            text: msg,
            date: `${new Date().getHours()}:${new Date().getMinutes()}`,
            user: this.username
        });
    })

    socket.on('disconnect', () => {
        console.log('A user has disconnected');
        deleteUser(socket);
    })
});

function deleteUser(socket) {
    user = users.get(socket);
    users.delete(socket);
    users.forEach((v, k) => {
        k.emit('user disconnect', user);
    });
}

function userlist() {
    var msg = 'Users: \n';
    users.forEach((v, k) => {
        msg += v + '\n';
    })
    console.log(msg);
}

http.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})