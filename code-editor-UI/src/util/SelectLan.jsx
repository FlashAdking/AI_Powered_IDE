import { useState } from "react";


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


export default SelectLan;