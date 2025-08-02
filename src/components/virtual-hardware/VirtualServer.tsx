import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface ServerStats {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  uptime: string;
  requests: number;
}

const VirtualServer: React.FC = () => {
  const [stats, setStats] = useState<ServerStats>({
    cpu: 45,
    memory: 62,
    storage: 78,
    network: 23,
    uptime: '15d 7h 23m',
    requests: 1247
  });

  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(95, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 20)),
        requests: prev.requests + Math.floor(Math.random() * 5)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const services = [
    { name: 'PUABO API', status: 'running', port: 3000 },
    { name: 'Database', status: 'running', port: 5432 },
    { name: 'Redis Cache', status: 'running', port: 6379 },
    { name: 'File Server', status: 'running', port: 8080 },
    { name: 'Stream Server', status: 'running', port: 1935 },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>V-Server Control Panel</span>
          <div className="flex items-center space-x-2">
            <Badge variant={isOnline ? "default" : "destructive"}>
              {isOnline ? "Online" : "Offline"}
            </Badge>
            <Badge variant="outline">Virtual Hardware</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span>{stats.cpu.toFixed(1)}%</span>
                </div>
                <Progress value={stats.cpu} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Memory</span>
                  <span>{stats.memory.toFixed(1)}%</span>
                </div>
                <Progress value={stats.memory} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage</span>
                  <span>{stats.storage}%</span>
                </div>
                <Progress value={stats.storage} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Network</span>
                  <span>{stats.network.toFixed(1)}%</span>
                </div>
                <Progress value={stats.network} className="h-2" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.uptime}</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.requests.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Requests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="font-medium">{service.name}</div>
                  <div className="text-sm text-muted-foreground">Port: {service.port}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={service.status === 'running' ? "default" : "destructive"}>
                    {service.status}
                  </Badge>
                  <Button size="sm" variant="outline">Restart</Button>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-2">
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-64 overflow-y-auto">
              <div>[2024-01-15 10:30:15] INFO: Server started successfully</div>
              <div>[2024-01-15 10:30:16] INFO: Database connection established</div>
              <div>[2024-01-15 10:30:17] INFO: All services running</div>
              <div>[2024-01-15 10:31:22] INFO: User authentication successful</div>
              <div>[2024-01-15 10:32:45] INFO: File upload completed</div>
              <div>[2024-01-15 10:33:12] INFO: Stream started on port 1935</div>
              <div>[2024-01-15 10:34:01] INFO: Cache cleared successfully</div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VirtualServer;