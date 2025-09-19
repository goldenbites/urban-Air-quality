import React from 'react';
import { MapPin } from 'lucide-react';
import { ZoneData } from '../utils/dataGenerator';

interface CityMapProps {
  zones: ZoneData[];
  isDarkMode: boolean;
}

const getZoneColor = (aqi: number) => {
  if (aqi <= 50) return 'bg-green-400';
  if (aqi <= 100) return 'bg-yellow-400';
  if (aqi <= 150) return 'bg-orange-400';
  return 'bg-red-500';
};

const getZoneGlow = (aqi: number) => {
  if (aqi <= 50) return 'shadow-green-400/50';
  if (aqi <= 100) return 'shadow-yellow-400/50';
  if (aqi <= 150) return 'shadow-orange-400/50';
  return 'shadow-red-500/50 animate-pulse';
};

export const CityMap: React.FC<CityMapProps> = ({ zones, isDarkMode }) => {
  return (
    <div className={`rounded-2xl p-6 backdrop-blur-md border transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/70 border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Live City Zones</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm opacity-60">Live Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 h-80">
        {zones.map((zone, index) => (
          <div
            key={zone.name}
            className={`relative rounded-xl p-3 cursor-pointer transform hover:scale-105 transition-all duration-300 ${getZoneColor(zone.aqi)} ${getZoneGlow(zone.aqi)} shadow-lg`}
            style={{
              gridColumn: `span ${Math.ceil(Math.random() * 2)}`,
              gridRow: `span ${Math.ceil(Math.random() * 2)}`
            }}
          >
            <div className="absolute top-2 right-2">
              <MapPin className="w-4 h-4 text-white drop-shadow-lg" />
            </div>
            
            <div className="text-white">
              <div className="font-bold text-sm mb-1">{zone.name}</div>
              <div className="text-2xl font-bold mb-1">{zone.aqi}</div>
              <div className="text-xs opacity-90">
                Population: {zone.population}
              </div>
            </div>

            {zone.aqi > 150 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between text-xs opacity-60">
        <span>🟢 Good (0-50)</span>
        <span>🟡 Moderate (51-100)</span>
        <span>🟠 Unhealthy (101-150)</span>
        <span>🔴 Hazardous (151+)</span>
      </div>
    </div>
  );
};