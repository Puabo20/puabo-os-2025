import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Upload, Mic, Music, Video, FileAudio } from 'lucide-react';

const StudioApp: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  const projects = [
    { id: '1', name: 'Summer Vibes EP', type: 'audio', status: 'in-progress', tracks: 4 },
    { id: '2', name: 'Podcast Episode 12', type: 'audio', status: 'completed', tracks: 1 },
    { id: '3', name: 'Music Video Draft', type: 'video', status: 'review', tracks: 1 },
  ];

  const tools = [
    { name: 'Audio Recorder', icon: Mic, description: 'Record high-quality audio' },
    { name: 'Beat Maker', icon: Music, description: 'Create beats and loops' },
    { name: 'Video Editor', icon: Video, description: 'Edit and enhance videos' },
    { name: 'Mixer', icon: FileAudio, description: 'Mix and master tracks' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">PUABO Studio</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button size="sm">
            <Mic className="w-4 h-4 mr-2" />
            New Recording
          </Button>
        </div>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tools">Studio Tools</TabsTrigger>
          <TabsTrigger value="library">Media Library</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {project.tracks} track{project.tracks !== 1 ? 's' : ''}
                      </span>
                      <Badge variant="outline">{project.type}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        {currentTrack === project.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {tools.map((tool) => (
              <Card key={tool.name} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <tool.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Input placeholder="Search media files..." className="max-w-sm" />
            <Button variant="outline">Filter</Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="aspect-square">
                <CardContent className="p-4 h-full flex flex-col justify-between">
                  <div className="bg-muted rounded h-20 mb-2"></div>
                  <div>
                    <p className="font-medium text-sm">Media File {i}</p>
                    <p className="text-xs text-muted-foreground">2.3 MB</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudioApp;