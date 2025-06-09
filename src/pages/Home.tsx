
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { mockCommunityData } from '@/data/mockCommunityData';
import { ArrowRight, Heart, Users, Church, Globe, Search, X } from 'lucide-react';

const faithBasedCommunities = [
  { id: '1', name: 'First Baptist Church Fellowship', members: 534, type: 'Church', city: 'Lagos' },
  { id: '2', name: 'Grace Community Church', members: 213, type: 'Church', city: 'Abuja' },
  { id: '3', name: 'New Life Christian Center', members: 1204, type: 'Church', city: 'Port Harcourt' },
  { id: '4', name: 'Redeemed Church of God', members: 189, type: 'Church', city: 'Ibadan' },
  { id: '5', name: 'Catholic Young Adults', members: 342, type: 'Church', city: 'Kano' },
  { id: '6', name: 'Living Faith Church', members: 789, type: 'Church', city: 'Benin City' },
  { id: '7', name: 'Christ Embassy', members: 445, type: 'Church', city: 'Lagos' },
  { id: '8', name: 'Mountain of Fire', members: 623, type: 'Church', city: 'Ogun' },
  { id: '9', name: 'Deeper Life Bible Church', members: 367, type: 'Church', city: 'Kaduna' },
  { id: '10', name: 'Winners Chapel', members: 892, type: 'Church', city: 'Ota' }
];

const generalCommunities = [
  { id: '11', name: 'Lagos Tech Circle', members: 534, type: 'Professional', city: 'Lagos' },
  { id: '12', name: 'UNN Alumni Association', members: 213, type: 'Alumni', city: 'Enugu' },
  { id: '13', name: 'Design Lagos', members: 1204, type: 'Professional', city: 'Lagos' },
  { id: '14', name: 'Health & Wellness Club', members: 189, type: 'Lifestyle', city: 'Abuja' },
  { id: '15', name: 'Book Lovers Society', members: 342, type: 'Hobby', city: 'Ibadan' },
  { id: '16', name: 'Nigerian Medical Association', members: 789, type: 'Professional', city: 'Lagos' },
  { id: '17', name: 'Lagos Photography Club', members: 445, type: 'Hobby', city: 'Lagos' },
  { id: '18', name: 'Fitness Enthusiasts NG', members: 623, type: 'Lifestyle', city: 'Port Harcourt' },
  { id: '19', name: 'Entrepreneurs Network', members: 367, type: 'Business', city: 'Lagos' },
  { id: '20', name: 'Food Lovers Lagos', members: 892, type: 'Lifestyle', city: 'Lagos' }
];

const BrowseCommunitiesDialog = ({ platform, isOpen, onClose }: { platform: string, isOpen: boolean, onClose: () => void }) => {
  const isCircleMate = platform === 'circlemate';
  const communities = isCircleMate ? faithBasedCommunities : generalCommunities;
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCommunities = communities.filter(community => 
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
              Browse {isCircleMate ? 'Faith Communities' : 'Communities'}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={isCircleMate ? "Search churches..." : "Search communities..."}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {filteredCommunities.map(community => (
              <div key={community.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{community.name}</h3>
                    <p className="text-sm text-gray-500">{community.members} members • {community.type} • {community.city}</p>
                  </div>
                  <Button 
                    size="sm" 
                    className={isCircleMate ? 'btn-primary' : 'bg-orange hover:bg-orange/90 text-white'}
                    onClick={() => window.location.href = `/onboarding?platform=${platform}&groupId=${community.id}`}
                  >
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-3">
              Don't see your community? You can continue without selecting one and browse later.
            </p>
            <Link to={`/onboarding?platform=${platform}&join=browse`} className="w-full">
              <Button variant="outline" className="w-full">
                Continue Without Community
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Home: React.FC = () => {
  const location = useLocation();
  const [browseCommunities, setBrowseCommunities] = useState<{ open: boolean, platform: string }>({
    open: false,
    platform: ''
  });

  const handleBrowseCommunities = (platform: string) => {
    setBrowseCommunities({ open: true, platform });
  };
  
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Remove the '#' character
      const id = location.hash.substring(1);
      
      // Find the element with the matching ID
      const element = document.getElementById(id);
      
      // If found, scroll to it
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);
  
  return (
    <Layout>
      <Hero />
      
      {/* Platform Selection Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Choose Your Platform</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the platform that best fits your community and connection goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CircleMate - Faith Based */}
            <Card className="border-2 border-teal/20 hover:border-teal transition-all hover:shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Church className="w-8 h-8 text-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-2">CircleMate</h3>
                  <p className="text-gray-600">For Faith-Based Communities</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-teal flex-shrink-0" />
                    <p className="text-gray-700">Connect within your church and faith community</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-teal flex-shrink-0" />
                    <p className="text-gray-700">Find meaningful relationships grounded in shared values</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Church className="w-5 h-5 text-teal flex-shrink-0" />
                    <p className="text-gray-700">Pastor-approved and community-verified members</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/onboarding?platform=circlemate" className="w-full">
                    <Button className="w-full btn-primary gap-2">
                      Join Your Church Community <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => handleBrowseCommunities('circlemate')}
                  >
                    Browse Communities
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* CircleMate+ - General */}
            <Card className="border-2 border-orange/20 hover:border-orange transition-all hover:shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-orange" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-2">CircleMate+</h3>
                  <p className="text-gray-600">For All Communities</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-orange flex-shrink-0" />
                    <p className="text-gray-700">Join diverse communities of all types</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-orange flex-shrink-0" />
                    <p className="text-gray-700">Professional, social, hobby, and interest-based groups</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-orange flex-shrink-0" />
                    <p className="text-gray-700">Connect globally with like-minded individuals</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/onboarding?platform=circlemate-plus" className="w-full">
                    <Button className="w-full bg-orange hover:bg-orange/90 text-white gap-2">
                      Join Your Community <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2 border-orange text-orange hover:bg-orange/10"
                    onClick={() => handleBrowseCommunities('circlemate-plus')}
                  >
                    Browse Communities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Features />
      <HowItWorks />
      <Testimonials />
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
      <CTA />

      {/* Browse Communities Dialog */}
      <BrowseCommunitiesDialog 
        platform={browseCommunities.platform}
        isOpen={browseCommunities.open}
        onClose={() => setBrowseCommunities({ open: false, platform: '' })}
      />
    </Layout>
  );
};

export default Home;
