import React, { useState, useEffect } from 'react';
import { WeatherWidget } from './components/WeatherWidget';
import { BusTimesWidget } from './components/BusTimesWidget';
import { StockMarketWidget } from './components/StockMarketWidget';
import { NewsWidget } from './components/NewsWidget';
import { ClockWidget } from './components/ClockWidget';
import { CalendarWidget } from './components/CalendarWidget';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <ClockWidget />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-3 space-y-6">
            <WeatherWidget />
            <CalendarWidget />
          </div>

          {/* Middle Column */}
          <div className="col-span-6 space-y-6">
            <NewsWidget />
            <BusTimesWidget />
          </div>

          {/* Right Column */}
          <div className="col-span-3 space-y-6">
            <StockMarketWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
