import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';
import { AQIData, ZoneData } from '../utils/dataGenerator';

interface LiveTickerProps {
  currentAQI: AQIData;
  zones: ZoneData[];
  isDarkMode: boolean;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ currentAQI, zones, isDarkMode }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    `City AQI: ${currentAQI.overall} - ${currentAQI.overall <= 50 ? 'GOOD' : currentAQI.overall <= 100 ? 'MODERATE' : currentAQI.overall <= 150 ? 'UNHEALTHY' : 'HAZARDOUS'}`,
    `Worst Zone: ${zones.reduce((worst, zone) => zone.aqi > worst.aqi ? zone : worst).name} (${zones.reduce((worst, zone) => zone.aqi > worst.aqi ? zone : worst).aqi})`,
    `Best Zone: ${zones.reduce((best, zone) => zone.aqi < best.aqi ? zone : best).name} (${zones.reduce((best, zone) => zone.aqi < best.aqi ? zone : best).aqi})`,
    `PM2.5: ${currentAQI.pollutants['PM2.5']} µg/m³ • NO₂: ${currentAQI.pollutants['NO₂']} µg/m³ • O₃: ${currentAQI.pollutants['O₃']} µg/m³`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className={`rounded-2xl p-4 mb-6 backdrop-blur-md border overflow-hidden ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/70 border-gray-200'
    }`}>
      <div className="flex items-center">
        <div className="flex items-center mr-4 flex-shrink-0">
          <Radio className="w-4 h-4 mr-2 text-red-500 animate-pulse" />
          <span className="text-sm font-medium text-red-500">LIVE</span>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <div 
            className="text-sm font-mono transition-all duration-500 transform whitespace-nowrap"
            key={currentMessage}
            style={{ 
              animation: 'slideInRight 0.5s ease-out'
            }}
          >
            {messages[currentMessage]}
          </div>
        </div>
      </div>
    </div>
  );
};