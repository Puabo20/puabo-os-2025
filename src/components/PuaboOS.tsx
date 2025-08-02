import React from 'react';
import { AppProvider, useApp } from '../contexts/AppContext';
import LoginScreen from './LoginScreen';
import Desktop from './Desktop';
import WindowManager from './WindowManager';
import StreamingApp from './apps/StreamingApp';
import PaymentsApp from './apps/PaymentsApp';
import LendingApp from './apps/LendingApp';
import CreatorDashboard from './apps/CreatorDashboard';
import AdminPanel from './apps/AdminPanel';
import StudioApp from './apps/StudioApp';
import MusicManagerApp from './apps/MusicManagerApp';
import CreatorHubApp from './apps/CreatorHubApp';
import PublishingApp from './apps/PublishingApp';
import DevCenterApp from './apps/DevCenterApp';
import TerminalApp from './apps/TerminalApp';
import { User } from '../types';

const PuaboOSCore: React.FC = () => {
  const { user, setUser, openWindow } = useApp();

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleOpenApp = (appId: string) => {
    const appConfigs = {
      hub: {
        id: 'hub',
        title: 'Creator Hub',
        content: <CreatorHubApp />,
        isMinimized: false,
        position: { x: 80, y: 80 },
        size: { width: 1100, height: 750 }
      },
      studio: {
        id: 'studio',
        title: 'PUABO Studio',
        content: <StudioApp />,
        isMinimized: false,
        position: { x: 100, y: 100 },
        size: { width: 1000, height: 700 }
      },
      music: {
        id: 'music',
        title: 'Music Manager',
        content: <MusicManagerApp />,
        isMinimized: false,
        position: { x: 120, y: 120 },
        size: { width: 1000, height: 700 }
      },
      dashboard: {
        id: 'dashboard',
        title: 'Creator Dashboard',
        content: <CreatorDashboard />,
        isMinimized: false,
        position: { x: 140, y: 140 },
        size: { width: 1000, height: 700 }
      },
      streaming: {
        id: 'streaming',
        title: 'PUABO TV & Radio',
        content: <StreamingApp />,
        isMinimized: false,
        position: { x: 160, y: 160 },
        size: { width: 800, height: 600 }
      },
      payments: {
        id: 'payments',
        title: 'Payments & Revenue',
        content: <PaymentsApp />,
        isMinimized: false,
        position: { x: 180, y: 180 },
        size: { width: 900, height: 700 }
      },
      lending: {
        id: 'lending',
        title: 'BLAC ALT Lending',
        content: <LendingApp />,
        isMinimized: false,
        position: { x: 200, y: 200 },
        size: { width: 800, height: 650 }
      },
      admin: {
        id: 'admin',
        title: 'Admin Panel',
        content: <AdminPanel />,
        isMinimized: false,
        position: { x: 220, y: 220 },
        size: { width: 1000, height: 700 }
      },
      profile: {
        id: 'profile',
        title: 'User Profile',
        content: (
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <img 
                src={user?.avatar} 
                alt={user?.username}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold">{user?.profile.displayName}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <p className="text-sm">{user?.profile.bio}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{user?.profile.stats.totalStreams.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Streams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">${user?.profile.stats.totalRevenue}</div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{user?.profile.stats.followers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
            </div>
          </div>
        ),
        isMinimized: false,
        position: { x: 240, y: 240 },
        size: { width: 600, height: 500 }
      },
      publishing: {
        id: 'publishing',
        title: 'Publishing & IP',
        content: <PublishingApp />,
        isMinimized: false,
        position: { x: 260, y: 260 },
      },
      devcenter: {
        id: 'devcenter',
        title: 'Dev Center',
        content: <DevCenterApp />,
        isMinimized: false,
        position: { x: 280, y: 280 },
        size: { width: 1200, height: 800 }
      },
      terminal: {
        id: 'terminal',
        title: 'Terminal',
        content: <TerminalApp />,
        isMinimized: false,
        position: { x: 300, y: 300 },
        size: { width: 800, height: 600 }
      }
    };


    const config = appConfigs[appId as keyof typeof appConfigs];
    if (config && (!config.id.includes('admin') || user?.role === 'admin')) {
      openWindow(config);
    }
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <Desktop onOpenApp={handleOpenApp} onLogout={handleLogout} user={user} />
      <WindowManager />
    </div>
  );
};

const PuaboOS: React.FC = () => {
  return (
    <AppProvider>
      <PuaboOSCore />
    </AppProvider>
  );
};

export default PuaboOS;