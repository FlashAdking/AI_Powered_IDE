const express = require('express');
const port = 3000;
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const pty = require('node-pty');
const app = express();


app.use(express.json());
app.use(cors());



const server = http.createServer(app);
const socket_io = new Server(server, {
    cors: {
        "origin": "http://localhost:5173"
    }
});




socket_io.on('connection', (socket) => { 0 
    console.log('connected');

    const bash = pty.spawn("docker",
        ["exec", "-i", "-t", "alpine-terminal", "/bin/sh"],
        {
            name: "xterm-256color",
            cols: 80,
            rows: 24,
            cwd: process.cwd(),
            env: process.env
        }
    );



    socket.on('cmd', (char_stream) => {
        console.log(char_stream);
        bash.write(char_stream);

    });

    bash.onData((output)=>{
        socket.emit('cmd_output' , output);
    })


    socket.on('dissconnect', () => {
        console.log('dissconnected');
    });

})




app.get('/', (req, res) => {
    res.status(200).json({
        "message": "healthy Server"
    })
})



socket_io.listen(port, () => {
    console.log(`server started at ${port}`)
})