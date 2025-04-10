
import React, { useState } from 'react';
import { Activity, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProgressCircle from '@/components/Dashboard/ProgressCircle';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weekData = [
  { day: 'Mon', steps: 7500 },
  { day: 'Tue', steps: 9200 },
  { day: 'Wed', steps: 8100 },
  { day: 'Thu', steps: 10500 },
  { day: 'Fri', steps: 6800 },
  { day: 'Sat', steps: 11200 },
  { day: 'Sun', steps: 0 },
];

const StepTracker: React.FC = () => {
  const { toast } = useToast();
  const [steps, setSteps] = useState(3456);
  const [goal, setGoal] = useState(10000);
  const [inputSteps, setInputSteps] = useState('');
  
  const percentage = Math.min(Math.round((steps / goal) * 100), 100);
  
  const handleAddSteps = () => {
    const stepsToAdd = parseInt(inputSteps);
    if (!isNaN(stepsToAdd) && stepsToAdd > 0) {
      const newSteps = steps + stepsToAdd;
      setSteps(newSteps);
      setInputSteps('');
      
      if (newSteps >= goal && steps < goal) {
        toast({
          title: "Goal reached!",
          description: "Congratulations! You've hit your step goal for today!",
        });
      }
    }
  };
  
  const handleResetSteps = () => {
    setSteps(0);
    toast({
      title: "Steps reset",
      description: "Your step counter has been reset to zero.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Activity className="text-primary" /> Step Counter
        </h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
          <div className="flex-shrink-0">
            <ProgressCircle percentage={percentage} size={180} strokeWidth={14}>
              <div className="text-center">
                <div className="text-4xl font-bold">{steps.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">of {goal.toLocaleString()}</div>
              </div>
            </ProgressCircle>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Add Steps Manually</label>
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  placeholder="Enter steps"
                  value={inputSteps}
                  onChange={(e) => setInputSteps(e.target.value)}
                />
                <Button onClick={handleAddSteps}>Add</Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Daily Goal</label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setGoal(Math.max(1000, goal - 1000))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2 min-w-24 text-center">{goal.toLocaleString()} steps</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setGoal(goal + 1000)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleResetSteps}
            >
              Reset Today's Steps
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="steps" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StepTracker;
