
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface DatingPreferencesProps {
  onNext: (data: DatingPreferencesData) => void;
}

interface DatingPreferencesData {
  personalInfo: {
    bodyType?: string;
    hasChildren?: string;
    wantsChildren?: string;
  };
  matchPreferences: {
    bodyType?: string[];
    childrenTolerance?: string[];
    physicalPreferences?: string[];
  };
}

const bodyTypeOptions = ['slim', 'average', 'athletic', 'curvy', 'plus-size', 'prefer-not-to-say'];
const childrenOptions = ['yes', 'no', 'not-sure'];
const physicalPreferenceOptions = [
  'tall', 'short', 'fair-skin', 'dark-skin', 'athletic-build', 
  'curvy', 'slim', 'facial-hair', 'clean-shaven', 'long-hair', 'short-hair'
];

const DatingPreferences: React.FC<DatingPreferencesProps> = ({ onNext }) => {
  const [personalInfo, setPersonalInfo] = useState({
    bodyType: '',
    hasChildren: '',
    wantsChildren: ''
  });
  
  const [matchPreferences, setMatchPreferences] = useState({
    bodyType: [] as string[],
    childrenTolerance: [] as string[],
    physicalPreferences: [] as string[]
  });

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleMatchPreferenceToggle = (field: keyof typeof matchPreferences, value: string) => {
    setMatchPreferences(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = () => {
    onNext({
      personalInfo,
      matchPreferences
    });
  };

  const formatLabel = (value: string) => 
    value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-navy">Dating Preferences</h1>
        <p className="text-gray-600">
          Additional preferences for romantic connections.
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-navy mb-4">About Me</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>My Body Type</Label>
              <Select
                value={personalInfo.bodyType}
                onValueChange={(value) => handlePersonalInfoChange('bodyType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your body type" />
                </SelectTrigger>
                <SelectContent>
                  {bodyTypeOptions.map(option => (
                    <SelectItem key={option} value={option}>
                      {formatLabel(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Do you have children?</Label>
              <RadioGroup
                value={personalInfo.hasChildren}
                onValueChange={(value) => handlePersonalInfoChange('hasChildren', value)}
                className="flex flex-row space-x-4"
              >
                {childrenOptions.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`has-${option}`} />
                    <Label htmlFor={`has-${option}`}>{formatLabel(option)}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Do you want children in the future?</Label>
              <RadioGroup
                value={personalInfo.wantsChildren}
                onValueChange={(value) => handlePersonalInfoChange('wantsChildren', value)}
                className="flex flex-row space-x-4"
              >
                {childrenOptions.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`wants-${option}`} />
                    <Label htmlFor={`wants-${option}`}>{formatLabel(option)}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Match Preferences Section */}
        <div className="bg-teal/5 p-4 rounded-lg">
          <h3 className="font-semibold text-navy mb-4">Match Preferences</h3>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Preferred Body Types</Label>
              <div className="grid grid-cols-2 gap-2">
                {bodyTypeOptions.map(option => (
                  <div
                    key={option}
                    onClick={() => handleMatchPreferenceToggle('bodyType', option)}
                    className={`p-3 border rounded-lg cursor-pointer text-sm transition ${
                      matchPreferences.bodyType.includes(option)
                        ? 'border-teal bg-teal/10 text-teal-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Checkbox
                        checked={matchPreferences.bodyType.includes(option)}
                        onCheckedChange={() => handleMatchPreferenceToggle('bodyType', option)}
                        className="mr-2"
                      />
                      <span>{formatLabel(option)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Children Tolerance</Label>
              <div className="grid grid-cols-2 gap-2">
                {['has-children', 'no-children', 'doesnt-matter'].map(option => (
                  <div
                    key={option}
                    onClick={() => handleMatchPreferenceToggle('childrenTolerance', option)}
                    className={`p-3 border rounded-lg cursor-pointer text-sm transition ${
                      matchPreferences.childrenTolerance.includes(option)
                        ? 'border-teal bg-teal/10 text-teal-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Checkbox
                        checked={matchPreferences.childrenTolerance.includes(option)}
                        onCheckedChange={() => handleMatchPreferenceToggle('childrenTolerance', option)}
                        className="mr-2"
                      />
                      <span>{formatLabel(option)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Physical Attraction Preferences (Optional)</Label>
              <div className="grid grid-cols-2 gap-2">
                {physicalPreferenceOptions.map(option => (
                  <div
                    key={option}
                    onClick={() => handleMatchPreferenceToggle('physicalPreferences', option)}
                    className={`p-3 border rounded-lg cursor-pointer text-sm transition ${
                      matchPreferences.physicalPreferences.includes(option)
                        ? 'border-teal bg-teal/10 text-teal-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Checkbox
                        checked={matchPreferences.physicalPreferences.includes(option)}
                        onCheckedChange={() => handleMatchPreferenceToggle('physicalPreferences', option)}
                        className="mr-2"
                      />
                      <span>{formatLabel(option)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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

export default DatingPreferences;
