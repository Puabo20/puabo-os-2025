import React from 'react';
import { Button } from './ui/button';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const WindowManager: React.FC = () => {
  const { windows, activeWindow, closeWindow, minimizeWindow, focusWindow, updateWindow } = useApp();

  const handleMouseDown = (windowId: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    focusWindow(windowId);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const window = windows.find(w => w.id === windowId);
    if (!window) return;
    
    const startPosX = window.position.x;
    const startPosY = window.position.y;
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      updateWindow(windowId, {
        position: {
          x: Math.max(0, startPosX + deltaX),
          y: Math.max(0, startPosY + deltaY)
        }
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {windows.map((window) => (
        <div
          key={window.id}
          className={`absolute pointer-events-auto transition-all duration-200 ${
            window.isMinimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
          style={{
            left: window.position.x,
            top: window.position.y,
            width: window.size.width,
            height: window.size.height,
            zIndex: window.zIndex,
          }}
          onClick={() => focusWindow(window.id)}
        >
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 h-full flex flex-col">
            {/* Window Title Bar */}
            <div 
              className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg cursor-move"
              onMouseDown={(e) => handleMouseDown(window.id, e)}
            >
              <h3 className="font-semibold text-sm">{window.title}</h3>
              <div className="flex items-center space-x-1 window-controls">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-6 h-6 p-0 hover:bg-yellow-500 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    minimizeWindow(window.id);
                  }}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-6 h-6 p-0 hover:bg-green-500 text-white"
                >
                  <Maximize2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-6 h-6 p-0 hover:bg-red-500 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(window.id);
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            {/* Window Content */}
            <div className="flex-1 overflow-auto bg-white rounded-b-lg">
              {window.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WindowManager;