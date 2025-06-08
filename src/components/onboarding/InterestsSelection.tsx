
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface InterestsSelectionProps {
  onNext: (data: InterestsData) => void;
}

interface InterestsData {
  selectedInterests: string[];
  matchPreferences: string[];
}

const interestCategories = {
  creativity: [
    'Freelancing', 'Photography', 'Choir', 'Cosplay', 'Content Creation', 
    'Writing', 'Art', 'Drawing', 'Blogging', 'NFTs', 'Upcycling', 
    'Entrepreneurship', 'Real Estate'
  ],
  fanFavorites: [
    'Comic-Con', 'Harry Potter', 'Marvel', 'Manga', 'NBA', 'MLB', 
    '90s Kid', 'Disney'
  ],
  foodDrink: [
    'Foodie', 'Food tours', 'Mocktails', 'BBQ', 'Brunch', 'Street food', 
    'Wine', 'Cocktails', 'Ice Cream', 'Coffee', 'Ramen'
  ],
  gaming: [
    'PlayStation', 'Xbox', 'Nintendo', 'Among Us', 'Fortnite', 
    'League of Legends', 'Roblox', 'E-Sports'
  ],
  music: [
    'Gospel', 'Pop', 'Soul', 'Jazz', 'Hip Hop', 'EDM', 'Rock', 
    'Reggaeton', 'House Music', 'K-pop', 'Opera', 'Country'
  ],
  goingOut: [
    'Bars', 'Museums', 'Clubbing', 'Drive-in Cinema', 'Escape Rooms', 
    'Thrifting', 'Aquarium', 'Karaoke', 'Pub Quiz', 'Film Festival', 
    'Theater', 'Raves'
  ],
  outdoors: [
    'Rowing', 'Diving', 'Jetskiing', 'Hiking', 'Camping'
  ]
};

const categoryNames = {
  creativity: 'Creativity',
  fanFavorites: 'Fan Favorites',
  foodDrink: 'Food & Drink',
  gaming: 'Gaming',
  music: 'Music',
  goingOut: 'Going Out / Outdoor Fun',
  outdoors: 'Outdoors & Adventure'
};

const InterestsSelection: React.FC<InterestsSelectionProps> = ({ onNext }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [matchPreferences, setMatchPreferences] = useState<string[]>([]);

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        // If removing interest, also remove from match preferences
        setMatchPreferences(current => current.filter(item => item !== interest));
        return prev.filter(item => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleMatchPreferenceToggle = (interest: string) => {
    setMatchPreferences(prev => {
      if (prev.includes(interest)) {
        return prev.filter(item => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleSubmit = () => {
    onNext({
      selectedInterests,
      matchPreferences
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-navy">What are your interests?</h1>
        <p className="text-gray-600">
          Select 5-10 interests that best describe you. You can also indicate which interests you'd like your matches to share.
        </p>
      </div>
      
      <div className="space-y-6">
        {Object.entries(interestCategories).map(([categoryKey, interests]) => (
          <div key={categoryKey} className="space-y-3">
            <h3 className="text-lg font-semibold text-navy">
              {categoryNames[categoryKey as keyof typeof categoryNames]}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interests.map(interest => {
                const isSelected = selectedInterests.includes(interest);
                const isMatchPreference = matchPreferences.includes(interest);
                
                return (
                  <div key={interest} className="space-y-2">
                    <div
                      onClick={() => handleInterestToggle(interest)}
                      className={`p-3 border rounded-lg cursor-pointer text-sm transition ${
                        isSelected
                          ? 'border-teal bg-teal/10 text-teal-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleInterestToggle(interest)}
                          className="mr-2"
                        />
                        <span>{interest}</span>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="ml-4">
                        <div
                          onClick={() => handleMatchPreferenceToggle(interest)}
                          className={`p-2 border rounded-md cursor-pointer text-xs transition ${
                            isMatchPreference
                              ? 'border-orange bg-orange/10 text-orange-700'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <Checkbox
                              checked={isMatchPreference}
                              onCheckedChange={() => handleMatchPreferenceToggle(interest)}
                              className="mr-2 h-3 w-3"
                            />
                            <span>Want in matches</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Selected:</strong> {selectedInterests.length} interests
        </p>
        <p className="text-sm text-gray-600">
          <strong>Match preferences:</strong> {matchPreferences.length} interests
        </p>
        {selectedInterests.length < 5 && (
          <p className="text-sm text-orange-600 mt-2">
            We recommend selecting at least 5 interests for better matches.
          </p>
        )}
      </div>
      
      <Button 
        onClick={handleSubmit}
        className="w-full btn-primary gap-2 mt-6"
        disabled={selectedInterests.length === 0}
      >
        Continue <ArrowRight size={18} />
      </Button>
    </div>
  );
};

export default InterestsSelection;
