import React from 'react';
import { Cloud, Droplets, Wind, Eye } from 'lucide-react';

export function WeatherWidget() {
  // Mock weather data - replace with real API call
  const weather = {
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 5,
    visibility: 16,
    location: 'Bromma, Stockholms Län, Sverige',
    forecast: [
      { day: 'Mon', high: 24, low: 17, icon: '🌤️' },
      { day: 'Tue', high: 26, low: 18, icon: '☀️' },
      { day: 'Wed', high: 23, low: 16, icon: '🌧️' },
      { day: 'Thu', high: 21, low: 14, icon: '⛅' },
    ],
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-700/50">
      <h2 className="text-white/60 mb-6 tracking-wide uppercase text-sm">Väder</h2>
      
      {/* Current Weather */}
      <div className="mb-8">
        <div className="text-white text-7xl mb-2">{weather.temperature}°</div>
        <div className="text-white/80 text-2xl mb-2">{weather.condition}</div>
        <div className="text-white/50 text-sm">{weather.location}</div>
      </div>

      {/* Weather Details */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between text-white/70">
          <div className="flex items-center gap-3">
            <Droplets className="w-5 h-5" />
            <span>Humidity</span>
          </div>
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex items-center justify-between text-white/70">
          <div className="flex items-center gap-3">
            <Wind className="w-5 h-5" />
            <span>Wind Speed</span>
          </div>
          <span>{weather.windSpeed} m/s</span>
        </div>
        <div className="flex items-center justify-between text-white/70">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5" />
            <span>Visibility</span>
          </div>
          <span>{weather.visibility} km</span>
        </div>
      </div>

      {/* Forecast */}
      <div className="border-t border-slate-700/50 pt-6">
        <div className="grid grid-cols-2 gap-4">
          {weather.forecast.map((day) => (
            <div key={day.day} className="bg-slate-700/30 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-2">{day.day}</div>
              <div className="text-3xl mb-2">{day.icon}</div>
              <div className="text-white">
                <span className="text-lg">{day.high}°</span>
                <span className="text-white/50 text-sm ml-2">{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}