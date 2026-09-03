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
        if (!termRef.current || !socket) return;

        const term = new Terminal({
            theme: isDarkMode ? darkTheme : lightTheme,
            cursorBlink: true
        });

        const addon = new FitAddon();

        term.loadAddon(addon);
        term.open(termRef.current);

        // Force an initial fit slightly after mount so CSS is fully calculated
        setTimeout(() => {
            addon.fit();
            socket.emit('resize', { cols: term.cols, rows: term.rows });
        }, 50);

        // --- NEW: ResizeObserver replaces window.addEventListener ---
        let resizeTimeout;
        const resizeObserver = new ResizeObserver(() => {
            try {
                // 1. Instantly resize the frontend
                addon.fit();

                // 2. Debounce the backend call to prevent lag while dragging
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    if (term.cols && term.rows) {
                        socket.emit('resize', {
                            cols: term.cols,
                            rows: term.rows
                        });
                    }
                }, 100);
            } catch (e) {
                console.warn("Resize failed", e);
            }
        });

        // Start observing the terminal wrapper
        resizeObserver.observe(termRef.current);
        // ------------------------------------------------------------

        const handleOutput = (output) => {
            term.write(output);
        }

        // Backend detected a clear sequence — wipe viewport + scrollback
        const handleClear = () => term.reset();

        socket.on('cmd_output', handleOutput);
        socket.on('clear_terminal', handleClear);

        const dataListener = term.onData((data) => {
            socket.emit('cmd', data);
        })

        setTerminal(term);

        return () => {
            resizeObserver.disconnect();
            socket.off('cmd_output', handleOutput);
            socket.off('clear_terminal', handleClear);
            dataListener.dispose();
            term.dispose();
        }
    }, [socket]); // Note: you might want to remove socket from deps if it's declared outside the component

    useEffect(() => {
        if (terminal) {
            terminal.options.theme = isDarkMode ? darkTheme : lightTheme;
        }
    }, [isDarkMode, terminal]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* inset-2 gives padding — outer p-2 would be ignored by absolute positioning */}
            <div
                ref={termRef}
                className="absolute inset-2"
                style={{ overflow: 'hidden' }}
            ></div>
        </div>
    );
}

export default Terminal_Comp;