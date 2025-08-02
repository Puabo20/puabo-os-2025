import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';

interface Channel {
  id: number;
  name: string;
  volume: number;
  gain: number;
  eq: { high: number; mid: number; low: number };
  muted: boolean;
  solo: boolean;
}

const VirtualMixer: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `CH ${i + 1}`,
      volume: 75,
      gain: 50,
      eq: { high: 50, mid: 50, low: 50 },
      muted: false,
      solo: false
    }))
  );

  const [masterVolume, setMasterVolume] = useState([85]);

  const updateChannel = (id: number, updates: Partial<Channel>) => {
    setChannels(prev => prev.map(ch => 
      ch.id === id ? { ...ch, ...updates } : ch
    ));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>V-Mixer Pro</span>
          <Badge variant="outline">Virtual Hardware</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {channels.map((channel) => (
            <div key={channel.id} className="flex flex-col items-center space-y-2 min-w-[80px]">
              <div className="text-xs font-medium">{channel.name}</div>
              
              {/* EQ Controls */}
              <div className="space-y-1">
                <div className="text-xs text-center">HI</div>
                <Slider
                  value={[channel.eq.high]}
                  onValueChange={([value]) => 
                    updateChannel(channel.id, { 
                      eq: { ...channel.eq, high: value } 
                    })
                  }
                  max={100}
                  min={0}
                  orientation="vertical"
                  className="h-16"
                />
              </div>
              
              <div className="space-y-1">
                <div className="text-xs text-center">MID</div>
                <Slider
                  value={[channel.eq.mid]}
                  onValueChange={([value]) => 
                    updateChannel(channel.id, { 
                      eq: { ...channel.eq, mid: value } 
                    })
                  }
                  max={100}
                  min={0}
                  orientation="vertical"
                  className="h-16"
                />
              </div>
              
              <div className="space-y-1">
                <div className="text-xs text-center">LOW</div>
                <Slider
                  value={[channel.eq.low]}
                  onValueChange={([value]) => 
                    updateChannel(channel.id, { 
                      eq: { ...channel.eq, low: value } 
                    })
                  }
                  max={100}
                  min={0}
                  orientation="vertical"
                  className="h-16"
                />
              </div>
              
              {/* Volume Fader */}
              <div className="space-y-1">
                <div className="text-xs text-center">VOL</div>
                <Slider
                  value={[channel.volume]}
                  onValueChange={([value]) => 
                    updateChannel(channel.id, { volume: value })
                  }
                  max={100}
                  min={0}
                  orientation="vertical"
                  className="h-24"
                />
                <div className="text-xs text-center">{channel.volume}</div>
              </div>
              
              {/* Mute/Solo */}
              <div className="flex flex-col space-y-1">
                <Button
                  size="sm"
                  variant={channel.muted ? "destructive" : "outline"}
                  onClick={() => updateChannel(channel.id, { muted: !channel.muted })}
                  className="text-xs px-2 py-1"
                >
                  MUTE
                </Button>
                <Button
                  size="sm"
                  variant={channel.solo ? "default" : "outline"}
                  onClick={() => updateChannel(channel.id, { solo: !channel.solo })}
                  className="text-xs px-2 py-1"
                >
                  SOLO
                </Button>
              </div>
            </div>
          ))}
          
          {/* Master Section */}
          <div className="flex flex-col items-center space-y-2 min-w-[100px] border-l pl-4">
            <div className="text-sm font-bold">MASTER</div>
            <div className="space-y-1">
              <div className="text-xs text-center">VOLUME</div>
              <Slider
                value={masterVolume}
                onValueChange={setMasterVolume}
                max={100}
                min={0}
                orientation="vertical"
                className="h-32"
              />
              <div className="text-xs text-center">{masterVolume[0]}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualMixer;