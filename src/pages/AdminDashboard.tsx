
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Users, 
  Settings, 
  Calendar, 
  Bell, 
  Shield 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminSettings from '@/components/admin/AdminSettings';

const AdminDashboard: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Community Admin Dashboard</h1>
        
        <Tabs defaultValue="members" className="w-full">
          <div className="border-b mb-4">
            <TabsList className="w-full bg-transparent justify-start gap-4 h-auto pb-2">
              <TabsTrigger value="members" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Users size={18} />
                <span>Members</span>
              </TabsTrigger>
              <TabsTrigger value="rules" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Shield size={18} />
                <span>Rules</span>
              </TabsTrigger>
              <TabsTrigger value="meetups" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Calendar size={18} />
                <span>Meetups</span>
              </TabsTrigger>
              <TabsTrigger value="announcements" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Bell size={18} />
                <span>Announcements</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Settings size={18} />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Members Management</CardTitle>
                <CardDescription>
                  Manage community members, approve join requests, and handle blacklist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
                  <p className="text-muted-foreground">Member management components will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rules">
            <Card>
              <CardHeader>
                <CardTitle>Community Matching Rules</CardTitle>
                <CardDescription>
                  Configure matching rules and criteria for your community members.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
                  <p className="text-muted-foreground">Rules management components will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="meetups">
            <Card>
              <CardHeader>
                <CardTitle>Meetup Monitoring</CardTitle>
                <CardDescription>
                  Track scheduled, completed, and canceled meetups within the community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
                  <p className="text-muted-foreground">Meetup statistics and monitoring will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <CardTitle>Broadcast Announcements</CardTitle>
                <CardDescription>
                  Send announcements and updates to community members.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
                  <p className="text-muted-foreground">Announcement broadcasting form will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
