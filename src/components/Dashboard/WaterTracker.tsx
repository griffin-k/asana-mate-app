
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
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-muted-foreground">Water Intake</span>
        <Droplet className="h-4 w-4 text-blue-500" />
      </div>
      
      <div className="flex-grow water-container rounded-lg h-14 md:h-24 flex items-end">
        <div 
          className="water-fill"
          style={{ height: `${percentage}%`, '--water-level': `${percentage}%` } as React.CSSProperties}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
          <span className="text-base md:text-xl font-bold">{consumed} ml</span>
          <span className="text-xs md:text-sm text-muted-foreground">of {goal} ml</span>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
