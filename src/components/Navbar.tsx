
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Droplet, Clock, History, Calculator } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Activity className="w-5 h-5" /> },
    { name: 'Steps', path: '/steps', icon: <Activity className="w-5 h-5" /> },
    { name: 'Hydration', path: '/hydration', icon: <Droplet className="w-5 h-5" /> },
    { name: 'Yoga', path: '/yoga', icon: <Clock className="w-5 h-5" /> },
    { name: 'History', path: '/history', icon: <History className="w-5 h-5" /> },
    { name: 'BMI', path: '/bmi', icon: <Calculator className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl text-primary">MindfulMotion</span>
          </Link>
          
          {!isMobile && (
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}
          
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-between px-2 py-3 z-20">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center justify-center flex-1"
                >
                  {item.icon}
                  <span className="text-xs mt-1">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
