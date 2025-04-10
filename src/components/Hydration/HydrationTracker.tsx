
import React, { useState } from 'react';
import { Droplet, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const HydrationTracker: React.FC = () => {
  const { toast } = useToast();
  const [waterGoal, setWaterGoal] = useState(2000); // 2000ml default
  const [waterIntake, setWaterIntake] = useState(0);
  const [reminderInterval, setReminderInterval] = useState(120); // 2 hours in minutes
  
  const addWater = (amount: number) => {
    const newAmount = Math.min(waterIntake + amount, waterGoal);
    setWaterIntake(newAmount);
    
    if (newAmount >= waterGoal) {
      toast({
        title: "Goal reached!",
        description: "You've reached your water intake goal for today!",
      });
    }
  };
  
  const percentage = Math.round((waterIntake / waterGoal) * 100);
  
  const handleReset = () => {
    setWaterIntake(0);
    toast({
      title: "Tracker reset",
      description: "Your water intake tracker has been reset.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Droplet className="text-blue-500" /> Hydration Tracker
        </h2>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Daily Progress</span>
            <span className="font-medium">{waterIntake} / {waterGoal} ml</span>
          </div>
          <Progress value={percentage} className="h-3" />
        </div>
        
        <div className="water-container h-48 mb-6 rounded-xl">
          <div 
            className="water-fill animate-water-rise"
            style={{ height: `${percentage}%`, '--water-level': `${percentage}%` } as React.CSSProperties}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold">{percentage}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Button variant="outline" onClick={() => addWater(50)}>+ 50 ml</Button>
          <Button variant="outline" onClick={() => addWater(200)}>+ 200 ml</Button>
          <Button variant="outline" onClick={() => addWater(500)}>+ 500 ml</Button>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="default" 
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => addWater(250)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Water (250 ml)
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Reminder Settings</h3>
        
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
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setWaterGoal(Math.max(500, waterGoal - 250))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-2 min-w-16 text-center">{waterGoal} ml</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setWaterGoal(waterGoal + 250)}
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
