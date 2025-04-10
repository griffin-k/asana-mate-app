
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Droplet, Clock, History, Calculator, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Steps', path: '/steps', icon: <Activity className="w-5 h-5" /> },
    { name: 'Water', path: '/hydration', icon: <Droplet className="w-5 h-5" /> },
    { name: 'Yoga', path: '/yoga', icon: <Clock className="w-5 h-5" /> },
    { name: 'History', path: '/history', icon: <History className="w-5 h-5" /> },
    { name: 'BMI', path: '/bmi', icon: <Calculator className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop navbar */}
      {!isMobile && (
        <nav className="bg-white shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="flex items-center gap-2">
                <Activity className="w-6 h-6 text-primary" />
                <span className="font-bold text-xl text-primary">MindfulMotion</span>
              </Link>
              
              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                      isActive(item.path) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}
      
      {/* Mobile navbar - header only shows app name */}
      {isMobile && (
        <>
          <nav className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4">
              <div className="flex justify-center items-center py-3">
                <Link to="/" className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span className="font-bold text-lg text-primary">MindfulMotion</span>
                </Link>
              </div>
            </div>
          </nav>
          
          {/* Mobile bottom tab bar navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-between px-1 py-2 z-20">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center flex-1 select-none touch-manipulation"
                style={{ minHeight: '56px' }}
              >
                <div className={`p-1 rounded-full ${isActive(item.path) ? 'bg-primary/10' : ''}`}>
                  <div className={`${isActive(item.path) ? 'text-primary' : 'text-gray-500'}`}>
                    {item.icon}
                  </div>
                </div>
                <span className={`text-xs mt-0.5 ${isActive(item.path) ? 'text-primary font-medium' : 'text-gray-500'}`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
