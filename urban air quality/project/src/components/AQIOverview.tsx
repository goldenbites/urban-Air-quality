import React from 'react';
import { Wind, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { AQIData } from '../utils/dataGenerator';

interface AQIOverviewProps {
  data: AQIData;
  isDarkMode: boolean;
}

const getAQIColor = (aqi: number, isDarkMode: boolean) => {
  if (aqi <= 50) return isDarkMode ? 'from-green-500 to-emerald-400' : 'from-green-400 to-emerald-300';
  if (aqi <= 100) return isDarkMode ? 'from-yellow-500 to-amber-400' : 'from-yellow-400 to-amber-300';
  if (aqi <= 150) return isDarkMode ? 'from-orange-500 to-red-400' : 'from-orange-400 to-red-300';
  return isDarkMode ? 'from-red-600 to-purple-500' : 'from-red-500 to-purple-400';
};

const getAQIStatus = (aqi: number) => {
  if (aqi <= 50) return { text: 'Good', icon: CheckCircle };
  if (aqi <= 100) return { text: 'Moderate', icon: AlertTriangle };
  if (aqi <= 150) return { text: 'Unhealthy', icon: XCircle };
  return { text: 'Hazardous', icon: XCircle };
};

export const AQIOverview: React.FC<AQIOverviewProps> = ({ data, isDarkMode }) => {
  const status = getAQIStatus(data.overall);
  const StatusIcon = status.icon;

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-md border transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/70 border-gray-200'
    }`}>
      <div className="text-center mb-6">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 bg-gradient-to-r ${getAQIColor(data.overall, isDarkMode)} text-white`}>
          <StatusIcon className="w-4 h-4 mr-2" />
          {status.text}
        </div>
        
        <div className="relative">
          <div className={`text-6xl font-bold bg-gradient-to-br ${getAQIColor(data.overall, isDarkMode)} bg-clip-text text-transparent animate-pulse`}>
            {data.overall}
          </div>
          <div className="text-sm opacity-60 mt-2">Air Quality Index</div>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(data.pollutants).map(([pollutant, value]) => (
          <div key={pollutant} className="flex justify-between items-center">
            <div className="flex items-center">
              <Wind className="w-4 h-4 mr-2 opacity-60" />
              <span className="text-sm font-medium">{pollutant}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-20 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                <div 
                  className={`h-full bg-gradient-to-r ${getAQIColor(value, isDarkMode)} transition-all duration-1000`}
                  style={{ width: `${Math.min(100, (value / 200) * 100)}%` }}
                />
              </div>
              <span className="text-sm font-mono w-8 text-right">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};