
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, FilePdf, Calendar, Users, CreditCard, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const reportTypes = [
  { name: 'Community Activity', icon: Users, format: ['CSV', 'PDF'] },
  { name: 'Revenue & Transactions', icon: CreditCard, format: ['CSV', 'PDF'] },
  { name: 'User Engagement', icon: Users, format: ['CSV', 'PDF'] },
  { name: 'Moderation Issues', icon: AlertTriangle, format: ['CSV', 'PDF'] },
  { name: 'Event Analytics', icon: Calendar, format: ['CSV', 'PDF'] },
];

const ReportsPanel = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select defaultValue="community">
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="community">Community Activity</SelectItem>
                    <SelectItem value="revenue">Revenue & Transactions</SelectItem>
                    <SelectItem value="users">User Engagement</SelectItem>
                    <SelectItem value="moderation">Moderation Issues</SelectItem>
                    <SelectItem value="events">Event Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select defaultValue="30days">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <Select defaultValue="csv">
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportTypes.map((report, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <report.icon className="h-5 w-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-xs text-gray-500">Generated on May 22, 2025</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {report.format.includes('CSV') && (
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <FileSpreadsheet className="h-4 w-4" />
                      CSV
                    </Button>
                  )}
                  {report.format.includes('PDF') && (
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <FilePdf className="h-4 w-4" />
                      PDF
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPanel;
