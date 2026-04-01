import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600'
};

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp,
  color 
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        {trend && (
          <p className={`text-sm mt-2 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);