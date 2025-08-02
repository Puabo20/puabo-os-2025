import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Window } from '../types';

interface AppContextType {
  user: User | null;
  windows: Window[];
  activeWindow: string | null;
  setUser: (user: User | null) => void;
  openWindow: (window: Omit<Window, 'zIndex'>) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindow: (windowId: string, updates: Partial<Window>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(1000);

  const openWindow = (windowData: Omit<Window, 'zIndex'>) => {
    const existingWindow = windows.find(w => w.id === windowData.id);
    
    if (existingWindow) {
      focusWindow(windowData.id);
      if (existingWindow.isMinimized) {
        minimizeWindow(windowData.id);
      }
      return;
    }

    const newWindow: Window = {
      ...windowData,
      zIndex: nextZIndex
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(windowData.id);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindow === windowId) {
      const remainingWindows = windows.filter(w => w.id !== windowId);
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[0].id : null);
    }
  };

  const minimizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const focusWindow = (windowId: string) => {
    setActiveWindow(windowId);
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  const updateWindow = (windowId: string, updates: Partial<Window>) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, ...updates } : w
    ));
  };

  return (
    <AppContext.Provider value={{
      user,
      windows,
      activeWindow,
      setUser,
      openWindow,
      closeWindow,
      minimizeWindow,
      focusWindow,
      updateWindow
    }}>
      {children}
    </AppContext.Provider>
  );
};