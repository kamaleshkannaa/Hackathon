import React, { useState } from 'react';
import { BusSchedule } from '../../services/scheduleManagementService';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScheduleCalendarProps {
  schedules: BusSchedule[];
  onSelectDate: (date: Date) => void;
  onSelectSchedule: (schedule: BusSchedule) => void;
}

export const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ 
  schedules, 
  onSelectDate,
  onSelectSchedule 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getSchedulesForDay = (day: Date) => {
    return schedules.filter(s => isSameDay(new Date(s.travelDate), day));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => {
          const daySchedules = getSchedulesForDay(day);
          const hasSchedules = daySchedules.length > 0;

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(day)}
              className={`
                aspect-square p-2 rounded-lg border text-sm relative
                ${!isSameMonth(day, currentMonth) ? 'bg-slate-50 text-slate-400' : 'bg-white'}
                ${hasSchedules ? 'border-blue-300 bg-blue-50' : 'border-slate-200'}
                hover:border-blue-500 hover:bg-blue-50
              `}
            >
              <span className="font-medium">{format(day, 'd')}</span>
              {hasSchedules && (
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>

      {schedules.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-2">Schedules this month: {schedules.length}</p>
        </div>
      )}
    </div>
  );
};