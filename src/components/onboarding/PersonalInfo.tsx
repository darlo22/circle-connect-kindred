
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PersonalInfoProps {
  onNext: (personalInfo: PersonalInfoData) => void;
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
  bodyType?: string;
  hasChildren?: string;
  wantsChildren?: string;
}

const genderOptions = ['male', 'female', 'non-binary', 'prefer-not-to-say'];
const maritalOptions = ['single', 'married', 'divorced', 'widowed', 'other'];
const ethnicityOptions = ['asian', 'black', 'hispanic', 'white', 'mixed', 'other', 'prefer-not-to-say'];
const religionOptions = ['christian', 'muslim', 'jewish', 'hindu', 'buddhist', 'atheist', 'agnostic', 'other'];
const drinkingOptions = ['never', 'occasionally', 'socially', 'regularly', 'prefer-not-to-say'];
const smokingOptions = ['never', 'occasionally', 'socially', 'regularly', 'prefer-not-to-say'];
const bodyTypeOptions = ['slim', 'average', 'athletic', 'curvy', 'plus-size', 'prefer-not-to-say'];
const childrenOptions = ['yes', 'no', 'prefer-not-to-say'];

const PersonalInfo: React.FC<PersonalInfoProps> = ({ onNext, intent }) => {
  // Get platform from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const platform = urlParams.get('platform');
  const isCircleMate = platform === 'circlemate';
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
    firstName: '',
    lastName: '',
    age: 18,
    gender: '',
    maritalStatus: '',
    ethnicity: '',
    religion: isCircleMate ? 'christian' : '', // Default to christian for CircleMate
    drinkingHabits: isCircleMate ? 'never' : '', // Default to never for CircleMate
    smokingHabits: isCircleMate ? 'never' : '', // Default to never for CircleMate
    bodyType: '',
    hasChildren: '',
    wantsChildren: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const hasDatingIntent = intent?.includes('dating');

  const handleInputChange = (field: keyof PersonalInfoData, value: string | number) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!personalInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!personalInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (personalInfo.age < 18 || personalInfo.age > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }
    
    if (!personalInfo.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!personalInfo.maritalStatus) {
      newErrors.maritalStatus = 'Please select your marital status';
    }
    
    if (!personalInfo.ethnicity) {
      newErrors.ethnicity = 'Please select your ethnicity';
    }
    
    // Only validate religion, drinking, and smoking for non-CircleMate platforms
    if (!isCircleMate) {
      if (!personalInfo.religion) {
        newErrors.religion = 'Please select your religion';
      }
      
      if (!personalInfo.drinkingHabits) {
        newErrors.drinkingHabits = 'Please select your drinking habits';
      }
      
      if (!personalInfo.smokingHabits) {
        newErrors.smokingHabits = 'Please select your smoking habits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(personalInfo);
    }
  };

  const formatLabel = (value: string) => 
    value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-navy">Tell us about yourself</h1>
        <p className="text-gray-600">
          This information helps us find the best connections for you.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              value={personalInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            min="18"
            max="100"
            value={personalInfo.age}
            onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 18)}
            className={errors.age ? 'border-red-500' : ''}
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>
        
        <div>
          <Label>Gender</Label>
          <Select onValueChange={(value) => handleInputChange('gender', value)}>
            <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {formatLabel(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>
        
        <div>
          <Label>Marital Status</Label>
          <Select onValueChange={(value) => handleInputChange('maritalStatus', value)}>
            <SelectTrigger className={errors.maritalStatus ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select your marital status" />
            </SelectTrigger>
            <SelectContent>
              {maritalOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {formatLabel(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.maritalStatus && (
            <p className="text-red-500 text-sm mt-1">{errors.maritalStatus}</p>
          )}
        </div>
        
        <div>
          <Label>Ethnicity</Label>
          <Select onValueChange={(value) => handleInputChange('ethnicity', value)}>
            <SelectTrigger className={errors.ethnicity ? 'border-red-500' : ''}>
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
          {errors.ethnicity && (
            <p className="text-red-500 text-sm mt-1">{errors.ethnicity}</p>
          )}
        </div>
        
        {!isCircleMate && (
          <>
            <div>
              <Label>Religion</Label>
              <Select onValueChange={(value) => handleInputChange('religion', value)}>
                <SelectTrigger className={errors.religion ? 'border-red-500' : ''}>
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
              {errors.religion && (
                <p className="text-red-500 text-sm mt-1">{errors.religion}</p>
              )}
            </div>
            
            <div>
              <Label>Drinking Habits</Label>
              <Select onValueChange={(value) => handleInputChange('drinkingHabits', value)}>
                <SelectTrigger className={errors.drinkingHabits ? 'border-red-500' : ''}>
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
              {errors.drinkingHabits && (
                <p className="text-red-500 text-sm mt-1">{errors.drinkingHabits}</p>
              )}
            </div>
            
            <div>
              <Label>Smoking Habits</Label>
              <Select onValueChange={(value) => handleInputChange('smokingHabits', value)}>
                <SelectTrigger className={errors.smokingHabits ? 'border-red-500' : ''}>
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
              {errors.smokingHabits && (
                <p className="text-red-500 text-sm mt-1">{errors.smokingHabits}</p>
              )}
            </div>
          </>
        )}
        
        {hasDatingIntent && (
          <>
            <div>
              <Label>Body Type</Label>
              <Select onValueChange={(value) => handleInputChange('bodyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your body type (optional)" />
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
            
            <div>
              <Label>Do you have children?</Label>
              <Select onValueChange={(value) => handleInputChange('hasChildren', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Do you have children? (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {childrenOptions.map(option => (
                    <SelectItem key={option} value={option}>
                      {formatLabel(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Do you want children?</Label>
              <Select onValueChange={(value) => handleInputChange('wantsChildren', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Do you want children? (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {childrenOptions.map(option => (
                    <SelectItem key={option} value={option}>
                      {formatLabel(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
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

export default PersonalInfo;
