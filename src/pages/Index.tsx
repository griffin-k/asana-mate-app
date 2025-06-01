import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Droplet, Clock, Calculator } from 'lucide-react';
import Layout from '@/components/Layout';
import StatCard from '@/components/Dashboard/StatCard';
import ProgressCircle from '@/components/Dashboard/ProgressCircle';
import WaterTracker from '@/components/Dashboard/WaterTracker';
import { getStepData, getWaterData, getYogaData, getBMIData } from '@/utils/localStorage';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // State for dashboard data
  const [stepData, setStepData] = useState({ current: 0, goal: 10000 });
  const [waterData, setWaterData] = useState({ consumed: 0, goal: 2000 });
  const [yogaData, setYogaData] = useState({ completed: false, lastSession: null });
  const [bmiData, setBmiData] = useState({ value: null, category: null });

  // Load data from localStorage when component mounts
  useEffect(() => {
    const loadData = () => {
      setStepData(getStepData());
      setWaterData(getWaterData());
      setYogaData(getYogaData());
      setBmiData(getBMIData());
    };

    loadData();

    // Set up interval to refresh data every 30 seconds
    const intervalId = setInterval(loadData, 30000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format the last yoga session date
  const formatYogaDate = () => {
    if (!yogaData.lastSession) return "Not completed yet";

    const lastDate = new Date(yogaData.lastSession);
    const today = new Date();

    if (lastDate.toDateString() === today.toDateString()) {
      return "Today";
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return lastDate.toLocaleDateString();
  };

  // Display yoga workout status
  const lastWorkout = yogaData.completed 
    ? "7-Min Yoga (Today)" 
    : yogaData.lastSession 
      ? `7-Min Yoga (${formatYogaDate()})` 
      : "Not completed yet";

  return (
    <Layout>
      <div className="space-y-4 md:space-y-6 animate-fade-in px-4 sm:px-6 lg:px-8">
        <section className="mb-4 md:mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2">Welcome to AsanaMate</h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
            Track your wellness journey in one place.
          </p>
        </section>

        {/* Grid of 4 Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* <StatCard 
            title="Step Count" 
            value={
              <div className="flex items-end gap-2">
                <span className="text-xl md:text-2xl font-bold">{stepData.current.toLocaleString()}</span>
                <span className="text-sm md:text-base text-muted-foreground mb-1">/ {stepData.goal.toLocaleString()}</span>
              </div>
            }
            icon={<Activity className="h-6 w-6" />}
            onClick={() => navigate('/steps')}
            className="card"
          /> */}
          
          <StatCard 
            title="Hydration" 
            value={<WaterTracker consumed={waterData.consumed} goal={waterData.goal} />}
            icon={<Droplet className="h-6 w-6" />}
            onClick={() => navigate('/hydration')}
            className="card"
          />
          
          <StatCard 
            title="Last Workout" 
            value={
              <div className="text-sm sm:text-base md:text-lg text-muted-foreground">
                {lastWorkout}
              </div>
            }
            icon={<Clock className="h-6 w-6" />}
            onClick={() => navigate('/yoga')}
            className="card"
          />
          
          <StatCard 
            title="BMI Status" 
            value={
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold">{bmiData.value || "Not set"}</span>
                <span className="text-sm md:text-base text-muted-foreground">{bmiData.category || "Calculate now"}</span>
              </div>
            }
            icon={<Calculator className="h-6 w-6" />}
            onClick={() => navigate('/bmi')}
            className="card"
          />
        </section>

        {/* Step Progress Card Below the 4 Cards */}
        {/* <section className="w-full">
          <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4 flex items-center gap-3">
              <Activity className="text-primary h-6 w-6" /> Step Progress
            </h2>

            <div className="flex flex-col items-center">
              <ProgressCircle percentage={(stepData.current / stepData.goal) * 100}>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold">{Math.round((stepData.current / stepData.goal) * 100)}%</div>
                  <div className="text-sm sm:text-base md:text-lg text-muted-foreground">of daily goal</div>
                </div>
              </ProgressCircle>
              <button 
                className="mt-4 text-primary text-lg font-medium hover:underline"
                onClick={() => navigate('/steps')}
              >
                View Details
              </button>
            </div>
          </div>
        </section> */}
      </div>
    </Layout>
  );
};

export default Index;
