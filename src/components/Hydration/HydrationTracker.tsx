import React, { useState, useEffect } from 'react';
import { Droplet, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { getWaterData, updateWaterData, setWaterGoal } from '@/utils/localStorage';

const HydrationTracker: React.FC = () => {
  const { toast } = useToast();
  const [waterGoal, setWaterGoalState] = useState(2000); // 2000ml default
  const [waterIntake, setWaterIntakeState] = useState(0);
  const [reminderInterval, setReminderInterval] = useState(120); // 2 hours in minutes
  const [activeButton, setActiveButton] = useState<number | null>(null); // Track the active button
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const { consumed, goal } = getWaterData();
    setWaterIntakeState(consumed);
    setWaterGoalState(goal);
  }, []);
  
  const addWater = (amount: number) => {
    const newAmount = Math.min(waterIntake + amount, waterGoal);
    setWaterIntakeState(newAmount);
    updateWaterData(newAmount);
    
    if (newAmount >= waterGoal) {
      toast({
        title: "💧 Goal Reached!",
        description: "You've hit your water goal for the day. Stay hydrated! 🌊",
        duration: 3000,
        className: "android-toast",
      });
    }
  };

  const handleUpdateGoal = (newGoal: number) => {
    setWaterGoalState(newGoal);
    setWaterGoal(newGoal);
  };

  const percentage = Math.round((waterIntake / waterGoal) * 100);

  const handleReset = () => {
    setWaterIntakeState(0);
    updateWaterData(0);
    toast({
      title: "🔄 Tracker Reset",
      description: "Hydration progress cleared. Start fresh!",
      duration: 3000,
      className: "android-toast",
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center gap-2">
          <Droplet className="text-blue-500" /> Hydration Tracker
        </h2>
        
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between mb-2">
            <span>Daily Progress</span>
            <span className="font-medium">{waterIntake} / {waterGoal} ml</span>
          </div>
          <Progress value={percentage} className="h-3" />
        </div>
        
        <div className="relative h-36 sm:h-40 mb-4 sm:mb-6 rounded-xl">
          <div 
            className="water-fill animate-water-rise"
            style={{ height: `${percentage}%`, '--water-level': `${percentage}%` } as React.CSSProperties}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl font-bold">{percentage}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Button 
            variant="outline" 
            onClick={() => { addWater(50); setActiveButton(50); }} 
            className={`text-sm sm:text-base px-2 sm:px-4 ${activeButton === 50 ? 'bg-green-100' : ''}`}
          >
            + 50 ml
          </Button>
          <Button 
            variant="outline" 
            onClick={() => { addWater(200); setActiveButton(200); }} 
            className={`text-sm sm:text-base px-2 sm:px-4 ${activeButton === 200 ? 'bg-green-100' : ''}`}
          >
            + 200 ml
          </Button>
          <Button 
            variant="outline" 
            onClick={() => { addWater(500); setActiveButton(500); }} 
            className={`text-sm sm:text-base px-2 sm:px-4 ${activeButton === 500 ? 'bg-green-100' : ''}`}
          >
            + 500 ml
          </Button>
          <Button 
            variant="outline" 
            onClick={() => { addWater(1000); setActiveButton(1000); }} 
            className={`text-sm sm:text-base px-2 sm:px-4 ${activeButton === 1000 ? 'bg-green-100' : ''}`}
          >
            + 1000 ml
          </Button>
        </div>
        
        <div className="flex gap-2 sm:gap-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Reminder Settings</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Remind me every</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={reminderInterval}
            onChange={(e) => setReminderInterval(Number(e.target.value))}
          >
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={120}>2 hours</option>
            <option value={180}>3 hours</option>
            <option value={240}>4 hours</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Daily Goal</label>
          <div className="flex items-center justify-center sm:justify-start">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleUpdateGoal(Math.max(500, waterGoal - 250))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-2 text-center">{waterGoal} ml</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleUpdateGoal(waterGoal + 250)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HydrationTracker;
