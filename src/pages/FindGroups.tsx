
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const groups = [
  {
    id: '1',
    name: 'Lagos Tech Circle',
    description: 'For tech professionals and enthusiasts in Lagos',
    memberCount: 534,
    image: 'https://images.unsplash.com/photo-1558403194-611308249627',
    categories: ['Technology', 'Professional'],
    isFeatured: true
  },
  {
    id: '2',
    name: 'Church of Grace Fellowship',
    description: 'A spiritual community focused on growth and service',
    memberCount: 328,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    categories: ['Religious', 'Community'],
    isFeatured: false
  },
  {
    id: '3',
    name: 'University of Lagos Alumni',
    description: 'Graduates from University of Lagos across all years',
    memberCount: 742,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
    categories: ['Education', 'Alumni'],
    isFeatured: true
  },
  {
    id: '4',
    name: 'Lagos Young Professionals',
    description: 'Network of ambitious professionals under 35',
    memberCount: 621,
    image: 'https://images.unsplash.com/photo-1541746972996-4fc1d4ee96f0',
    categories: ['Professional', 'Networking'],
    isFeatured: false
  },
  {
    id: '5',
    name: 'Lagos Book Club',
    description: 'For avid readers who enjoy discussing literature',
    memberCount: 156,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353',
    categories: ['Hobby', 'Education'],
    isFeatured: false
  },
  {
    id: '6',
    name: 'Nigerian Medical Association',
    description: 'For healthcare professionals across Nigeria',
    memberCount: 412,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
    categories: ['Professional', 'Medical'],
    isFeatured: true
  },
];

const FindGroups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredGroups, setFilteredGroups] = useState(groups);
  
  const categories = Array.from(
    new Set(groups.flatMap(group => group.categories))
  ).sort();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterGroups(term, selectedCategory);
  };
  
  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    filterGroups(searchTerm, category);
  };
  
  const filterGroups = (term: string, category: string | null) => {
    let filtered = groups;
    
    if (term) {
      filtered = filtered.filter(group => 
        group.name.toLowerCase().includes(term.toLowerCase()) || 
        group.description.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(group => 
        group.categories.includes(category)
      );
    }
    
    setFilteredGroups(filtered);
  };
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Find Your Group</h1>
        <p className="text-gray-600 mb-8">
          Discover communities where you can connect with like-minded individuals
        </p>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for groups by name or description"
                className="pl-10 w-full border border-gray-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-teal"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedCategory === null ? "default" : "outline"}
                className={selectedCategory === null ? "bg-teal hover:bg-teal/90 text-white" : ""}
                onClick={() => handleCategoryFilter(null)}
              >
                All
              </Button>
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-teal hover:bg-teal/90 text-white" : ""}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map(group => (
              <div key={group.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={group.image} 
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                  {group.isFeatured && (
                    <div className="absolute top-3 right-3 bg-orange text-white text-xs px-2.5 py-1.5 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-navy">{group.name}</h3>
                  <p className="text-gray-600 text-sm mt-1 mb-3">
                    {group.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {group.categories.map(category => (
                      <span 
                        key={category} 
                        className="bg-teal/10 text-teal text-xs px-2.5 py-1 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {group.memberCount} members
                    </span>
                    <Button 
                      size="sm"
                      className="bg-teal hover:bg-teal/90 text-white"
                      onClick={() => {
                        // This would typically redirect to group join page
                        // For now, just go to onboarding
                        window.location.href = '/onboarding';
                      }}
                    >
                      Join Group
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredGroups.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600">No groups found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                    setFilteredGroups(groups);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-navy/5 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-navy mb-3">Don't see your community?</h2>
          <p className="text-gray-600 mb-4">
            Talk to your community leaders about getting set up with CircleMate
          </p>
          <Link to="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default FindGroups;
