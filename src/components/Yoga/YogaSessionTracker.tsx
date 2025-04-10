
import React, { useEffect } from 'react';
import YogaWorkout from './YogaWorkout';
import { updateYogaCompletion } from '@/utils/localStorage';
import { useToast } from '@/components/ui/use-toast';

const YogaSessionTracker: React.FC = () => {
  const { toast } = useToast();
  
  // This will track yoga completion in localStorage when the workout is finished
  const handleWorkoutComplete = () => {
    updateYogaCompletion(true);
    // Show toast notification when workout is completed
    toast({
      title: "Workout Completed!",
      description: "Great job! Your yoga session has been recorded.",
      duration: 3000,
    });
  };
  
  // Add event listener for yoga completion
  useEffect(() => {
    const handleYogaComplete = () => {
      handleWorkoutComplete();
    };
    
    window.addEventListener('yoga-complete', handleYogaComplete);
    
    // Prevent scrolling on mobile when in a workout
    document.body.classList.add('overflow-hidden');
    
    return () => {
      window.removeEventListener('yoga-complete', handleYogaComplete);
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="yoga-workout-container touch-manipulation select-none">
      <YogaWorkout />
    </div>
  );
};

export default YogaSessionTracker;
