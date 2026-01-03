import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

export function StockMarketWidget() {
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'GOOGL', name: 'Alphabet', price: 142.87, change: -0.89, changePercent: -0.62, currency: 'USD' },
    { symbol: 'TSLA', name: 'Tesla', price: 248.92, change: -3.67, changePercent: -1.45, currency: 'USD' },
    { symbol: 'Avanza Zero', name: 'Avanza Zero', price: 387.50, change: 2.10, changePercent: 0.55, currency: 'SEK' },
    { symbol: 'OMXS30', name: 'OMX Stockholm 30', price: 2547.83, change: 15.42, changePercent: 0.61, currency: 'SEK' },
    { symbol: 'NASDAQ', name: 'Nasdaq Composite', price: 16825.93, change: 124.67, changePercent: 0.75, currency: 'USD' },
  ]);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((stock) => {
          const changeAmount = (Math.random() - 0.5) * 2;
          const newPrice = stock.price + changeAmount;
          const newChange = stock.change + changeAmount;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;
          
          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(newChange.toFixed(2)),
            changePercent: parseFloat(newChangePercent.toFixed(2)),
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-700/50">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-6 h-6 text-white/60" />
        <h2 className="text-white/60 tracking-wide uppercase text-sm">Aktiemarknad</h2>
      </div>

      <div className="space-y-4">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="bg-slate-700/30 rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-white text-xl">{stock.symbol}</div>
                <div className="text-white/50 text-sm">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="text-white text-xl">
                  {stock.currency === 'SEK' ? `${stock.price.toFixed(2)} kr` : `$${stock.price.toFixed(2)}`}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {stock.change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span
                className={`${
                  stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {stock.change >= 0 ? '+' : ''}
                {stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}
                {stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-700/50">
        <div className="text-white/40 text-xs text-center">
          Marknadsdata uppdateras var 5:e sekund
        </div>
      </div>
    </div>
  );
}
