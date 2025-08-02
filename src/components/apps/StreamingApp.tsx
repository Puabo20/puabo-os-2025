import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Upload,
  Radio,
  Tv
} from 'lucide-react';

const StreamingApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(45);
  const [duration] = useState(180);

  const streams = [
    { id: 1, title: 'PUABO Radio Live', type: 'radio', listeners: 1234 },
    { id: 2, title: 'Creator Spotlight', type: 'tv', viewers: 567 },
    { id: 3, title: 'Music Mix 2024', type: 'radio', listeners: 890 },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">PUABO TV & Radio</h2>
        <Button className="bg-red-600 hover:bg-red-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Content
        </Button>
      </div>

      {/* Live Streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {streams.map((stream) => (
          <Card key={stream.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{stream.title}</CardTitle>
                <Badge variant={stream.type === 'radio' ? 'default' : 'secondary'}>
                  {stream.type === 'radio' ? <Radio className="w-3 h-3 mr-1" /> : <Tv className="w-3 h-3 mr-1" />}
                  {stream.type === 'radio' ? 'Radio' : 'TV'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    {stream.type === 'radio' ? stream.listeners : stream.viewers} 
                    {stream.type === 'radio' ? ' listeners' : ' viewers'}
                  </span>
                </div>
                <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Media Player */}
      <Card>
        <CardHeader>
          <CardTitle>Now Playing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <h3 className="font-semibold">Creator Mix - Episode 12</h3>
            <p className="text-gray-600">PUABO Radio</p>
          </div>
          
          <Progress value={(currentTime / duration) * 100} className="w-full" />
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
            <span>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" size="sm">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <Button variant="outline" size="sm">
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreamingApp;