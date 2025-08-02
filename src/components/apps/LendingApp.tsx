import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  Calculator
} from 'lucide-react';

const LendingApp: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');

  const loanApplications = [
    { id: 1, amount: 5000, purpose: 'Equipment Purchase', status: 'pending', date: '2024-01-15' },
    { id: 2, amount: 2500, purpose: 'Marketing Campaign', status: 'approved', date: '2024-01-10' },
    { id: 3, amount: 7500, purpose: 'Studio Setup', status: 'rejected', date: '2024-01-08' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">BLAC ALT Lending</h2>
        <Badge variant="secondary">Creator Financing</Badge>
      </div>

      <Tabs defaultValue="apply" className="w-full">
        <TabsList>
          <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="calculator">Loan Calculator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Loan Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Loan Amount ($)</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Purpose of Loan</label>
                <Textarea
                  placeholder="Describe how you plan to use this loan..."
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Income</label>
                  <Input type="number" placeholder="$0" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Credit Score</label>
                  <Input type="number" placeholder="700" />
                </div>
              </div>
              
              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Submit Application
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {loanApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(app.status)}
                      <div>
                        <p className="font-medium">${app.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{app.purpose}</p>
                        <p className="text-xs text-gray-500">{app.date}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(app.status)}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Loan Amount</label>
                  <Input type="number" placeholder="$10,000" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                  <Input type="number" placeholder="5.5" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Term (months)</label>
                  <Input type="number" placeholder="12" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Payment</label>
                  <Input type="text" value="$876.04" readOnly className="bg-gray-50" />
                </div>
              </div>
              
              <Button className="w-full" variant="outline">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Payment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LendingApp;