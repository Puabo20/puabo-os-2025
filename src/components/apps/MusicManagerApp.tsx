import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Music, Upload, TrendingUp, DollarSign, Users, Play } from 'lucide-react';

const MusicManagerApp: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const tracks = [
    {
      id: '1',
      title: 'Summer Nights',
      artist: 'You',
      streams: 15420,
      revenue: 1247.50,
      status: 'published',
      platforms: ['Spotify', 'Apple Music', 'YouTube']
    },
    {
      id: '2',
      title: 'City Lights',
      artist: 'You',
      streams: 8930,
      revenue: 720.40,
      status: 'published',
      platforms: ['Spotify', 'SoundCloud']
    },
    {
      id: '3',
      title: 'Midnight Drive',
      artist: 'You',
      streams: 0,
      revenue: 0,
      status: 'pending',
      platforms: []
    }
  ];

  const analytics = {
    totalStreams: 24350,
    totalRevenue: 1967.90,
    monthlyGrowth: 12.5,
    topPlatform: 'Spotify'
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Music -N- Media Manager</h1>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload New Track
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{analytics.totalStreams.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Streams</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${analytics.totalRevenue}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">+{analytics.monthlyGrowth}%</p>
                <p className="text-sm text-muted-foreground">Monthly Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{analytics.topPlatform}</p>
                <p className="text-sm text-muted-foreground">Top Platform</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tracks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tracks">My Tracks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="royalties">Royalties</TabsTrigger>
        </TabsList>

        <TabsContent value="tracks" className="space-y-4">
          <div className="space-y-4">
            {tracks.map((track) => (
              <Card key={track.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <div>
                        <h3 className="font-semibold">{track.title}</h3>
                        <p className="text-sm text-muted-foreground">{track.artist}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="font-semibold">{track.streams.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Streams</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">${track.revenue}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                      <Badge variant={track.status === 'published' ? 'default' : 'secondary'}>
                        {track.status}
                      </Badge>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                  
                  {track.platforms.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {track.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Split (80/20)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Your Share (80%)</span>
                    <span>${(analytics.totalRevenue * 0.8).toFixed(2)}</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Platform Fee (20%)</span>
                    <span>${(analytics.totalRevenue * 0.2).toFixed(2)}</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribution Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {['Spotify', 'Apple Music', 'YouTube Music', 'SoundCloud', 'Bandcamp', 'Tidal'].map((platform) => (
                  <div key={platform} className="flex items-center justify-between p-3 border rounded">
                    <span>{platform}</span>
                    <Badge variant="outline">Connected</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="royalties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Royalty Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">January 2024</p>
                    <p className="text-sm text-muted-foreground">3,420 streams</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$247.50</p>
                    <Badge variant="default">Paid</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">February 2024</p>
                    <p className="text-sm text-muted-foreground">4,120 streams</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$320.40</p>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MusicManagerApp;