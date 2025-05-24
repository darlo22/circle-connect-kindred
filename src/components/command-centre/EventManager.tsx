
import React from 'react';
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
import { Flag, Users, Calendar } from 'lucide-react';

const mockEvents = [
  {
    id: 'evt-1',
    name: 'Tech Networking Mixer',
    communityName: 'Tech Enthusiasts Group',
    date: '2025-06-15',
    price: 15.00,
    attendees: 45,
    status: 'upcoming'
  },
  {
    id: 'evt-2',
    name: 'Wellness Workshop',
    communityName: 'Mindful Living Circle',
    date: '2025-06-12',
    price: 0,
    attendees: 28,
    status: 'upcoming'
  },
  {
    id: 'evt-3',
    name: 'Business Strategy Seminar',
    communityName: 'Entrepreneur Network',
    date: '2025-06-10',
    price: 25.00,
    attendees: 52,
    status: 'upcoming'
  },
  {
    id: 'evt-4',
    name: 'Book Club Meeting',
    communityName: 'Literary Minds',
    date: '2025-06-08',
    price: 0,
    attendees: 18,
    status: 'upcoming'
  }
];

const EventManager = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Upcoming Events</h3>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          All Events
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Community</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{event.communityName}</TableCell>
                <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-gray-500" />
                    <span>{event.attendees}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm" className="text-amber-500">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EventManager;
