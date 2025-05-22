
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCheck, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

// This would typically be fetched from an API
const acceptedConnections = [
  {
    id: '1',
    name: 'Sarah Thompson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    occupation: 'Software Engineer',
    interests: ['Technology', 'Reading', 'Hiking'],
    status: 'accepted',
    meetupStatus: null
  },
  {
    id: '2',
    name: 'Michael Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    occupation: 'Product Manager',
    interests: ['Business', 'Travel', 'Photography'],
    status: 'accepted',
    meetupStatus: 'scheduled',
    meetupDate: 'May 25, 2025',
    meetupVenue: 'Tech Hub Lagos'
  },
  {
    id: '3',
    name: 'Jessica Williams',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    occupation: 'Marketing Director',
    interests: ['Marketing', 'Art', 'Music'],
    status: 'accepted',
    meetupStatus: 'completed',
    meetupDate: 'May 20, 2025',
    meetupVenue: 'The Brew House'
  },
];

type ConnectionStatus = 'accepted' | 'pending';
type MeetupStatus = 'scheduled' | 'completed' | null;

interface Connection {
  id: string;
  name: string;
  avatar: string;
  occupation: string;
  interests: string[];
  status: ConnectionStatus;
  meetupStatus: MeetupStatus;
  meetupDate?: string;
  meetupVenue?: string;
}

const AcceptedConnections: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'scheduled' | 'completed'>('all');
  
  const filteredConnections = acceptedConnections.filter(connection => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return connection.meetupStatus === null;
    return connection.meetupStatus === activeTab;
  });

  const handlePlanMeetup = (connectionId: string) => {
    navigate(`/plan-meetup/${connectionId}`);
  };
  
  const handleViewConnection = (connectionId: string) => {
    navigate(`/connection/${connectionId}`);
  };
  
  const handleProvideFeedback = (connectionId: string) => {
    navigate(`/meetup-feedback/${connectionId}`);
  };
  
  const getMeetupStatusBadge = (status: MeetupStatus) => {
    if (status === 'scheduled') {
      return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Scheduled</span>;
    }
    if (status === 'completed') {
      return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>;
    }
    return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Pending</span>;
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-navy">Your Accepted Connections</h1>
          <Button 
            variant="outline" 
            className="text-teal border-teal hover:bg-teal/10"
            onClick={() => navigate('/matches')}
          >
            Find More Connections
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex space-x-1 border-b pb-4 mb-6">
            <Button
              variant={activeTab === 'all' ? 'default' : 'ghost'}
              className={activeTab === 'all' ? 'bg-teal text-white' : ''}
              onClick={() => setActiveTab('all')}
            >
              All Connections
            </Button>
            <Button
              variant={activeTab === 'pending' ? 'default' : 'ghost'}
              className={activeTab === 'pending' ? 'bg-teal text-white' : ''}
              onClick={() => setActiveTab('pending')}
            >
              Pending Meetups
            </Button>
            <Button
              variant={activeTab === 'scheduled' ? 'default' : 'ghost'}
              className={activeTab === 'scheduled' ? 'bg-teal text-white' : ''}
              onClick={() => setActiveTab('scheduled')}
            >
              Scheduled Meetups
            </Button>
            <Button
              variant={activeTab === 'completed' ? 'default' : 'ghost'}
              className={activeTab === 'completed' ? 'bg-teal text-white' : ''}
              onClick={() => setActiveTab('completed')}
            >
              Completed Meetups
            </Button>
          </div>
          
          {filteredConnections.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Occupation</TableHead>
                  <TableHead className="hidden md:table-cell">Interests</TableHead>
                  <TableHead>Meetup Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConnections.map((connection) => (
                  <TableRow key={connection.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={connection.avatar} alt={connection.name} />
                          <AvatarFallback>{connection.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{connection.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{connection.occupation}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {connection.interests.map((interest) => (
                          <span 
                            key={interest}
                            className="px-2 py-0.5 bg-gray-100 text-xs rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {getMeetupStatusBadge(connection.meetupStatus)}
                        {connection.meetupStatus && (
                          <div className="text-xs text-gray-500 mt-1">
                            {connection.meetupDate} • {connection.meetupVenue}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8"
                          onClick={() => handleViewConnection(connection.id)}
                        >
                          View
                        </Button>
                        
                        {connection.meetupStatus === null && (
                          <Button 
                            size="sm"
                            className="h-8 bg-teal hover:bg-teal/90 text-white"
                            onClick={() => handlePlanMeetup(connection.id)}
                          >
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            Plan Meetup
                          </Button>
                        )}
                        
                        {connection.meetupStatus === 'scheduled' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 border-yellow-500 text-yellow-500 hover:bg-yellow-50"
                            onClick={() => {
                              toast({
                                title: "Meetup Details",
                                description: `Your meetup with ${connection.name} is scheduled for ${connection.meetupDate} at ${connection.meetupVenue}.`,
                              });
                            }}
                          >
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            Details
                          </Button>
                        )}
                        
                        {connection.meetupStatus === 'completed' && (
                          <Button 
                            size="sm"
                            className="h-8 bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleProvideFeedback(connection.id)}
                          >
                            <MessageSquare className="mr-1 h-3.5 w-3.5" />
                            Feedback
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <UserCheck className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="font-medium text-gray-900">No connections found</h3>
              <p className="text-gray-500 mb-4">
                {activeTab === 'all' 
                  ? "You don't have any accepted connections yet." 
                  : `You don't have any ${activeTab} meetups.`}
              </p>
              <Button 
                className="bg-teal hover:bg-teal/90 text-white"
                onClick={() => navigate('/matches')}
              >
                Find Potential Matches
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Next Steps</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                After connecting with someone, follow these steps to arrange a successful meetup:
              </p>
              <ol className="list-decimal ml-5 space-y-2">
                <li>Plan a meetup by selecting a suitable date, time, and venue</li>
                <li>Meet in person to discuss shared interests and opportunities</li>
                <li>Provide feedback about your experience to help improve future matches</li>
              </ol>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Meetup Tips</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-teal/10 p-1.5 rounded-full">
                  <UserCheck className="h-4 w-4 text-teal" />
                </div>
                <div>
                  <p className="font-medium text-navy">Meet in public places</p>
                  <p className="text-gray-600 text-sm">Choose well-populated venues for your safety</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-teal/10 p-1.5 rounded-full">
                  <Calendar className="h-4 w-4 text-teal" />
                </div>
                <div>
                  <p className="font-medium text-navy">Be punctual</p>
                  <p className="text-gray-600 text-sm">Respect each other's time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-teal/10 p-1.5 rounded-full">
                  <MessageSquare className="h-4 w-4 text-teal" />
                </div>
                <div>
                  <p className="font-medium text-navy">Provide honest feedback</p>
                  <p className="text-gray-600 text-sm">Help improve the matching algorithm</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-teal hover:bg-teal/90 text-white"
                onClick={() => {
                  toast({
                    title: "Safety Tips",
                    description: "Always let someone know where you're going and with whom when meeting a new connection.",
                  });
                }}
              >
                View More Safety Tips
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AcceptedConnections;
