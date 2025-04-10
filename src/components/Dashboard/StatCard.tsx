
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, className, onClick }) => {
  return (
    <div 
      className={cn(
        "stat-card card-hover transition-all duration-300",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
        <div className="text-primary">{icon}</div>
      </div>
      <div className="mt-auto">
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
