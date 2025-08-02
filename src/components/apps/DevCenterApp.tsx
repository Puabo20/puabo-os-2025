import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import VirtualServer from '../virtual-hardware/VirtualServer';
import VirtualKeyboard from '../virtual-hardware/VirtualKeyboard';
import VirtualMixer from '../virtual-hardware/VirtualMixer';

const DevCenterApp: React.FC = () => {
  const [activeProject, setActiveProject] = useState('puabo-os');

  const projects = [
    { id: 'puabo-os', name: 'PUABO OS', status: 'active', version: 'v2.0.0' },
    { id: 'creator-tools', name: 'Creator Tools', status: 'development', version: 'v1.5.2' },
    { id: 'streaming-api', name: 'Streaming API', status: 'testing', version: 'v0.8.1' },
  ];

  const apis = [
    { name: 'Auth API', endpoint: '/api/auth', status: 'online', requests: 1247 },
    { name: 'Files API', endpoint: '/api/files', status: 'online', requests: 892 },
    { name: 'Payments API', endpoint: '/api/payments', status: 'online', requests: 456 },
    { name: 'Streaming API', endpoint: '/api/stream', status: 'maintenance', requests: 0 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">PUABO Dev Center</h1>
        <Badge variant="outline">Development Environment</Badge>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
          <TabsTrigger value="hardware">Virtual Hardware</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{project.name}</span>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Version: {project.version}</div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Deploy</Button>
                      <Button size="sm" variant="outline">Logs</Button>
                      <Button size="sm" variant="outline">Config</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="apis" className="space-y-4">
          <div className="grid gap-4">
            {apis.map((api, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{api.name}</h3>
                      <p className="text-sm text-muted-foreground">{api.endpoint}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{api.requests.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">requests/day</div>
                      </div>
                      <Badge variant={api.status === 'online' ? 'default' : 'destructive'}>
                        {api.status}
                      </Badge>
                      <Button size="sm" variant="outline">Test</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hardware" className="space-y-6">
          <VirtualServer />
          <VirtualKeyboard />
          <VirtualMixer />
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Environment</label>
                  <Input defaultValue="production" />
                </div>
                <div>
                  <label className="text-sm font-medium">Branch</label>
                  <Input defaultValue="main" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Deploy Script</label>
                <Textarea 
                  defaultValue="#!/bin/bash\nnpm run build\ndocker build -t puabo-os .\ndocker run -d -p 3000:3000 puabo-os"
                  className="font-mono"
                />
              </div>
              <Button>Deploy to Production</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">2.1s</div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">1.2K</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Errors</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DevCenterApp;