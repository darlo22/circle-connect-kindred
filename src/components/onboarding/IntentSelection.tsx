
import React, { useState } from 'react';
import { ArrowRight, Heart, Users, Briefcase, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface IntentSelectionProps {
  onNext: (intent: string[]) => void;
}

const intentOptions = [
  {
    id: 'dating',
    name: 'Dating / Romance',
    description: 'Looking for romantic connections and relationships',
    icon: Heart,
    color: 'text-red-500'
  },
  {
    id: 'friendship',
    name: 'Friendship',
    description: 'Building platonic friendships and social connections',
    icon: Users,
    color: 'text-blue-500'
  },
  {
    id: 'professional',
    name: 'Professional Networking',
    description: 'Career growth and business connections',
    icon: Briefcase,
    color: 'text-green-500'
  },
  {
    id: 'activity',
    name: 'Activity Partner',
    description: 'Finding companions for hobbies and activities',
    icon: Calendar,
    color: 'text-orange-500'
  }
];

const IntentSelection: React.FC<IntentSelectionProps> = ({ onNext }) => {
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleIntentToggle = (intentId: string) => {
    setSelectedIntents(prev => {
      if (prev.includes(intentId)) {
        return prev.filter(id => id !== intentId);
      } else {
        return [...prev, intentId];
      }
    });
    
    if (error) {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (selectedIntents.length === 0) {
      setError('Please select at least one connection type');
      return;
    }
    
    onNext(selectedIntents);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-navy">What kind of connections are you looking for?</h1>
        <p className="text-gray-600">
          Select all that apply. This helps us customize your experience.
        </p>
      </div>
      
      <div className="space-y-4">
        {intentOptions.map(intent => {
          const IconComponent = intent.icon;
          const isSelected = selectedIntents.includes(intent.id);
          
          return (
            <div 
              key={intent.id}
              onClick={() => handleIntentToggle(intent.id)}
              className={`p-4 border rounded-lg cursor-pointer transition ${
                isSelected
                  ? 'border-teal bg-teal/5'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start">
                <Checkbox 
                  id={intent.id}
                  checked={isSelected}
                  onCheckedChange={() => handleIntentToggle(intent.id)}
                  className="mr-4 mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <IconComponent className={`mr-2 ${intent.color}`} size={20} />
                    <Label htmlFor={intent.id} className="font-medium cursor-pointer">
                      {intent.name}
                    </Label>
                  </div>
                  <p className="text-sm text-gray-600">{intent.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
      
      <Button 
        onClick={handleSubmit}
        className="w-full btn-primary gap-2 mt-6"
      >
        Continue <ArrowRight size={18} />
      </Button>
    </div>
  );
};

export default IntentSelection;
