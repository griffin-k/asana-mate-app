
import React from 'react';
import Navbar from './Navbar';
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden touch-manipulation">
      <Navbar />
      <main className="flex-grow container px-3 py-4 mx-auto pb-20 md:pb-6">
        {children}
      </main>
      <footer className="hidden md:block py-4 text-center text-sm text-muted-foreground">
        <p>© 2025 Mindful Motion - Your Wellness Journey</p>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
