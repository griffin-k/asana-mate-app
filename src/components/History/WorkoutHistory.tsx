
import React, { useState } from 'react';
import { Calendar, History, Filter, LayoutGrid, LayoutList, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, addMonths, subMonths } from 'date-fns';

interface Activity {
  date: Date;
  steps: number;
  water: number;
  yoga: boolean;
}

// Generate some sample data for the last 60 days
const generateSampleData = (): Activity[] => {
  const data: Activity[] = [];
  const now = new Date();
  
  for (let i = 60; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    // Generate random data
    const steps = Math.floor(Math.random() * 12000) + 2000;
    const water = Math.floor(Math.random() * 2000) + 500;
    const yoga = Math.random() > 0.7; // 30% chance of doing yoga
    
    data.push({ date, steps, water, yoga });
  }
  
  return data;
};

const sampleData = generateSampleData();

const WorkoutHistory: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<string>('calendar'); // calendar, list
  const [filterType, setFilterType] = useState<string>('all'); // all, steps, water, yoga
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  // Get days in current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Filter data by current month
  const monthData = sampleData.filter(item => 
    isSameMonth(item.date, currentMonth)
  );
  
  const getDayData = (day: Date): Activity | undefined => {
    return sampleData.find(item => 
      item.date.getDate() === day.getDate() && 
      item.date.getMonth() === day.getMonth() &&
      item.date.getFullYear() === day.getFullYear()
    );
  };
  
  const getActivityIcon = (day: Date) => {
    const data = getDayData(day);
    if (!data) return null;
    
    if (filterType === 'all' || filterType === 'steps') {
      if (data.steps >= 10000) return 'bg-green-500';
      if (data.steps >= 5000) return 'bg-yellow-500';
      if (data.steps > 0) return 'bg-red-500';
    }
    
    if (filterType === 'all' || filterType === 'water') {
      if (data.water >= 2000) return 'bg-blue-500';
      if (data.water >= 1000) return 'bg-blue-300';
      if (data.water > 0) return 'bg-blue-200';
    }
    
    if ((filterType === 'all' || filterType === 'yoga') && data.yoga) {
      return 'bg-purple-500';
    }
    
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <History className="text-primary" /> Workout History
          </h2>
          
          <div className="flex space-x-2">
            <ToggleGroup type="single" value={filterType} onValueChange={(value) => value && setFilterType(value)}>
              <ToggleGroupItem value="all">All</ToggleGroupItem>
              <ToggleGroupItem value="steps">Steps</ToggleGroupItem>
              <ToggleGroupItem value="water">Water</ToggleGroupItem>
              <ToggleGroupItem value="yoga">Yoga</ToggleGroupItem>
            </ToggleGroup>
            
            <ToggleGroup type="single" value={viewType} onValueChange={(value) => value && setViewType(value)}>
              <ToggleGroupItem value="calendar" aria-label="Calendar View">
                <LayoutGrid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List View">
                <LayoutList className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-medium">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {viewType === 'calendar' && (
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium py-2">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                <div key={`empty-${index}`} className="p-2"></div>
              ))}
              
              {calendarDays.map((day) => {
                const activityClass = getActivityIcon(day);
                return (
                  <div
                    key={day.toISOString()}
                    className={`aspect-square p-1 relative rounded-md ${
                      isToday(day) ? 'bg-blue-50 ring-1 ring-blue-200' : ''
                    }`}
                  >
                    <div className="text-center text-sm">{format(day, 'd')}</div>
                    {activityClass && (
                      <div className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${activityClass}`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {viewType === 'list' && (
            <div className="space-y-3">
              {monthData.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No activity data for this month</p>
              ) : (
                monthData.map((activity) => (
                  <Card key={activity.date.toISOString()}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{format(activity.date, 'EEEE, MMMM d')}</div>
                        <div className="text-sm text-muted-foreground">{
                          isToday(activity.date) ? 'Today' : format(activity.date, 'PP')
                        }</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Steps</div>
                          <div className={`font-semibold ${
                            activity.steps >= 10000 ? 'text-green-500' :
                            activity.steps >= 5000 ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {activity.steps.toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Water</div>
                          <div className="font-semibold text-blue-500">
                            {activity.water} ml
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Yoga</div>
                          <div className="font-semibold text-purple-500">
                            {activity.yoga ? 'Completed' : 'Skipped'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistory;
