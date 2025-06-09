
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessProps {
  platform?: string | null;
}

const Success: React.FC<SuccessProps> = ({ platform }) => {
  const isCircleMate = platform === 'circlemate';
  
  return (
    <div className="text-center space-y-6">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
        isCircleMate ? 'bg-teal/20' : 'bg-orange/20'
      }`}>
        <CheckCircle className={`w-8 h-8 ${isCircleMate ? 'text-teal' : 'text-orange'}`} />
      </div>
      
      <div>
        <h1 className="text-2xl font-bold mb-2 text-navy">Welcome to {isCircleMate ? 'CircleMate' : 'CircleMate+'}!</h1>
        <p className="text-gray-600">
          Your profile has been created successfully. You can now start connecting with others in your community.
        </p>
      </div>
      
      <Button 
        className={`w-full ${isCircleMate ? 'btn-primary' : 'bg-orange hover:bg-orange/90 text-white'}`}
        onClick={() => window.location.href = '/dashboard'}
      >
        Get Started
      </Button>
    </div>
  );
};

export default Success;
