
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Droplet, Clock, History, Calculator } from 'lucide-react';
import Layout from '@/components/Layout';
import StatCard from '@/components/Dashboard/StatCard';
import ProgressCircle from '@/components/Dashboard/ProgressCircle';
import WaterTracker from '@/components/Dashboard/WaterTracker';

const Index = () => {
  const navigate = useNavigate();
  
  // Mock data
  const stepData = {
    current: 3456,
    goal: 10000
  };
  
  const waterData = {
    consumed: 750,
    goal: 2000
  };
  
  const lastWorkout = "7-Min Yoga (Today)";
  
  const bmiData = {
    value: 22.5,
    category: "Normal"
  };
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <section className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Welcome to MindfulMotion</h1>
          <p className="text-muted-foreground">Track your wellness journey in one place</p>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Step Count" 
            value={
              <div className="flex items-end gap-1">
                <span>{stepData.current.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground mb-0.5">/ {stepData.goal.toLocaleString()}</span>
              </div>
            }
            icon={<Activity className="h-5 w-5" />}
            onClick={() => navigate('/steps')}
          >
            <div className="mt-2 w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-500" 
                style={{ width: `${Math.min(100, (stepData.current / stepData.goal) * 100)}%` }}
              />
            </div>
          </StatCard>
          
          <StatCard 
            title="Hydration" 
            value={
              <WaterTracker consumed={waterData.consumed} goal={waterData.goal} />
            }
            icon={<Droplet className="h-5 w-5" />}
            onClick={() => navigate('/hydration')}
          />
          
          <StatCard 
            title="Last Workout" 
            value={lastWorkout}
            icon={<Clock className="h-5 w-5" />}
            onClick={() => navigate('/yoga')}
          />
          
          <StatCard 
            title="BMI Status" 
            value={
              <div className="flex flex-col">
                <span>{bmiData.value}</span>
                <span className="text-sm text-muted-foreground">{bmiData.category}</span>
              </div>
            }
            icon={<Calculator className="h-5 w-5" />}
            onClick={() => navigate('/bmi')}
          />
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity className="text-primary h-5 w-5" /> Step Progress
            </h2>
            
            <div className="flex flex-col items-center">
              <ProgressCircle percentage={(stepData.current / stepData.goal) * 100}>
                <div className="text-center">
                  <div className="text-3xl font-bold">{Math.round((stepData.current / stepData.goal) * 100)}%</div>
                  <div className="text-sm text-muted-foreground">of daily goal</div>
                </div>
              </ProgressCircle>
              <button 
                className="mt-4 text-primary flex items-center gap-1"
                onClick={() => navigate('/steps')}
              >
                View Details
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <History className="text-primary h-5 w-5" /> Recent Activity
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Activity className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Walked 3,456 steps</div>
                  <div className="text-sm text-muted-foreground">Today</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Completed yoga session</div>
                  <div className="text-sm text-muted-foreground">Today</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Droplet className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Drank 750ml of water</div>
                  <div className="text-sm text-muted-foreground">Today</div>
                </div>
              </div>
              
              <button 
                className="w-full text-primary flex items-center justify-center gap-1 mt-2"
                onClick={() => navigate('/history')}
              >
                View All Activity
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
