import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Plus, Download, Eye, Edit, Shield } from 'lucide-react';

const PublishingApp: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<string | null>(null);

  const contracts = [
    {
      id: '1',
      title: 'Summer Vibes EP - Publishing Agreement',
      type: 'Publishing',
      status: 'active',
      createdAt: '2024-01-15',
      splits: [
        { name: 'You (Artist)', percentage: 60 },
        { name: 'Producer Mike', percentage: 25 },
        { name: 'PUABO Publishing', percentage: 15 }
      ]
    },
    {
      id: '2',
      title: 'City Lights - Sync License',
      type: 'Sync License',
      status: 'pending',
      createdAt: '2024-02-01',
      splits: [
        { name: 'You (Artist)', percentage: 80 },
        { name: 'PUABO Publishing', percentage: 20 }
      ]
    }
  ];

  const ipRegistrations = [
    { id: '1', title: 'Summer Vibes', type: 'Song', status: 'registered', registrationNumber: 'IP-2024-001' },
    { id: '2', title: 'City Lights', type: 'Song', status: 'pending', registrationNumber: 'IP-2024-002' },
    { id: '3', title: 'PUABO Brand Logo', type: 'Trademark', status: 'registered', registrationNumber: 'TM-2024-001' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">PUABO Publishing</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            Register IP
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Contract
          </Button>
        </div>
      </div>

      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="ip">IP Registration</TabsTrigger>
          <TabsTrigger value="splits">Revenue Splits</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          <div className="grid gap-4">
            {contracts.map((contract) => (
              <Card key={contract.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">{contract.title}</h3>
                        <p className="text-sm text-muted-foreground">{contract.type} • {contract.createdAt}</p>
                      </div>
                    </div>
                    <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>
                      {contract.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Parties: </span>
                      {contract.splits.length} contributors
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ip" className="space-y-4">
          <div className="grid gap-4">
            {ipRegistrations.map((ip) => (
              <Card key={ip.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">{ip.title}</h3>
                        <p className="text-sm text-muted-foreground">{ip.type} • {ip.registrationNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={ip.status === 'registered' ? 'default' : 'secondary'}>
                        {ip.status}
                      </Badge>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="splits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Split Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Project Name</label>
                  <Input placeholder="Enter project name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Total Revenue</label>
                  <Input placeholder="$0.00" type="number" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Contributors</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="Name" />
                  <Input placeholder="Percentage" type="number" />
                  <Button variant="outline" size="sm">Add</Button>
                </div>
              </div>

              <Button className="w-full">Calculate Splits</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Publishing Agreement', description: 'Standard music publishing contract' },
              { name: 'Sync License', description: 'License for sync placement' },
              { name: 'Work for Hire', description: 'Producer/songwriter agreement' },
              { name: 'Distribution Deal', description: 'Digital distribution contract' }
            ].map((template) => (
              <Card key={template.name} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublishingApp;