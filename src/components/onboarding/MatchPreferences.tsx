
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MatchPreferencesProps {
  onNext: (preferences: MatchPreferencesData) => void;
  intent?: string[];
}

interface MatchPreferencesData {
  maritalStatus: string[];
  ageRange: { min: number; max: number };
  ethnicity: string[];
  religion: string[];
  drinkingHabits: string[];
  smokingHabits: string[];
}

const maritalOptions = ['single', 'married', 'divorced', 'widowed', 'other'];
const ethnicityOptions = ['asian', 'black', 'hispanic', 'white', 'mixed', 'other', 'prefer-not-to-say'];
const religionOptions = ['christian', 'muslim', 'jewish', 'hindu', 'buddhist', 'atheist', 'agnostic', 'other'];
const drinkingOptions = ['never', 'occasionally', 'socially', 'regularly', 'prefer-not-to-say'];
const smokingOptions = ['never', 'occasionally', 'socially', 'regularly', 'prefer-not-to-say'];

const MatchPreferences: React.FC<MatchPreferencesProps> = ({ onNext, intent }) => {
  const [preferences, setPreferences] = useState<MatchPreferencesData>({
    maritalStatus: [],
    ageRange: { min: 18, max: 65 },
    ethnicity: [],
    religion: [],
    drinkingHabits: [],
    smokingHabits: []
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleMultiSelect = (field: keyof MatchPreferencesData, value: string) => {
    if (field === 'ageRange') return;
    
    setPreferences(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAgeRangeChange = (values: number[]) => {
    setPreferences(prev => ({
      ...prev,
      ageRange: { min: values[0], max: values[1] }
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (preferences.maritalStatus.length === 0) {
      newErrors.maritalStatus = 'Please select at least one marital status preference';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(preferences);
    }
  };

  const renderMultiSelectSection = (
    title: string,
    field: keyof MatchPreferencesData,
    options: string[],
    formatLabel: (value: string) => string = (v) => v.charAt(0).toUpperCase() + v.slice(1).replace('-', ' ')
  ) => (
    <div className="space-y-3">
      <Label className="text-base font-medium">{title}</Label>
      <div className="grid grid-cols-2 gap-2">
        {options.map(option => (
          <div
            key={option}
            onClick={() => handleMultiSelect(field, option)}
            className={`p-3 border rounded-lg cursor-pointer text-sm transition ${
              (preferences[field] as string[]).includes(option)
                ? 'border-teal bg-teal/10 text-teal-700'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <Checkbox
                checked={(preferences[field] as string[]).includes(option)}
                onCheckedChange={() => handleMultiSelect(field, option)}
                className="mr-2"
              />
              <span>{formatLabel(option)}</span>
            </div>
          </div>
        ))}
      </div>
      {errors[field] && (
        <p className="text-red-500 text-sm">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-navy">Match Preferences</h1>
        <p className="text-gray-600">
          Tell us what you're looking for in potential connections.
        </p>
      </div>
      
      <div className="space-y-6">
        {renderMultiSelectSection('Marital Status Preference', 'maritalStatus', maritalOptions)}
        
        <div className="space-y-3">
          <Label className="text-base font-medium">Age Range: {preferences.ageRange.min} - {preferences.ageRange.max} years</Label>
          <Slider
            min={18}
            max={80}
            step={1}
            value={[preferences.ageRange.min, preferences.ageRange.max]}
            onValueChange={handleAgeRangeChange}
            className="w-full"
          />
        </div>

        {renderMultiSelectSection('Ethnicity Preference', 'ethnicity', ethnicityOptions)}
        {renderMultiSelectSection('Religion Preference', 'religion', religionOptions)}
        {renderMultiSelectSection('Drinking Habits Preference', 'drinkingHabits', drinkingOptions)}
        {renderMultiSelectSection('Smoking Habits Preference', 'smokingHabits', smokingOptions)}
      </div>
      
      <Button 
        onClick={handleSubmit}
        className="w-full btn-primary gap-2 mt-6"
      >
        Continue <ArrowRight size={18} />
      </Button>
    </div>
  );
};

export default MatchPreferences;
