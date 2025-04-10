
import React from 'react';
import Navbar from './Navbar';
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, Droplet, History, HeartPulse } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/steps', label: 'Steps', icon: <Activity className="w-5 h-5" /> },
    { path: '/hydration', label: 'Water', icon: <Droplet className="w-5 h-5" /> },
    { path: '/yoga', label: 'Yoga', icon: <HeartPulse className="w-5 h-5" /> },
    { path: '/history', label: 'History', icon: <History className="w-5 h-5" /> },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden touch-manipulation">
      {!isMobile && <Navbar />}
      <main className="flex-grow container px-3 py-4 mx-auto pb-24 md:pb-6">
        {children}
      </main>
      <footer className="hidden md:block py-4 text-center text-sm text-muted-foreground">
        <p>© 2025 Mindful Motion - Your Wellness Journey</p>
      </footer>
      
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50 py-2">
          <div className="flex justify-around items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
      
      <Toaster />
    </div>
  );
};

export default Layout;
