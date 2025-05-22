
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ConnectionPreferencesProps {
  onNext: (preferences: ConnectionPreferencesData) => void;
}

interface ConnectionPreferencesData {
  intent: string;
  budget: string;
  interests: string[];
}

const interestOptions = [
  { id: 'reading', label: 'Reading & Literature' },
  { id: 'fitness', label: 'Fitness & Wellness' },
  { id: 'tech', label: 'Technology' },
  { id: 'cooking', label: 'Cooking & Food' },
  { id: 'art', label: 'Art & Design' },
  { id: 'travel', label: 'Travel & Adventure' },
  { id: 'music', label: 'Music & Concerts' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'movies', label: 'Movies & TV Shows' },
  { id: 'sports', label: 'Sports' },
  { id: 'entrepreneurship', label: 'Entrepreneurship' },
  { id: 'volunteering', label: 'Volunteering & Charity' },
  { id: 'nature', label: 'Nature & Outdoors' },
  { id: 'spirituality', label: 'Spirituality & Faith' },
  { id: 'photography', label: 'Photography' }
];

const ConnectionPreferences: React.FC<ConnectionPreferencesProps> = ({ onNext }) => {
  const [preferences, setPreferences] = useState<ConnectionPreferencesData>({
    intent: '',
    budget: '',
    interests: []
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleIntentChange = (value: string) => {
    setPreferences(prev => ({ ...prev, intent: value }));
    if (errors.intent) {
      setErrors(prev => ({ ...prev, intent: '' }));
    }
  };
  
  const handleBudgetChange = (value: string) => {
    setPreferences(prev => ({ ...prev, budget: value }));
    if (errors.budget) {
      setErrors(prev => ({ ...prev, budget: '' }));
    }
  };
  
  const handleInterestChange = (interest: string, checked: boolean) => {
    setPreferences(prev => {
      const newInterests = checked 
        ? [...prev.interests, interest] 
        : prev.interests.filter(i => i !== interest);
        
      return { ...prev, interests: newInterests };
    });
    
    if (errors.interests) {
      setErrors(prev => ({ ...prev, interests: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!preferences.intent) {
      newErrors.intent = 'Please select your connection intent';
    }
    
    if (!preferences.budget) {
      newErrors.budget = 'Please select your budget range';
    }
    
    if (preferences.interests.length < 3) {
      newErrors.interests = 'Please select at least 3 interests';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      onNext(preferences);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-navy">Connection Preferences</h1>
        <p className="text-gray-600">
          Tell us what kind of connections you're looking for.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Connection Intent</Label>
          <Tabs className="w-full" value={preferences.intent} onValueChange={handleIntentChange}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="friendship">Friendship</TabsTrigger>
              <TabsTrigger value="romance">Romance</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
            </TabsList>
          </Tabs>
          {errors.intent && (
            <p className="text-red-500 text-sm">{errors.intent}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range for Activities</Label>
          <Select value={preferences.budget} onValueChange={handleBudgetChange}>
            <SelectTrigger className={errors.budget ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Budget-friendly (₦5,000 or less)</SelectItem>
              <SelectItem value="moderate">Moderate (₦5,000 - ₦15,000)</SelectItem>
              <SelectItem value="premium">Premium (₦15,000 - ₦30,000)</SelectItem>
              <SelectItem value="luxury">Luxury (₦30,000+)</SelectItem>
            </SelectContent>
          </Select>
          {errors.budget && (
            <p className="text-red-500 text-sm">{errors.budget}</p>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Interests & Hobbies</Label>
            <span className="text-sm text-gray-500">
              Selected: {preferences.interests.length}/15
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
            {interestOptions.map((interest) => (
              <div key={interest.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={interest.id} 
                  checked={preferences.interests.includes(interest.id)}
                  onCheckedChange={(checked) => 
                    handleInterestChange(interest.id, checked as boolean)
                  }
                />
                <Label htmlFor={interest.id} className="text-sm cursor-pointer">
                  {interest.label}
                </Label>
              </div>
            ))}
          </div>
          {errors.interests && (
            <p className="text-red-500 text-sm">{errors.interests}</p>
          )}
          <p className="text-sm text-gray-500 italic">
            Select at least 3 interests that you enjoy or are passionate about.
          </p>
        </div>
      </div>
      
      <Button onClick={handleSubmit} className="w-full btn-primary gap-2 mt-6">
        Continue <ArrowRight size={18} />
      </Button>
    </div>
  );
};

export default ConnectionPreferences;
