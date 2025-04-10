
import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  tips: string[];
}

const BMICalculator: React.FC = () => {
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<BMIResult | null>(null);
  
  const calculateBMI = () => {
    if (!height || !weight) return;
    
    let bmiValue: number;
    
    if (units === 'metric') {
      const heightInMeters = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    } else {
      // Imperial: BMI = (weight in pounds * 703) / (height in inches * height in inches)
      bmiValue = (parseFloat(weight) * 703) / (parseFloat(height) * parseFloat(height));
    }
    
    bmiValue = Math.round(bmiValue * 10) / 10;
    
    let category: string;
    let color: string;
    let tips: string[] = [];
    
    if (bmiValue < 18.5) {
      category = 'Underweight';
      color = 'text-blue-500';
      tips = [
        'Increase your caloric intake with nutrient-dense foods',
        'Include protein in every meal (eggs, dairy, meat, legumes)',
        'Strength training can help build muscle mass',
        'Consult with a nutritionist for a personalized meal plan'
      ];
    } else if (bmiValue < 25) {
      category = 'Normal weight';
      color = 'text-green-500';
      tips = [
        'Maintain a balanced diet with plenty of fruits and vegetables',
        'Stay active with regular exercise (150 minutes/week)',
        'Focus on maintaining healthy habits',
        'Regular health check-ups to monitor overall health'
      ];
    } else if (bmiValue < 30) {
      category = 'Overweight';
      color = 'text-yellow-500';
      tips = [
        'Focus on portion control and mindful eating',
        'Increase physical activity (aim for 30 minutes daily)',
        'Choose whole foods over processed options',
        'Monitor water intake and stay hydrated'
      ];
    } else {
      category = 'Obesity';
      color = 'text-red-500';
      tips = [
        'Consult with healthcare professionals for guidance',
        'Create a sustainable meal plan focused on nutrition',
        'Begin with low-impact exercises like walking or swimming',
        'Set achievable, small goals for consistent progress'
      ];
    }
    
    setResult({ bmi: bmiValue, category, color, tips });
  };
  
  useEffect(() => {
    // Reset input fields when units change
    setHeight('');
    setWeight('');
    setResult(null);
  }, [units]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calculator className="text-primary" /> BMI Calculator
        </h2>
        
        <div className="mb-6">
          <RadioGroup 
            value={units} 
            onValueChange={(value) => setUnits(value as 'metric' | 'imperial')}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="metric" id="metric" />
              <Label htmlFor="metric">Metric (cm/kg)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="imperial" id="imperial" />
              <Label htmlFor="imperial">Imperial (in/lb)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="height">
              Height ({units === 'metric' ? 'cm' : 'inches'})
            </Label>
            <Input 
              id="height"
              type="number" 
              placeholder={units === 'metric' ? "Height in cm" : "Height in inches"}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">
              Weight ({units === 'metric' ? 'kg' : 'pounds'})
            </Label>
            <Input 
              id="weight"
              type="number" 
              placeholder={units === 'metric' ? "Weight in kg" : "Weight in pounds"}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
        
        <Button 
          className="w-full"
          onClick={calculateBMI}
          disabled={!height || !weight}
        >
          Calculate BMI
        </Button>
      </div>
      
      {result && (
        <div className="bg-white rounded-xl shadow-md p-6 animate-scale-up">
          <h3 className="text-lg font-semibold mb-4">Your Results</h3>
          
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{result.bmi}</div>
              <div className={`text-xl font-medium ${result.color}`}>{result.category}</div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">What does this mean?</h4>
              <p className="text-muted-foreground">
                BMI is a screening tool that can indicate whether you may have weight issues that could lead to health problems. 
                However, it doesn't diagnose body fatness or health.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Recommendations:</h4>
              <ul className="space-y-2">
                {result.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
