import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendChartProps {
  data: { time: string; aqi: number }[];
  isDarkMode: boolean;
}

export const TrendChart: React.FC<TrendChartProps> = ({ data, isDarkMode }) => {
  const maxAqi = Math.max(...data.map(d => d.aqi), 100);
  const minAqi = Math.min(...data.map(d => d.aqi), 0);
  const range = maxAqi - minAqi;
  
  const trend = data.length >= 2 ? data[data.length - 1].aqi - data[data.length - 2].aqi : 0;
  const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-md border transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/70 border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Hourly Trends</h3>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
          trend > 0 ? 'bg-red-100 text-red-700' : 
          trend < 0 ? 'bg-green-100 text-green-700' : 
          'bg-gray-100 text-gray-700'
        }`}>
          <TrendIcon className="w-4 h-4" />
          <span>{trend > 0 ? '+' : ''}{trend.toFixed(1)}</span>
        </div>
      </div>

      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <defs>
            <linearGradient id="aqi-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 50, 100, 150].map(value => (
            <line
              key={value}
              x1="0"
              y1={200 - ((value - minAqi) / range) * 200}
              x2="400"
              y2={200 - ((value - minAqi) / range) * 200}
              stroke={isDarkMode ? '#374151' : '#E5E7EB'}
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Data line */}
          {data.length > 1 && (
            <>
              <path
                d={`M ${data.map((d, i) => 
                  `${(i / (data.length - 1)) * 400},${200 - ((d.aqi - minAqi) / range) * 200}`
                ).join(' L ')}`}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-lg"
              />
              
              {/* Fill area */}
              <path
                d={`M 0,200 L ${data.map((d, i) => 
                  `${(i / (data.length - 1)) * 400},${200 - ((d.aqi - minAqi) / range) * 200}`
                ).join(' L ')} L 400,200 Z`}
                fill="url(#aqi-gradient)"
              />
            </>
          )}

          {/* Data points */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={(i / (data.length - 1)) * 400}
              cy={200 - ((d.aqi - minAqi) / range) * 200}
              r="4"
              fill="#3B82F6"
              className="drop-shadow-lg animate-pulse"
            />
          ))}
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs opacity-60 -translate-x-8">
          <span>{maxAqi}</span>
          <span>{Math.round(maxAqi * 0.75)}</span>
          <span>{Math.round(maxAqi * 0.5)}</span>
          <span>{Math.round(maxAqi * 0.25)}</span>
          <span>{minAqi}</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="text-sm opacity-60">Past Hour AQI Movement</div>
        {data.length > 0 && (
          <div className="text-lg font-mono mt-1">
            Current: <span className="font-bold">{data[data.length - 1]?.aqi}</span>
          </div>
        )}
      </div>
    </div>
  );
};