
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { mockCommunityData } from '@/data/mockCommunityData';

const FeaturedCommunities: React.FC = () => {
  return (
    <div className="bg-cream py-16">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockCommunityData.map(community => (
            <Card key={community.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div 
                className="h-48 w-full bg-cover bg-center border-b"
                style={{ backgroundImage: `url(${community.bannerImage})` }}
              />
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">{community.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{community.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{community.memberCount} members</span>
                  <Link 
                    to={`/community/${community.id}`}
                    className="text-teal hover:text-teal/80 font-medium"
                  >
                    View Community
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCommunities;
