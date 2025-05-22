
import React from 'react';
import Layout from '../components/layout/Layout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCards from '../components/dashboard/StatCards';
import MatchGrid from '../components/dashboard/MatchGrid';
import ActivityFeed from '../components/dashboard/ActivityFeed';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-8">
        <DashboardHeader 
          groupName="Lagos Tech Circle"
          memberCount={534}
          matchesCount={156}
        />
        
        <StatCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MatchGrid />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
