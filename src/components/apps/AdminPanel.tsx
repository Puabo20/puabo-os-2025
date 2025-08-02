import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Users, Settings, DollarSign, AlertTriangle, Send } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState([
    { id: '1', username: 'artist_mike', email: 'mike@example.com', role: 'creator', status: 'active', revenue: 2847.50 },
    { id: '2', username: 'producer_jane', email: 'jane@example.com', role: 'creator', status: 'pending', revenue: 1234.80 },
    { id: '3', username: 'viewer_john', email: 'john@example.com', role: 'viewer', status: 'active', revenue: 0 }
  ]);

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    newRegistrations: true,
    streamingEnabled: true,
    paymentsEnabled: true
  });

  const [broadcastMessage, setBroadcastMessage] = useState('');

  const handleUserStatusChange = (userId: string, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setSystemSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleBroadcast = () => {
    if (broadcastMessage.trim()) {
      // Simulate broadcast
      alert(`Broadcast sent: ${broadcastMessage}`);
      setBroadcastMessage('');
    }
  };

  const systemStats = {
    totalUsers: 1247,
    activeCreators: 89,
    totalRevenue: 45892.30,
    pendingApprovals: 12
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <Badge variant="outline" className="text-green-600 border-green-600">
          System Online
        </Badge>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activeCreators}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${systemStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
          <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{user.username}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{user.role}</Badge>
                          {user.revenue > 0 && (
                            <span className="text-sm text-green-600">${user.revenue}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                      {user.status === 'pending' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleUserStatusChange(user.id, 'active')}
                        >
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Maintenance Mode</h3>
                  <p className="text-sm text-muted-foreground">Temporarily disable the system</p>
                </div>
                <Switch 
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={(value) => handleSettingChange('maintenanceMode', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Registrations</h3>
                  <p className="text-sm text-muted-foreground">Allow new user signups</p>
                </div>
                <Switch 
                  checked={systemSettings.newRegistrations}
                  onCheckedChange={(value) => handleSettingChange('newRegistrations', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Streaming Services</h3>
                  <p className="text-sm text-muted-foreground">Enable streaming functionality</p>
                </div>
                <Switch 
                  checked={systemSettings.streamingEnabled}
                  onCheckedChange={(value) => handleSettingChange('streamingEnabled', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Payment Processing</h3>
                  <p className="text-sm text-muted-foreground">Enable payment transactions</p>
                </div>
                <Switch 
                  checked={systemSettings.paymentsEnabled}
                  onCheckedChange={(value) => handleSettingChange('paymentsEnabled', value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="broadcast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Broadcast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Broadcast Message</label>
                <Input
                  placeholder="Enter message to broadcast to all users..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="mt-2"
                />
              </div>
              <Button onClick={handleBroadcast} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Broadcast
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;