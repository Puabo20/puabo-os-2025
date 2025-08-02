import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Upload, Play, DollarSign, Users, TrendingUp, Music } from 'lucide-react';

const CreatorDashboard: React.FC = () => {
  const [uploads, setUploads] = useState([
    { id: '1', title: 'New Track Demo', type: 'audio', status: 'processing', views: 0 },
    { id: '2', title: 'Behind the Scenes', type: 'video', status: 'live', views: 1247 },
    { id: '3', title: 'Acoustic Session', type: 'audio', status: 'live', views: 892 }
  ]);

  const stats = {
    totalStreams: 15420,
    monthlyRevenue: 2847.50,
    followers: 3291,
    growthRate: 12.5
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Creator Dashboard</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Content
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Streams</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStreams.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.followers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{stats.growthRate}% growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploads.map((upload) => (
                  <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Music className="w-8 h-8 text-purple-600" />
                      <div>
                        <h3 className="font-medium">{upload.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {upload.type} • {upload.views} views
                        </p>
                      </div>
                    </div>
                    <Badge variant={upload.status === 'live' ? 'default' : 'secondary'}>
                      {upload.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Stream Completion Rate</span>
                  <span>87%</span>
                </div>
                <Progress value={87} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Audience Retention</span>
                  <span>72%</span>
                </div>
                <Progress value={72} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Social Engagement</span>
                  <span>94%</span>
                </div>
                <Progress value={94} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monetization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Streaming Revenue</span>
                  <span className="font-medium">$1,847.30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Merchandise Sales</span>
                  <span className="font-medium">$642.80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Live Events</span>
                  <span className="font-medium">$357.40</span>
                </div>
                <hr />
                <div className="flex justify-between items-center font-bold">
                  <span>Total Monthly Revenue</span>
                  <span>${stats.monthlyRevenue}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorDashboard;