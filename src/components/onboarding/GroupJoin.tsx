
import React, { useState } from 'react';
import { Search, ArrowRight, Church, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GroupJoinProps {
  onNext: (groupId: string) => void;
  platform?: string | null;
}

const faithBasedGroups = [
  { id: '1', name: 'First Baptist Church Fellowship', members: 534, type: 'Church' },
  { id: '2', name: 'Grace Community Church', members: 213, type: 'Church' },
  { id: '3', name: 'New Life Christian Center', members: 1204, type: 'Church' },
  { id: '4', name: 'Redeemed Church of God', members: 189, type: 'Church' },
  { id: '5', name: 'Catholic Young Adults', members: 342, type: 'Church' },
];

const generalGroups = [
  { id: '6', name: 'Lagos Tech Circle', members: 534, type: 'Professional' },
  { id: '7', name: 'UNN Alumni Association', members: 213, type: 'Alumni' },
  { id: '8', name: 'Design Lagos', members: 1204, type: 'Professional' },
  { id: '9', name: 'Health & Wellness Club', members: 189, type: 'Lifestyle' },
  { id: '10', name: 'Book Lovers Society', members: 342, type: 'Hobby' },
];

const GroupJoin: React.FC<GroupJoinProps> = ({ onNext, platform }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const isCircleMate = platform === 'circlemate';
  const exampleGroups = isCircleMate ? faithBasedGroups : generalGroups;
  
  const filteredGroups = exampleGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedGroup) {
      onNext(selectedGroup);
    } else if (groupCode.trim()) {
      onNext(groupCode);
    }
  };

  const handleContinueWithoutCommunity = () => {
    onNext('skip');
  };

  const platformIcon = isCircleMate ? Church : Globe;
  const platformColor = isCircleMate ? 'text-teal' : 'text-orange';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
          {React.createElement(platformIcon, { className: `w-8 h-8 ${platformColor}` })}
        </div>
        <h1 className="text-2xl font-bold mb-2 text-navy">
          {isCircleMate ? 'Find Your Faith Community' : 'Find Your Community'}
        </h1>
        <p className="text-gray-600">
          {isCircleMate 
            ? 'Join your church or faith-based community where you\'ll connect with fellow believers.'
            : 'Join a trusted circle where you\'ll connect with like-minded individuals.'
          }
        </p>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="search">Search Groups</TabsTrigger>
          <TabsTrigger value="code">Enter Group Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={isCircleMate ? "Search churches..." : "Search groups..."}
              className="pl-10 input-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm max-h-60 overflow-y-auto">
            {filteredGroups.length > 0 ? (
              filteredGroups.map(group => (
                <div 
                  key={group.id}
                  className={`p-4 border-b last:border-b-0 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors ${selectedGroup === group.id ? (isCircleMate ? 'bg-teal/10' : 'bg-orange/10') : ''}`}
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <div>
                    <h3 className="font-medium">{group.name}</h3>
                    <p className="text-sm text-gray-500">{group.members} members · {group.type}</p>
                  </div>
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex-shrink-0 flex items-center justify-center">
                    {selectedGroup === group.id && (
                      <div className={`h-3 w-3 rounded-full ${isCircleMate ? 'bg-teal' : 'bg-orange'}`}></div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No groups found matching "{searchTerm}"
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="space-y-4">
          <Input
            type="text"
            placeholder={isCircleMate ? "Enter your church's invitation code" : "Enter your group's invitation code"}
            className="input-primary"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
          />
          <p className="text-sm text-gray-500 italic">
            {isCircleMate 
              ? "Church codes are provided by your pastor or church administrator."
              : "Group codes are provided by group administrators. If you don't have a code, you can search for public groups."
            }
          </p>
        </TabsContent>
      </Tabs>

      <div className="space-y-3">
        <Button 
          className={`w-full gap-2 ${isCircleMate ? 'btn-primary' : 'bg-orange hover:bg-orange/90 text-white'}`}
          disabled={!selectedGroup && !groupCode.trim()}
          onClick={handleContinue}
        >
          Continue <ArrowRight size={18} />
        </Button>
        
        <Button 
          variant="outline"
          className="w-full font-bold text-base border-2"
          onClick={handleContinueWithoutCommunity}
        >
          Continue without Community
        </Button>
      </div>
    </div>
  );
};

export default GroupJoin;
