
import React from 'react';
import { Droplet } from 'lucide-react';

interface WaterTrackerProps {
  consumed: number;
  goal: number;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ consumed, goal }) => {
  const percentage = Math.min(Math.round((consumed / goal) * 100), 100);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">Water Intake</span>
        <Droplet className="h-5 w-5 text-blue-500" />
      </div>
      
      <div className="flex-grow water-container rounded-lg h-24 flex items-end">
        <div 
          className="water-fill"
          style={{ height: `${percentage}%`, '--water-level': `${percentage}%` } as React.CSSProperties}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
          <span className="text-2xl font-bold">{consumed} ml</span>
          <span className="text-sm text-muted-foreground">of {goal} ml</span>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
