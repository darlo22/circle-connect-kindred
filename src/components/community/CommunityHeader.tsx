
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { Community } from '@/types/community';

interface CommunityHeaderProps {
  community: Community;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ community }) => {
  return (
    <div className="relative">
      {/* Banner Image */}
      <div 
        className="h-64 w-full rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${community.bannerImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
      </div>
      
      {/* Community Info Overlay */}
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{community.name}</h1>
        <div className="flex items-center space-x-4 mb-2">
          <Badge variant="outline" className="bg-white/20 text-white border-none">
            {community.subscriptionType}
          </Badge>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{community.memberCount} members</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
