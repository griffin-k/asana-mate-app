
// Local storage keys
export const STORAGE_KEYS = {
  STEPS: 'mindful_motion_steps',
  WATER: 'mindful_motion_water',
  YOGA: 'mindful_motion_yoga',
  BMI: 'mindful_motion_bmi',
  STEP_GOAL: 'mindful_motion_step_goal',
  WATER_GOAL: 'mindful_motion_water_goal',
};

// Generic get function with default value
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Generic set function
export const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Get today's date as a string in YYYY-MM-DD format
export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Get current step data
export const getStepData = () => {
  const today = getTodayString();
  const stepsData = getFromStorage<Record<string, number>>(STORAGE_KEYS.STEPS, {});
  return {
    current: stepsData[today] || 0,
    goal: getFromStorage(STORAGE_KEYS.STEP_GOAL, 10000)
  };
};

// Update step data
export const updateStepData = (steps: number) => {
  const today = getTodayString();
  const stepsData = getFromStorage<Record<string, number>>(STORAGE_KEYS.STEPS, {});
  stepsData[today] = steps;
  setToStorage(STORAGE_KEYS.STEPS, stepsData);
};

// Set step goal
export const setStepGoal = (goal: number) => {
  setToStorage(STORAGE_KEYS.STEP_GOAL, goal);
};

// Get water data
export const getWaterData = () => {
  const today = getTodayString();
  const waterData = getFromStorage<Record<string, number>>(STORAGE_KEYS.WATER, {});
  return {
    consumed: waterData[today] || 0,
    goal: getFromStorage(STORAGE_KEYS.WATER_GOAL, 2000)
  };
};

// Update water data
export const updateWaterData = (amount: number) => {
  const today = getTodayString();
  const waterData = getFromStorage<Record<string, number>>(STORAGE_KEYS.WATER, {});
  waterData[today] = amount;
  setToStorage(STORAGE_KEYS.WATER, waterData);
};

// Set water goal
export const setWaterGoal = (goal: number) => {
  setToStorage(STORAGE_KEYS.WATER_GOAL, goal);
};

// Get yoga data - returns true if completed today
export const getYogaData = () => {
  const today = getTodayString();
  const yogaData = getFromStorage<Record<string, boolean>>(STORAGE_KEYS.YOGA, {});
  return {
    completed: yogaData[today] || false,
    lastSession: Object.keys(yogaData).filter(date => yogaData[date])
      .sort()
      .reverse()[0] || null
  };
};

// Update yoga completion
export const updateYogaCompletion = (completed: boolean) => {
  const today = getTodayString();
  const yogaData = getFromStorage<Record<string, boolean>>(STORAGE_KEYS.YOGA, {});
  yogaData[today] = completed;
  setToStorage(STORAGE_KEYS.YOGA, yogaData);
};

// Get BMI data
export const getBMIData = () => {
  return getFromStorage(STORAGE_KEYS.BMI, {
    value: null,
    category: null
  });
};

// Update BMI data
export const updateBMIData = (value: number, category: string) => {
  setToStorage(STORAGE_KEYS.BMI, { value, category });
};

// Get step history for the last 7 days
export const getStepHistory = () => {
  const stepsData = getFromStorage<Record<string, number>>(STORAGE_KEYS.STEPS, {});
  
  // Get dates for the last 7 days
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  // Map dates to day names and step counts
  return dates.map(date => {
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
    return {
      day: dayName,
      steps: stepsData[date] || 0
    };
  });
};
