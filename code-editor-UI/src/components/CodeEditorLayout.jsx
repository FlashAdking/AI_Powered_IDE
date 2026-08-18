import React, { useState, useRef, useEffect } from 'react';
import RighSideBar from './RightSideBar';
import EditorArea from './EditorArea';
import Terminal from './Terminal';

const CodeEditorLayout = () => {
  const [terminalHeight, setTerminalHeight] = useState(30); // percentage
  const [sidebarWidth, setSidebarWidth] = useState(300); // pixels
  const [isDragging, setIsDragging] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const isDraggingTerminal = useRef(false);
  const isDraggingSidebar = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingTerminal.current) {
        const newHeight = ((window.innerHeight - e.clientY) / window.innerHeight) * 100;
        setTerminalHeight(Math.max(10, Math.min(newHeight, 80)));
      }
      if (isDraggingSidebar.current) {
        const newWidth = window.innerWidth - e.clientX;
        setSidebarWidth(Math.max(150, Math.min(newWidth, window.innerWidth - 300)));
      }
    };

    const handleMouseUp = () => {
      if (isDraggingTerminal.current || isDraggingSidebar.current) {
        isDraggingTerminal.current = false;
        isDraggingSidebar.current = false;
        setIsDragging(false);
        document.body.style.cursor = 'default';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className={`flex h-screen w-full theme-bg-main theme-text-main font-sans overflow-hidden ${isDragging ? 'select-none' : ''} ${isDarkMode ? 'dark-theme' : ''}`}>
      
      {/* Main Content Area (Editor + Terminal) */}
      <div className="flex flex-col min-h-0 flex-1">
        
        {/* Editor Section */}
        <div style={{ height: `${100 - terminalHeight}%` }} className="min-h-0 overflow-hidden theme-bg-editor">
           <EditorArea isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>

        {/* Horizontal Resizer */}
        <div 
          className="h-1 theme-divider cursor-row-resize transition-colors z-10"
          onMouseDown={() => {
            isDraggingTerminal.current = true;
            setIsDragging(true);
            document.body.style.cursor = 'row-resize';
          }}
        />

        {/* Terminal Section */}
        <div style={{ height: `${terminalHeight}%` }} className="min-h-0 theme-bg-terminal overflow-hidden border-t theme-border">
          <Terminal isDarkMode={isDarkMode} />
        </div>
        
      </div>

      {/* Vertical Resizer */}
      <div 
        className="w-1 theme-divider cursor-col-resize transition-colors z-10"
        onMouseDown={() => {
          isDraggingSidebar.current = true;
          setIsDragging(true);
          document.body.style.cursor = 'col-resize';
        }}
      />

      {/* Right Sidebar Section */}
      <div style={{ width: `${sidebarWidth}px` }} className="theme-bg-panel overflow-hidden border-l theme-border">
        <RighSideBar />
      </div>
      
    </div>
  );
}

export default CodeEditorLayout;