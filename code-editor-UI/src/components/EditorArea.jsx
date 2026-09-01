import { useEffect, useRef, useState } from "react";
import '../css/Editor.css'
import SelectLan from "../util/SelectLan";

const boilerPlate = {
    "c": `#include <stdio.h>
#include <stdlib.h>

int main() {
    // Your code goes here
    printf("Hello, World!\\n");
    
    return 0;
}`,

    "cpp": `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

int main() {
    // Fast I/O
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Your code goes here
    cout << "Hello, World!\\n";

    return 0;
}`,

    "java": `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Your code goes here
        System.out.println("Hello, World!");
    }
}`,

    "python": `import sys
import math

def main():
    # Your code goes here
    print("Hello, World!")

if __name__ == "__main__":
    # Increases recursion depth for complex algorithms if needed
    sys.setrecursionlimit(10**6)
    main()`
};



const EditorArea = ({ isDarkMode, setIsDarkMode }) => {
    const put_boiler_code = useRef(null);
    const [code, setCode] = useState();
    const [lang, setLang] = useState();
    const [ compile , setCompile] = useState();


    useEffect(() => {
        put_boiler_code.current.value = lang ? boilerPlate[lang] : "";
    }, [lang])

    return (
        <div className="relative w-full h-full theme-bg-editor border theme-border rounded-xl overflow-hidden flex flex-col shadow-lg">
            <div className="flex justify-between items-center theme-bg-panel px-3 py-1 border-b theme-border">
                <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="theme-btn p-1 rounded border shadow-sm flex items-center justify-center transition-colors"
                    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {isDarkMode ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    )}
                </button>
                <SelectLan setLang={setLang} />
            </div>
            <textarea
                className="flex-1 w-full resize-none outline-none p-4 bg-transparent theme-text-main font-mono text-sm leading-relaxed"
                placeholder="Enter your code here..."
                spellCheck="false"
                ref={put_boiler_code}
            />
        </div>
    );
}






export default EditorArea;