
import React, { useState } from 'react';
import OnboardingLayout from '../components/onboarding/OnboardingLayout';
import GroupJoin from '../components/onboarding/GroupJoin';
import PersonalInfo from '../components/onboarding/PersonalInfo';
import ConnectionPreferences from '../components/onboarding/ConnectionPreferences';
import ProfilePhoto from '../components/onboarding/ProfilePhoto';
import Success from '../components/onboarding/Success';

interface OnboardingData {
  groupId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    maritalStatus: string;
  };
  preferences: {
    intent: string;
    budget: string;
    interests: string[];
  };
  photoUrl: string;
}

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});
  
  const totalSteps = 5; // Total number of steps in the wizard
  
  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };
  
  const handleGroupJoin = (groupId: string) => {
    setOnboardingData(prev => ({ ...prev, groupId }));
    setStep(2);
  };
  
  const handlePersonalInfo = (personalInfo: OnboardingData['personalInfo']) => {
    setOnboardingData(prev => ({ ...prev, personalInfo }));
    setStep(3);
  };
  
  const handleConnectionPreferences = (preferences: OnboardingData['preferences']) => {
    setOnboardingData(prev => ({ ...prev, preferences }));
    setStep(4);
  };
  
  const handleProfilePhoto = (photoUrl: string) => {
    setOnboardingData(prev => ({ ...prev, photoUrl }));
    // In a real app, we would send the complete onboardingData to the backend here
    console.log('Onboarding complete with data:', { ...onboardingData, photoUrl });
    setStep(5);
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return <GroupJoin onNext={handleGroupJoin} />;
      case 2:
        return <PersonalInfo onNext={handlePersonalInfo} />;
      case 3:
        return <ConnectionPreferences onNext={handleConnectionPreferences} />;
      case 4:
        return <ProfilePhoto onNext={handleProfilePhoto} />;
      case 5:
        return <Success />;
      default:
        return null;
    }
  };
  
  return (
    <OnboardingLayout 
      currentStep={step} 
      totalSteps={totalSteps}
      onBack={handleBack}
      showBackButton={step < 5} // Hide back button on success page
    >
      {renderStep()}
    </OnboardingLayout>
  );
};

export default Onboarding;
