
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Bell, CheckCircle, XCircle } from 'lucide-react';

const mockReportedItems = [
  { 
    id: 'rep-1', 
    type: 'User', 
    target: 'Thomas Wilson', 
    reason: 'Inappropriate messages', 
    reportedBy: 'Sarah Mitchell', 
    date: '2025-06-01', 
    status: 'pending' 
  },
  { 
    id: 'rep-2', 
    type: 'Content', 
    target: 'Tech Meetup Announcement', 
    reason: 'Misleading information', 
    reportedBy: 'David Johnson', 
    date: '2025-05-31', 
    status: 'pending' 
  },
  { 
    id: 'rep-3', 
    type: 'Community', 
    target: 'Crypto Trading Group', 
    reason: 'Promoting scams', 
    reportedBy: 'Emma Thompson', 
    date: '2025-05-30', 
    status: 'pending' 
  },
  { 
    id: 'rep-4', 
    type: 'Event', 
    target: 'Investment Workshop', 
    reason: 'Suspicious activity', 
    reportedBy: 'Michael Brown', 
    date: '2025-05-29', 
    status: 'resolved' 
  }
];

const ModeratorTools = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Reported Items</h3>
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex gap-1 items-center">
          <Bell className="h-3.5 w-3.5" />
          <span>3 New Reports</span>
        </Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReportedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Badge variant="outline" className="bg-gray-50">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{item.target}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>{item.reportedBy}</TableCell>
                  <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {item.status === 'pending' ? (
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" className="text-green-600">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Resolved
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Platform Blacklist</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-gray-500">Blacklisted users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Content Violations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">18</p>
            <p className="text-sm text-gray-500">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">43</p>
            <p className="text-sm text-gray-500">This month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModeratorTools;
