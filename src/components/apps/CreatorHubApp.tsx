import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Bell,
  Plus,
  ExternalLink
} from 'lucide-react';

const CreatorHubApp: React.FC = () => {
  const [activeProjects, setActiveProjects] = useState(3);

  const stats = {
    totalRevenue: 12847.50,
    monthlyStreams: 45230,
    followers: 8420,
    projectsCompleted: 12
  };

  const recentActivity = [
    { id: '1', type: 'upload', description: 'New track "Summer Vibes" uploaded', time: '2 hours ago' },
    { id: '2', type: 'revenue', description: 'Royalty payment of $247.50 received', time: '1 day ago' },
    { id: '3', type: 'milestone', description: 'Reached 10K streams on "City Lights"', time: '2 days ago' },
    { id: '4', type: 'collaboration', description: 'New collaboration request from @producer_mike', time: '3 days ago' }
  ];

  const quickActions = [
    { name: 'Upload Content', icon: Plus, description: 'Add new music or media' },
    { name: 'View Analytics', icon: BarChart3, description: 'Check performance metrics' },
    { name: 'Manage Revenue', icon: DollarSign, description: 'Track earnings and payouts' },
    { name: 'Schedule Posts', icon: Calendar, description: 'Plan social media content' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Creator Hub</h1>
          <p className="text-muted-foreground">Your central command center</p>
        </div>
        <Button>
          <Bell className="w-4 h-4 mr-2" />
          Notifications
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
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
                <p className="text-2xl font-bold">{stats.monthlyStreams.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Monthly Streams</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.followers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.projectsCompleted}</p>
                <p className="text-sm text-muted-foreground">Projects Done</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="tools">Quick Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Revenue Target</span>
                    <span className="text-sm">$8,500 / $10,000</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Content Uploads</span>
                    <span className="text-sm">7 / 10</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">New Followers</span>
                    <span className="text-sm">420 / 500</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Projects ({activeProjects})</h3>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
          
          <div className="grid gap-4">
            {[
              { name: 'Summer EP Release', progress: 75, status: 'In Progress', deadline: '2024-03-15' },
              { name: 'Podcast Series', progress: 40, status: 'Recording', deadline: '2024-03-20' },
              { name: 'Music Video', progress: 90, status: 'Post-Production', deadline: '2024-03-10' }
            ].map((project, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{project.name}</h4>
                    <Badge variant="outline">{project.status}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">Due: {project.deadline}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <BarChart3 className="w-16 h-16 mb-4" />
                <p>Analytics dashboard would be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Card key={action.name} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <action.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{action.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                  <Button variant="outline" size="sm">
                    Open <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorHubApp;