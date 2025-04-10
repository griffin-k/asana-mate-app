import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, RefreshCw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface YogaPose {
  name: string;
  description: string;
  duration: number;
  imagePath: string;
}

const yogaPoses: YogaPose[] = [
  {
    name: 'Mountain Pose (Tadasana)',
    description: 'Stand tall with feet together, shoulders relaxed, weight evenly distributed through your feet.',
    duration: 60,
    imagePath: '/dog.jpg'
  },
  {
    name: 'Downward Dog (Adho Mukha Svanasana)',
    description: 'Form an inverted V shape with your body. Hands and feet on the ground, hips lifted high.',
    duration: 60,
    imagePath: '/placeholder.svg'
  },
  {
    name: 'Cobra Pose (Bhujangasana)',
    description: 'Lie on your stomach, hands under shoulders, lift chest off the ground, keeping hips down.',
    duration: 60,
    imagePath:'/placeholder.svg'
  },
  {
    name: 'Chair Pose (Utkatasana)',
    description: 'Stand with feet together, bend knees, and lower hips as if sitting in a chair while raising arms.',
    duration: 60,
    imagePath: '/placeholder.svg'
  },
  {
    name: 'Warrior II (Virabhadrasana II)',
    description: 'Front knee bent over ankle, back leg straight, arms extended, gaze over front hand.',
    duration: 60,
    imagePath: '/placeholder.svg'
  },
  {
    name: 'Seated Forward Bend (Paschimottanasana)',
    description: 'Sit with legs extended, fold forward from the hips, reaching toward your feet.',
    duration: 60,
    imagePath: '/placeholder.svg'
  },
  {
    name: 'Corpse Pose (Savasana)',
    description: 'Lie flat on your back, arms at sides, palms up, legs relaxed, eyes closed. Focus on breathing.',
    duration: 60,
    imagePath: '/placeholder.svg'
  }
];

const YogaWorkout: React.FC = () => {
  const { toast } = useToast();
  const [currentPoseIndex, setCurrentPoseIndex] = useState<number>(-1);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalTime = yogaPoses.reduce((total, pose) => total + pose.duration, 0);
  const completedTime = yogaPoses
    .slice(0, currentPoseIndex)
    .reduce((total, pose) => total + pose.duration, 0) + (yogaPoses[currentPoseIndex]?.duration || 0) - timeLeft;

  const overallProgress = Math.round((completedTime / totalTime) * 100);

  const startWorkout = () => {
    setCurrentPoseIndex(0);
    setTimeLeft(yogaPoses[0].duration);
    setIsPaused(false);
    setIsWorkoutComplete(false);

    toast({
      title: "Workout Started",
      description: "7-minute yoga workout has begun. Remember to breathe deeply!",
    });
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const nextPose = () => {
    if (currentPoseIndex < yogaPoses.length - 1) {
      const nextIndex = currentPoseIndex + 1;
      setCurrentPoseIndex(nextIndex);
      setTimeLeft(yogaPoses[nextIndex].duration);
      setIsPaused(false);

      toast({
        title: "Next Pose",
        description: `Now moving to ${yogaPoses[nextIndex].name}`,
      });
    } else {
      endWorkout();
    }
  };

  const endWorkout = () => {
    setIsPaused(true);
    setIsWorkoutComplete(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    toast({
      title: "Workout Complete!",
      description: "Great job completing your 7-minute yoga workout!",
    });
  };

  useEffect(() => {
    if (!isPaused && timeLeft > 0 && currentPoseIndex >= 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            if (currentPoseIndex < yogaPoses.length - 1) {
              setTimeout(() => nextPose(), 500);
            } else {
              setTimeout(() => endWorkout(), 500);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isPaused && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, timeLeft, currentPoseIndex]);

  const currentPose = yogaPoses[currentPoseIndex];
  const poseProgress = currentPose ? Math.round((1 - timeLeft / currentPose.duration) * 100) : 0;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6">
        {currentPoseIndex === -1 && !isWorkoutComplete && (
          <div className="text-center p-8">
            <h3 className="text-lg font-medium mb-4">Ready to begin your yoga practice?</h3>
            <p className="text-muted-foreground mb-6">
              This 7-minute workout consists of 7 yoga poses, each held for 1 minute.
              Find a quiet space and get ready to focus on your breath and movement.
            </p>
            <Button size="lg" onClick={startWorkout}>
              Start Workout
            </Button>
          </div>
        )}

        {currentPoseIndex >= 0 && !isWorkoutComplete && currentPose && (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span>Overall Progress</span>
                <span>{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 md:justify-between md:items-center">
              <div className="w-full flex justify-center">
                <img 
                  src={currentPose.imagePath} 
                  alt={currentPose.name}
                  className="rounded-lg object-cover w-full max-w-xs md:max-w-sm" 
                />
              </div>

              <div className="flex flex-col items-center md:items-start">
                <h3 className="text-xl font-semibold mb-2 text-center md:text-left">{currentPose.name}</h3>
                <p className="text-muted-foreground mb-4 text-center md:text-left">{currentPose.description}</p>

                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-1 w-full">
                    <span>Current Pose</span>
                    <span className="font-mono">{formatTime(timeLeft)}</span>
                  </div>
                  <Progress value={poseProgress} className="h-2 mb-4" />

                  <div className="text-sm text-muted-foreground mb-4 text-center md:text-left">
                    Pose {currentPoseIndex + 1} of {yogaPoses.length}
                  </div>

                  <div className="flex gap-2 w-full">
                    <Button 
                      variant={isPaused ? "default" : "outline"} 
                      onClick={togglePause}
                      className="flex-1"
                    >
                      {isPaused ? (
                        <><Play className="mr-2 h-4 w-4" /> Resume</>
                      ) : (
                        <><Pause className="mr-2 h-4 w-4" /> Pause</>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={nextPose}
                      className="flex-1"
                    >
                      <SkipForward className="mr-2 h-4 w-4" /> Skip
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {isWorkoutComplete && (
          <div className="text-center p-8">
            <h3 className="text-xl font-semibold mb-2">Workout Complete!</h3>
            <p className="text-muted-foreground mb-6">
              Great job! You've completed the 7-minute yoga session.
              How do you feel? Take a moment to notice the effects on your body and mind.
            </p>
            <Button 
              variant="outline" 
              onClick={startWorkout}
              className="flex items-center justify-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Start Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default YogaWorkout;
