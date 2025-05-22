
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Calendar, MessageCircle, Heart } from 'lucide-react';

const activities = [
  {
    id: '1',
    type: 'match_requested',
    user: 'David Brown',
    timestamp: '2 hours ago',
    icon: <User className="h-4 w-4" />,
    color: 'bg-orange/20 text-orange'
  },
  {
    id: '2',
    type: 'meetup_scheduled',
    user: 'Jessica Williams',
    timestamp: '1 day ago',
    details: 'Coffee at The Brew House',
    date: 'Tomorrow, 10:00 AM',
    icon: <Calendar className="h-4 w-4" />,
    color: 'bg-teal/20 text-teal'
  },
  {
    id: '3',
    type: 'feedback_received',
    user: 'Michael Johnson',
    timestamp: '2 days ago',
    details: 'Great conversation, would meet again!',
    rating: 5,
    icon: <MessageCircle className="h-4 w-4" />,
    color: 'bg-navy/20 text-navy'
  },
  {
    id: '4',
    type: 'match_confirmed',
    user: 'Sarah Thompson',
    timestamp: '3 days ago',
    icon: <Heart className="h-4 w-4" />,
    color: 'bg-orange/20 text-orange'
  }
];

const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-navy mb-6">Recent Activity</h2>
      
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}>
              {activity.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <span className="font-medium text-navy">{activity.user}</span>
                  {activity.type === 'match_requested' && (
                    <span className="ml-1">requested to connect with you</span>
                  )}
                  {activity.type === 'meetup_scheduled' && (
                    <span className="ml-1">scheduled a meetup with you</span>
                  )}
                  {activity.type === 'feedback_received' && (
                    <span className="ml-1">left feedback on your meetup</span>
                  )}
                  {activity.type === 'match_confirmed' && (
                    <span className="ml-1">confirmed your connection request</span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{activity.timestamp}</span>
              </div>
              
              {(activity.details || activity.date) && (
                <div className="mt-1 text-sm text-gray-600">
                  {activity.details && <p>{activity.details}</p>}
                  {activity.date && (
                    <p className="flex items-center gap-1 mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {activity.date}
                    </p>
                  )}
                </div>
              )}
              
              {activity.rating && (
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-4 h-4 ${i < activity.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              
              {activity.type === 'match_requested' && (
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="bg-teal hover:bg-teal/90 text-white">Accept</Button>
                  <Button size="sm" variant="outline">Decline</Button>
                </div>
              )}
              
              {activity.type === 'meetup_scheduled' && (
                <div className="mt-3">
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
