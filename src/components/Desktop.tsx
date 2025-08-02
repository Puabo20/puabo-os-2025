import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Monitor, 
  Music, 
  DollarSign, 
  CreditCard, 
  Settings, 
  User, 
  LogOut,
  BarChart3,
  Shield,
  Grid3X3
} from 'lucide-react';
import { User as UserType } from '../types';
interface DesktopProps {
  onOpenApp: (appId: string) => void;
  onLogout: () => void;
  user: UserType;
}

interface App {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  requiredRole?: UserType['role'][];
}

const Desktop: React.FC<DesktopProps> = ({ onOpenApp, onLogout, user }) => {
  const allApps: App[] = [
    { id: 'hub', name: 'Creator Hub', icon: <Grid3X3 className="w-6 h-6" />, color: 'bg-orange-600', requiredRole: ['creator', 'admin'] },
    { id: 'studio', name: 'Studio', icon: <Music className="w-6 h-6" />, color: 'bg-pink-600', requiredRole: ['creator', 'admin'] },
    { id: 'music', name: 'Music Manager', icon: <Music className="w-6 h-6" />, color: 'bg-purple-600', requiredRole: ['creator', 'admin'] },
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart3 className="w-6 h-6" />, color: 'bg-indigo-600', requiredRole: ['creator', 'admin'] },
    { id: 'streaming', name: 'PUABO TV', icon: <Monitor className="w-6 h-6" />, color: 'bg-red-500' },
    { id: 'payments', name: 'Payments', icon: <CreditCard className="w-6 h-6" />, color: 'bg-blue-500' },
    { id: 'lending', name: 'BLAC Lending', icon: <DollarSign className="w-6 h-6" />, color: 'bg-green-500' },
    { id: 'profile', name: 'Profile', icon: <User className="w-6 h-6" />, color: 'bg-teal-500' },
    { id: 'admin', name: 'Admin Panel', icon: <Shield className="w-6 h-6" />, color: 'bg-gray-600', requiredRole: ['admin'] },
  ];

  const availableApps = allApps.filter(app => 
    !app.requiredRole || app.requiredRole.includes(user.role)
  );

  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* App Grid */}
      <div className="relative z-10 p-8 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 h-full">
        {availableApps.map((app) => (
          <div
            key={app.id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => onOpenApp(app.id)}
          >
            <div className={`${app.color} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-200`}>
              {app.icon}
            </div>
            <span className="text-white text-sm mt-2 font-medium">{app.name}</span>
          </div>
        ))}
      </div>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/20 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-blue-600 text-white">
              PUABO OS v2.0.0
            </Badge>
            <span className="text-white text-sm">Welcome, {user.username}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-white border-white/30">
              {user.role}
            </Badge>
          </div>

          <Button variant="ghost" size="sm" className="text-white" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Desktop;