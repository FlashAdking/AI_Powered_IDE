import React, { useState } from 'react';

const RighSideBar = () => {
    // State to manage folder expansion (simulating dynamic structure)
    const [isMyFolderOpen, setIsMyFolderOpen] = useState(false);
    const [isSampleFolderOpen, setIsSampleFolderOpen] = useState(true);

    return (
        <div className="h-full w-full flex flex-col theme-text-main theme-bg-panel text-sm font-sans select-none">

            {/* Top Action Bar (Explorer Header) */}
            <div className="flex flex-row justify-between items-center px-4 py-2 mt-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider theme-text-muted">
                    Explorer
                </div>
                {/* File / Folder Actions */}
                <div className="flex gap-1 text-xs">
                    <button className="theme-hover-bg p-1 rounded transition-colors" title="New File">
                        <svg className="w-4 h-4 theme-text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </button>
                    <button className="theme-hover-bg p-1 rounded transition-colors" title="New Folder">
                        <svg className="w-4 h-4 theme-text-main" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1m-6-3a2 2 0 00-2-2H9a2 2 0 00-2 2v8a2 2 0 002 2h2" /></svg>
                    </button>
                </div>
            </div>

            {/* File Tree Explorer */}
            <div className="flex flex-col overflow-y-auto mt-1">

                {/* MyFolder Header */}
                <div 
                    className="flex items-center gap-1 px-2 py-0.5 cursor-pointer theme-hover-bg theme-text-main transition-colors"
                    onClick={() => setIsMyFolderOpen(!isMyFolderOpen)}
                >
                    <svg className={`w-4 h-4 theme-text-main transition-transform duration-150 ${isMyFolderOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="truncate">MyFolder</span>
                </div>

                {/* MyFolder Contents */}
                {isMyFolderOpen && (
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 cursor-pointer theme-hover-bg pl-8 pr-2 py-0.5 transition-colors">
                            <svg className="w-4 h-4 text-[#519aba]" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm7 7V4l5 5h-5z"/></svg>
                            <span className="truncate theme-text-main">empty.txt</span>
                        </div>
                    </div>
                )}

                {/* sample_folder Header */}
                <div 
                    className="flex items-center gap-1 px-2 py-0.5 cursor-pointer theme-hover-bg theme-text-main transition-colors"
                    onClick={() => setIsSampleFolderOpen(!isSampleFolderOpen)}
                >
                    <svg className={`w-4 h-4 theme-text-main transition-transform duration-150 ${isSampleFolderOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="truncate">sample_folder</span>
                </div>

                {/* sample_folder Contents */}
                {isSampleFolderOpen && (
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 cursor-pointer theme-hover-bg pl-8 pr-2 py-0.5 transition-colors">
                            <svg className="w-4 h-4 text-[#519aba]" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm7 7V4l5 5h-5z"/></svg>
                            <span className="truncate theme-text-main">file1.txt</span>
                        </div>
                        <div className="flex items-center gap-1.5 cursor-pointer theme-hover-bg pl-8 pr-2 py-0.5 transition-colors">
                            <svg className="w-4 h-4 text-[#519aba]" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm7 7V4l5 5h-5z"/></svg>
                            <span className="truncate theme-text-main">file2.txt</span>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default RighSideBar;