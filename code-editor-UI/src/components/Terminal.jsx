import { useEffect, useRef, useState } from "react";
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit'
import "@xterm/xterm/css/xterm.css";

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

const Terminal_Comp = ({ isDarkMode }) => {
    const termRef = useRef(null);
    const [terminal, setTerminal] = useState(null);

    useEffect(() => {
        const term = new Terminal({
            theme: isDarkMode ? darkTheme : lightTheme,
            cursorBlink: true
        });
        const addon = new FitAddon();

        term.loadAddon(addon);
        term.open(termRef.current);
        addon.fit();
        
        const writePrompt = () => {
            term.write("\x1b[1;32maditya@aditya-Dell-G15\x1b[0m:\x1b[1;34m~\x1b[0m$ ");
        };
        
        writePrompt();

        let currentCommand = '';

        const disposal = term.onData((data) => {
            if (data === '\r') {  // enter
                term.write("\r\n");
                
                const cmd = currentCommand.trim();
                if (cmd === 'ls') {
                    // Emulate Ubuntu colored ls output
                    term.write("\x1b[1;34mDocuments\x1b[0m  \x1b[1;34mDownloads\x1b[0m  \x1b[1;34msrc\x1b[0m  \x1b[1;32msetup.sh\x1b[0m  package.json  README.md\r\n");
                } else if (cmd === 'clear') {
                    term.clear();
                } else if (cmd !== '') {
                    term.write(`bash: ${cmd}: command not found\r\n`);
                }
                
                currentCommand = '';
                writePrompt();
            } else if (data === '\x7f') { // backspace
                if (currentCommand.length > 0) {
                    currentCommand = currentCommand.slice(0, -1);
                    term.write('\b \b'); // erase character visually
                }
            } else if (data.length === 1 && data.charCodeAt(0) >= 32) {
                // only add printable characters
                currentCommand += data;
                term.write(data);
            }
        })
        
        setTerminal(term);

        return () => {
            disposal.dispose();
            term.dispose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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