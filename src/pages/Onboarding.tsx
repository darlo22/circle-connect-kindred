import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import OnboardingLayout from '../components/onboarding/OnboardingLayout';
import GroupJoin from '../components/onboarding/GroupJoin';
import IntentSelection from '../components/onboarding/IntentSelection';
import PersonalInfo from '../components/onboarding/PersonalInfo';
import MatchPreferences from '../components/onboarding/MatchPreferences';
import DatingPreferences from '../components/onboarding/DatingPreferences';
import InterestsSelection from '../components/onboarding/InterestsSelection';
import ConnectionPreferences from '../components/onboarding/ConnectionPreferences';
import ProfilePhoto from '../components/onboarding/ProfilePhoto';
import Success from '../components/onboarding/Success';
import Geolocation from '../components/onboarding/Geolocation';
import Temperament from '../components/onboarding/Temperament';
import Availability from '../components/onboarding/Availability';

interface OnboardingData {
  groupId: string;
  intent: string[];
  personalInfo: {
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
  };
  matchPreferences: {
    maritalStatus: string[];
    ageRange: { min: number; max: number };
    ethnicity: string[];
    religion: string[];
    drinkingHabits: string[];
    smokingHabits: string[];
    bodyType?: string[];
    childrenTolerance?: string[];
    physicalPreferences?: string[];
  };
  location: {
    latitude: number | null;
    longitude: number | null;
    address: string;
  };
  temperament: {
    type: string;
    traits: string[];
  };
  preferences: {
    intent: string;
    budget: string;
    interests: string[];
    values: string[];
  };
  availability: {
    days: string[];
    timePreferences: string[];
  };
  photoUrl: string;
}

const Onboarding: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});
  
  const platform = searchParams.get('platform'); // 'circlemate' or 'circlemate-plus'
  const joinMode = searchParams.get('join'); // 'browse' for community browsing
  
  useEffect(() => {
    // If user chose to browse communities, skip group join step
    if (joinMode === 'browse') {
      setStep(2);
      setOnboardingData(prev => ({ ...prev, groupId: 'browse' }));
    }
  }, [joinMode]);
  
  const getDynamicTotalSteps = () => {
    const baseSteps = joinMode === 'browse' ? 10 : 11; // Skip group join if browsing
    const hasDatingIntent = onboardingData.intent?.includes('dating');
    return hasDatingIntent ? baseSteps + 1 : baseSteps;
  };
  
  const handleBack = () => {
    setStep(prev => Math.max(joinMode === 'browse' ? 2 : 1, prev - 1));
  };
  
  const handleGroupJoin = (groupId: string) => {
    setOnboardingData(prev => ({ ...prev, groupId }));
    setStep(2);
  };

  const handleIntentSelection = (intent: string[]) => {
    setOnboardingData(prev => ({ ...prev, intent }));
    setStep(3);
  };
  
  const handlePersonalInfo = (personalInfo: OnboardingData['personalInfo']) => {
    setOnboardingData(prev => ({ ...prev, personalInfo }));
    setStep(4);
  };

  const handleMatchPreferences = (matchPreferences: OnboardingData['matchPreferences']) => {
    setOnboardingData(prev => ({ ...prev, matchPreferences }));
    // Skip to step 6 if no dating intent, otherwise go to step 5 for dating preferences
    const hasDatingIntent = onboardingData.intent?.includes('dating');
    setStep(hasDatingIntent ? 5 : 6);
  };

  const handleDatingPreferences = (datingPrefs: { personalInfo: Partial<OnboardingData['personalInfo']>, matchPreferences: Partial<OnboardingData['matchPreferences']> }) => {
    setOnboardingData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...datingPrefs.personalInfo },
      matchPreferences: { ...prev.matchPreferences, ...datingPrefs.matchPreferences }
    }));
    setStep(6);
  };

  const handleGeolocation = (location: OnboardingData['location']) => {
    setOnboardingData(prev => ({ ...prev, location }));
    setStep(7);
  };

  const handleTemperament = (temperament: OnboardingData['temperament']) => {
    setOnboardingData(prev => ({ ...prev, temperament }));
    setStep(8);
  };
  
  const handleConnectionPreferences = (preferences: OnboardingData['preferences']) => {
    setOnboardingData(prev => ({ ...prev, preferences }));
    setStep(9);
  };

  const handleAvailability = (availability: OnboardingData['availability']) => {
    setOnboardingData(prev => ({ ...prev, availability }));
    setStep(10);
  };
  
  const handleProfilePhoto = (photoUrl: string) => {
    setOnboardingData(prev => ({ ...prev, photoUrl }));
    console.log('Onboarding complete with data:', { ...onboardingData, photoUrl });
    setStep(11);
  };

  const handleInterestsSelection = (interests: { selectedInterests: string[]; matchPreferences: string[]; }) => {
    setOnboardingData(prev => ({ ...prev, interests }));
    setStep(7);
  };
  
  const renderStep = () => {
    const hasDatingIntent = onboardingData.intent?.includes('dating');
    const adjustedStep = joinMode === 'browse' ? step + 1 : step;
    
    switch (adjustedStep) {
      case 1:
        return <GroupJoin onNext={handleGroupJoin} platform={platform} />;
      case 2:
        return <IntentSelection onNext={handleIntentSelection} platform={platform} />;
      case 3:
        return <PersonalInfo onNext={handlePersonalInfo} intent={onboardingData.intent} />;
      case 4:
        return <MatchPreferences onNext={handleMatchPreferences} intent={onboardingData.intent} />;
      case 5:
        return hasDatingIntent ? <DatingPreferences onNext={handleDatingPreferences} /> : <InterestsSelection onNext={handleInterestsSelection} />;
      case 6:
        return <InterestsSelection onNext={handleInterestsSelection} />;
      case 7:
        return <Geolocation onNext={handleGeolocation} />;
      case 8:
        return <Temperament onNext={handleTemperament} />;
      case 9:
        return <ConnectionPreferences onNext={handleConnectionPreferences} />;
      case 10:
        return <Availability onNext={handleAvailability} />;
      case 11:
        return <ProfilePhoto onNext={handleProfilePhoto} />;
      case 12:
        return <Success platform={platform} />;
      default:
        return null;
    }
  };
  
  const currentDisplayStep = joinMode === 'browse' ? step - 1 : step;
  const showBackButton = currentDisplayStep > 1 && currentDisplayStep < getDynamicTotalSteps() + 1;
  
  return (
    <OnboardingLayout 
      currentStep={currentDisplayStep} 
      totalSteps={getDynamicTotalSteps()}
      onBack={handleBack}
      showBackButton={showBackButton}
      platform={platform}
    >
      {renderStep()}
    </OnboardingLayout>
  );
};

export default Onboarding;
