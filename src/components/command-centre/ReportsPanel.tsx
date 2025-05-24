
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReportsPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Exportable reports will appear here</p>
      </CardContent>
    </Card>
  );
};

export default ReportsPanel;
