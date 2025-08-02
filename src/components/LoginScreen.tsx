import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { User } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'creator' | 'viewer'>('creator');

  const handleLogin = () => {
    if (username.trim() && email.trim()) {
      const user: User = {
        id: Date.now().toString(),
        username: username.trim(),
        email: email.trim(),
        role: selectedRole,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        createdAt: new Date().toISOString(),
        profile: {
          displayName: username.trim(),
          bio: `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} on PUABO OS`,
          socialLinks: {},
          stats: {
            totalStreams: selectedRole === 'creator' ? Math.floor(Math.random() * 10000) : 0,
            totalRevenue: selectedRole === 'creator' ? Math.floor(Math.random() * 5000) : 0,
            followers: Math.floor(Math.random() * 1000)
          }
        }
      };
      onLogin(user);
    }
  };

  const demoUsers = [
    { username: 'admin_demo', email: 'admin@puabo.com', role: 'admin' as const },
    { username: 'artist_mike', email: 'mike@puabo.com', role: 'creator' as const },
    { username: 'viewer_jane', email: 'jane@puabo.com', role: 'viewer' as const }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">PUABO OS</h1>
          <p className="text-purple-200">v2.0.0 - Creator Operating System</p>
          <Badge variant="outline" className="text-purple-300 border-purple-300">
            Pull Up And Bounce Out
          </Badge>
        </div>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center">Welcome to PUABO OS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/80">Select Role:</label>
              <div className="flex space-x-2">
                {(['admin', 'creator', 'viewer'] as const).map((role) => (
                  <Button
                    key={role}
                    variant={selectedRole === role ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedRole(role)}
                    className={selectedRole === role ? 
                      'bg-purple-600 hover:bg-purple-700' : 
                      'border-white/20 text-white hover:bg-white/10'
                    }
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleLogin} 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!username.trim() || !email.trim()}
            >
              Enter PUABO OS
            </Button>

            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-white/60 mb-2">Quick Demo Login:</p>
              <div className="space-y-2">
                {demoUsers.map((demo) => (
                  <Button
                    key={demo.username}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setUsername(demo.username);
                      setEmail(demo.email);
                      setSelectedRole(demo.role);
                    }}
                    className="w-full text-xs border-white/20 text-white hover:bg-white/10"
                  >
                    {demo.username} ({demo.role})
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-white/60 text-sm">
          <p>The world's first Creator Operating System</p>
          <p>Empowering artists, podcasters, and digital entrepreneurs</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
