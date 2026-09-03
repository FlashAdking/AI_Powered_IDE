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



socket_io.on('connection', (socket) => {
    console.log('connected');

    const bash = pty.spawn("docker", [
        "exec",
        "-i",
        "-t",
        "-u", "sandbox_user",
        "-w", "/workspace",
        "-e", "PS1=\\u@\\:\\w\\$ ",
        "alpine-terminal",
        "/bin/sh"
    ]
        , {
            name: 'xterm-256color',
            cols: 80,
            rows: 30,
            cwd: process.env.HOME,
            env: process.env
        }
    );

    try {
        socket.on('resize', ({ cols, rows }) => {
            bash.resize(cols, rows);
        });
    } catch (error) {
        console.log(error.message);
    }

    socket.on('cmd', (char_stream) => {
        console.log(char_stream);
        bash.write(char_stream);
    });



    let inAlternateScreen = false;
    let chunkBuffer = '';  // rolling buffer to catch sequences split across chunks

    bash.onData((data) => {
        // Keep last 10 chars to match sequences that may be split across chunks
        chunkBuffer = (chunkBuffer + data).slice(-10);

        // Track alternate screen buffer (vim, nano, htop, man, less...)
        if (data.includes('\x1b[?1049h')) inAlternateScreen = true;
        if (data.includes('\x1b[?1049l')) inAlternateScreen = false;

        // Only fire clear_terminal when NOT inside a TUI app
        if (!inAlternateScreen) {
            const isClearScreen =
                chunkBuffer.includes('\x1b[H\x1b[J')  ||  // Alpine busybox `clear`
                chunkBuffer.includes('\x1b[H\x1b[2J') ||  // standard ncurses `clear`
                chunkBuffer.includes('\x1b[2J');           // other variants

            const isHardReset = data.includes('\x1bc');    // `reset` command

            if (isClearScreen || isHardReset) {
                socket.emit('clear_terminal');
                chunkBuffer = '';
            }
        }
        console.log(chunkBuffer);
        socket.emit('cmd_output', data);
    });



    socket.on('disconnect', () => {
        console.log('disconnected');
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