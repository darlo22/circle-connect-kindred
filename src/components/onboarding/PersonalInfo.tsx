
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PersonalInfoProps {
  onNext: (data: PersonalInfoData) => void;
  intent?: string[];
}

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  maritalStatus: string;
  ethnicity: string;
  religion: string;
  drinkingHabits: string;
  smokingHabits: string;
}

const ethnicityOptions = ['asian', 'black', 'hispanic', 'white', 'mixed', 'other', 'prefer-not-to-say'];
const religionOptions = ['christian', 'muslim', 'jewish', 'hindu', 'buddhist', 'atheist', 'agnostic', 'other'];
const drinkingOptions = ['never', 'occasionally', 'socially', 'regularly', 'prefer-not-to-say'];
const smokingOptions = ['never', 'occasionally', 'socially', 'regularly', 'prefer-not-to-say'];

const PersonalInfo: React.FC<PersonalInfoProps> = ({ onNext, intent }) => {
  const [formData, setFormData] = useState<PersonalInfoData>({
    firstName: '',
    lastName: '',
    age: 0,
    gender: '',
    maritalStatus: '',
    ethnicity: '',
    religion: '',
    drinkingHabits: '',
    smokingHabits: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (field: keyof PersonalInfoData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when field is changed
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.age || formData.age < 18) {
      newErrors.age = 'You must be at least 18 years old';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!formData.maritalStatus) {
      newErrors.maritalStatus = 'Please select your marital status';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext(formData);
    }
  };

  const formatLabel = (value: string) => 
    value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-navy">Tell Us About Yourself</h1>
        <p className="text-gray-600">
          This information helps us find better matches for you.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Your first name"
              className={errors.firstName ? 'border-red-500' : ''}
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Your last name"
              className={errors.lastName ? 'border-red-500' : ''}
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="Your age"
            min={18}
            className={errors.age ? 'border-red-500' : ''}
            value={formData.age || ''}
            onChange={(e) => handleChange('age', Number(e.target.value))}
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Gender</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => handleChange('gender', value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="non-binary" id="non-binary" />
              <Label htmlFor="non-binary">Non-binary</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
              <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
            </div>
          </RadioGroup>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select
            value={formData.maritalStatus}
            onValueChange={(value) => handleChange('maritalStatus', value)}
          >
            <SelectTrigger className={errors.maritalStatus ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select your marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.maritalStatus && (
            <p className="text-red-500 text-sm">{errors.maritalStatus}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ethnicity">Ethnicity</Label>
          <Select
            value={formData.ethnicity}
            onValueChange={(value) => handleChange('ethnicity', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your ethnicity" />
            </SelectTrigger>
            <SelectContent>
              {ethnicityOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {formatLabel(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="religion">Religion</Label>
          <Select
            value={formData.religion}
            onValueChange={(value) => handleChange('religion', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your religion" />
            </SelectTrigger>
            <SelectContent>
              {religionOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {formatLabel(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="drinkingHabits">Drinking Habits</Label>
          <Select
            value={formData.drinkingHabits}
            onValueChange={(value) => handleChange('drinkingHabits', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your drinking habits" />
            </SelectTrigger>
            <SelectContent>
              {drinkingOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {formatLabel(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="smokingHabits">Smoking Habits</Label>
          <Select
            value={formData.smokingHabits}
            onValueChange={(value) => handleChange('smokingHabits', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your smoking habits" />
            </SelectTrigger>
            <SelectContent>
              {smokingOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {formatLabel(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button type="submit" className="w-full btn-primary gap-2 mt-6">
          Continue <ArrowRight size={18} />
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfo;
