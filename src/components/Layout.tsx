
import React from 'react';
import Navbar from './Navbar';
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container px-4 py-6 mx-auto">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>© 2025 Mindful Motion - Your Wellness Journey</p>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
