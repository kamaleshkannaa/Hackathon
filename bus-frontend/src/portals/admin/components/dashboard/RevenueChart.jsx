import React from 'react';

interface RevenueChartProps {
  data: { day: string; revenue: number }[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
    <h3 className="text-lg font-semibold text-slate-900 mb-6">Weekly Revenue</h3>
    <div className="h-64 flex items-end gap-2">
      {data.map((item, index) => {
        const max = Math.max(...data.map(d => d.revenue));
        const height = max > 0 ? (item.revenue / max) * 100 : 0;
        
        return (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600 relative group"
              style={{ height: `${height}%`, minHeight: '4px' }}
            >
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                ₹{item.revenue.toLocaleString()}
              </div>
            </div>
            <span className="text-xs text-slate-500">{item.day}</span>
          </div>
        );
      })}
    </div>
  </div>
);