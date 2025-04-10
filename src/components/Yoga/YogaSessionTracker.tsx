
import React, { useEffect } from 'react';
import YogaWorkout from './YogaWorkout';
import { updateYogaCompletion } from '@/utils/localStorage';

const YogaSessionTracker: React.FC = () => {
  // This will track yoga completion in localStorage when the workout is finished
  const handleWorkoutComplete = () => {
    updateYogaCompletion(true);
  };
  
  // Add event listener for yoga completion
  useEffect(() => {
    const handleYogaComplete = () => {
      handleWorkoutComplete();
    };
    
    window.addEventListener('yoga-complete', handleYogaComplete);
    
    return () => {
      window.removeEventListener('yoga-complete', handleYogaComplete);
    };
  }, []);

  return <YogaWorkout />;
};

export default YogaSessionTracker;
