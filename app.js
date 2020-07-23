const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 8080;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html')
})

app.get('/static/*', (req, res) => {
    res.sendFile(__dirname + req.url)
})

io.on('connection', socket => {
    console.log('A user connected!');
    
    socket.on('chat message', msg => {
        console.log(`Message: ${msg}`);
        io.emit('chat message', msg);
    })

    socket.on('disconnect', () => {
        console.log('A user has disconnected')
    })
})

http.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})