import React, { useState, useEffect } from 'react';
import { Bus, Clock, AlertCircle } from 'lucide-react';

interface BusDeparture {
  line: string;
  destination: string;
  displayTime: string;
  expectedDateTime: string;
  type: string;
}

export function BusTimesWidget() {
  const [departures, setDepartures] = useState<BusDeparture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Vassvägen site ID
  const SITE_ID = '9091';
  
  // Add your Trafiklab API key here
  const API_KEY = 'YOUR_TRAFIKLAB_API_KEY';

  const fetchDepartures = async () => {
    try {
      const response = await fetch(
        `https://api.sl.se/api2/realtimedeparturesV4.json?key=${API_KEY}&siteid=${SITE_ID}&timewindow=60`
      );

      if (!response.ok) {
        throw new Error('Kunde inte hämta avgångar');
      }

      const data = await response.json();
      
      // Combine all transportation types
      const allDepartures: BusDeparture[] = [];
      
      // Buses
      if (data.ResponseData?.Buses) {
        data.ResponseData.Buses.forEach((bus: any) => {
          allDepartures.push({
            line: bus.LineNumber,
            destination: bus.Destination,
            displayTime: bus.DisplayTime || `${bus.TimeTabledDateTime}`,
            expectedDateTime: bus.ExpectedDateTime,
            type: 'Buss',
          });
        });
      }

      // Metros
      if (data.ResponseData?.Metros) {
        data.ResponseData.Metros.forEach((metro: any) => {
          allDepartures.push({
            line: metro.LineNumber,
            destination: metro.Destination,
            displayTime: metro.DisplayTime || `${metro.TimeTabledDateTime}`,
            expectedDateTime: metro.ExpectedDateTime,
            type: 'Tunnelbana',
          });
        });
      }

      // Trains
      if (data.ResponseData?.Trains) {
        data.ResponseData.Trains.forEach((train: any) => {
          allDepartures.push({
            line: train.LineNumber,
            destination: train.Destination,
            displayTime: train.DisplayTime || `${train.TimeTabledDateTime}`,
            expectedDateTime: train.ExpectedDateTime,
            type: 'Pendeltåg',
          });
        });
      }

      // Trams
      if (data.ResponseData?.Trams) {
        data.ResponseData.Trams.forEach((tram: any) => {
          allDepartures.push({
            line: tram.LineNumber,
            destination: tram.Destination,
            displayTime: tram.DisplayTime || `${tram.TimeTabledDateTime}`,
            expectedDateTime: tram.ExpectedDateTime,
            type: 'Spårvagn',
          });
        });
      }

      // Sort by expected time and take first 8
      allDepartures.sort((a, b) => 
        new Date(a.expectedDateTime).getTime() - new Date(b.expectedDateTime).getTime()
      );

      setDepartures(allDepartures.slice(0, 8));
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching departures:', err);
      setError('Kunde inte hämta avgångar. Kontrollera API-nyckeln.');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately
    fetchDepartures();

    // Then fetch every 30 seconds
    const interval = setInterval(fetchDepartures, 30000);

    return () => clearInterval(interval);
  }, []);

  const getLineColor = (line: string, type: string) => {
    // SL color scheme
    if (type === 'Tunnelbana') {
      if (line === '10' || line === '11') return 'bg-blue-600'; // Blå linjen
      if (line === '13' || line === '14') return 'bg-red-600'; // Röda linjen
      if (line === '17' || line === '18' || line === '19') return 'bg-green-600'; // Gröna linjen
    }
    if (type === 'Buss') return 'bg-red-600';
    if (type === 'Pendeltåg') return 'bg-pink-600';
    if (type === 'Spårvagn') return 'bg-amber-600';
    return 'bg-blue-500';
  };

  if (loading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bus className="w-6 h-6 text-white/60" />
            <h2 className="text-white/60 tracking-wide uppercase text-sm">Avgångar från Vassvägen</h2>
          </div>
        </div>
        <div className="text-white/50 text-center py-8">
          Hämtar avgångar...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bus className="w-6 h-6 text-white/60" />
            <h2 className="text-white/60 tracking-wide uppercase text-sm">Avgångar från Vassvägen</h2>
          </div>
        </div>
        <div className="flex items-center gap-3 text-red-400 bg-red-500/10 rounded-xl p-4">
          <AlertCircle className="w-5 h-5" />
          <div>
            <div className="font-medium">Fel vid hämtning</div>
            <div className="text-sm text-red-300">{error}</div>
            <div className="text-xs text-white/40 mt-2">
              Lägg till din Trafiklab API-nyckel i BusTimesWidget.tsx (rad 18)
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bus className="w-6 h-6 text-white/60" />
          <h2 className="text-white/60 tracking-wide uppercase text-sm">Avgångar från Vassvägen</h2>
        </div>
        <div className="text-white/40 text-xs">Uppdateras var 30:e sekund</div>
      </div>

      {departures.length === 0 ? (
        <div className="text-white/50 text-center py-8">
          Inga avgångar de närmaste 60 minuterna
        </div>
      ) : (
        <div className="space-y-3">
          {departures.map((departure, index) => (
            <div
              key={index}
              className="bg-slate-700/30 rounded-xl p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`${getLineColor(departure.line, departure.type)} text-white rounded-lg px-4 py-2 min-w-[70px] text-center text-xl`}>
                  {departure.line}
                </div>
                <div>
                  <div className="text-white text-lg">{departure.destination}</div>
                  <div className="text-white/50 text-sm">{departure.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white/50" />
                <span className="text-white text-2xl">{departure.displayTime}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
