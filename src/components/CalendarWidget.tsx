import React from 'react';
import { Calendar } from 'lucide-react';

export function CalendarWidget() {
  const today = new Date();
  
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  
  const monthName = today.toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-700/50">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-white/60" />
        <h2 className="text-white/60 tracking-wide uppercase text-sm">Familjekalender</h2>
      </div>

      {/* Calendar Grid */}
      <div>
        <div className="text-white/80 mb-4">{monthName}</div>
        <div className="grid grid-cols-7 gap-2">
          {['S', 'M', 'T', 'O', 'T', 'F', 'L'].map((day, idx) => (
            <div key={idx} className="text-center text-white/40 text-xs pb-2">
              {day}
            </div>
          ))}
          {Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const isToday = day === today.getDate();
            return (
              <div
                key={day}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                  isToday
                    ? 'bg-blue-500 text-white'
                    : 'text-white/60'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Placeholder for Google Calendar Integration */}
      <div className="mt-6 pt-6 border-t border-slate-700/50">
        <div className="text-white/40 text-sm text-center">
          Anslut till Google Kalender för att visa familjehändelser
        </div>
      </div>
    </div>
  );
}