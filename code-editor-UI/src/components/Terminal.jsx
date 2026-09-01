import { useEffect, useRef, useState } from "react";
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit'
import "@xterm/xterm/css/xterm.css";
import { io } from 'socket.io-client'


const darkTheme = {
    background: "#181818",
    foreground: "#c9d1d9",
    cursor: "#ffffff",
    black: "#000000",
    red: "#ff5555",
    green: "#50fa7b",
    yellow: "#f1fa8c",
    blue: "#6272a4",
    magenta: "#ff79c6",
    cyan: "#8be9fd",
    white: "#f8f8f2",
    brightBlack: "#6272a4",
    brightRed: "#ff6e6e",
    brightGreen: "#69ff94",
    brightYellow: "#ffffa5",
    brightBlue: "#d6acff",
    brightMagenta: "#ff92df",
    brightCyan: "#a4ffff",
    brightWhite: "#ffffff"
};

const lightTheme = {
    background: "#f9fafb",
    foreground: "#334155",
    cursor: "#000000",
    black: "#000000",
    red: "#cc0000",
    green: "#008000",
    yellow: "#808000",
    blue: "#0000cc",
    magenta: "#cc00cc",
    cyan: "#008080",
    white: "#ffffff",
    brightBlack: "#808080",
    brightRed: "#ff0000",
    brightGreen: "#00ff00",
    brightYellow: "#ffff00",
    brightBlue: "#0000ff",
    brightMagenta: "#ff00ff",
    brightCyan: "#00ffff",
    brightWhite: "#ffffff"
};

const socket = io("http://localhost:3000");

const Terminal_Comp = ({ isDarkMode }) => {
    const termRef = useRef(null);
    const [terminal, setTerminal] = useState(null);



    useEffect(() => {

    }, [])


    useEffect(() => {
        const term = new Terminal({
            theme: isDarkMode ? darkTheme : lightTheme,
            cursorBlink: true
        });
        const addon = new FitAddon();

        term.loadAddon(addon);
        term.open(termRef.current);
        addon.fit();

        socket.on('cmd_output', (output) => {
            console.log(output);
            term.write(output);
        });


        const disposal = term.onData((data) => {
            socket.emit('cmd', data);
        })



        setTerminal(term);

        return () => {
            disposal.dispose();
            term.dispose();
        }
    }, []);

    useEffect(() => {
        if (terminal) {
            terminal.options.theme = isDarkMode ? darkTheme : lightTheme;
        }
    }, [isDarkMode, terminal]);

    return (
        <div ref={termRef} className="w-full h-full p-2"></div>
    )
}

export default Terminal_Comp;