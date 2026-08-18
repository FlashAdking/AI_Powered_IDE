import { useEffect, useRef, useState } from "react";
import '../css/Editor.css'

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
    const inputLoc = useRef(null);
    const [code, setCode] = useState();
    const [lang, setLang] = useState();
    const [ compile , setCompile] = useState();


    useEffect(() => {
        inputLoc.current.value = lang ? boilerPlate[lang] : "";
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
                ref={inputLoc}
            />
        </div>
    );
}




const SelectLan = ({ putCode, setLang }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState("Select Language");

    const handleSelect = (langKey, langName) => {
        setLang(langKey);
        setSelectedLang(langName);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-between items-center w-36 rounded border theme-border shadow-sm px-2 py-1 theme-bg-main theme-text-main theme-hover-bg focus:outline-none focus:ring-1 focus:ring-gray-500 transition-colors duration-200 ease-in-out text-xs font-medium"
            >
                {selectedLang}
                <svg className="-mr-1 ml-1 h-3 w-3 theme-text-muted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-1 w-36 rounded shadow-xl theme-dropdown border theme-border ring-1 ring-black ring-opacity-5 focus:outline-none z-20 transition-all duration-200 ease-in-out">
                    <div className="py-1">
                        <button 
                            onClick={() => handleSelect("java", "Java")}
                            className="block w-full text-left px-3 py-1.5 text-xs theme-text-main theme-hover-bg transition-colors duration-150"
                        >
                            Java
                        </button>
                        <button 
                            onClick={() => handleSelect("c", "C")}
                            className="block w-full text-left px-3 py-1.5 text-xs theme-text-main theme-hover-bg transition-colors duration-150"
                        >
                            C
                        </button>
                        <button 
                            onClick={() => handleSelect("cpp", "C++")}
                            className="block w-full text-left px-3 py-1.5 text-xs theme-text-main theme-hover-bg transition-colors duration-150"
                        >
                            C++
                        </button>
                        <button 
                            onClick={() => handleSelect("python", "Python")}
                            className="block w-full text-left px-3 py-1.5 text-xs theme-text-main theme-hover-bg transition-colors duration-150"
                        >
                            Python
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


export default EditorArea;