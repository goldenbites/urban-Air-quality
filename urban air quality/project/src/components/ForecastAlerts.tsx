import React, { useState, useEffect } from 'react';
import { AlertTriangle, Cloud, Sun, Wind, Brain } from 'lucide-react';
import { AQIData, ZoneData } from '../utils/dataGenerator';

interface ForecastAlertsProps {
  currentAQI: AQIData;
  zones: ZoneData[];
  isDarkMode: boolean;
}

export const ForecastAlerts: React.FC<ForecastAlertsProps> = ({ currentAQI, zones, isDarkMode }) => {
  const [alerts, setAlerts] = useState<string[]>([]);
  const [forecast, setForecast] = useState<{ time: string; aqi: number; condition: string }[]>([]);

  useEffect(() => {
    // Generate AI alerts based on current conditions
    const newAlerts = [];
    
    const worstZone = zones.reduce((worst, zone) => zone.aqi > worst.aqi ? zone : worst);
    if (worstZone.aqi > 150) {
      newAlerts.push(`⚠️ Critical air quality detected in ${worstZone.name}`);
    }
    
    if (currentAQI.overall > 100) {
      newAlerts.push(`🏃‍♂️ Outdoor activities not recommended city-wide`);
    }
    
    if (currentAQI.pollutants['PM2.5'] > 75) {
      newAlerts.push(`😷 High particulate matter levels - masks recommended`);
    }

    // Simulate forecast
    const newForecast = [];
    let baseAqi = currentAQI.overall;
    
    for (let i = 1; i <= 6; i++) {
      const variation = (Math.random() - 0.5) * 20;
      baseAqi = Math.max(0, Math.min(300, baseAqi + variation));
      
      const hour = new Date(Date.now() + i * 4 * 60 * 60 * 1000);
      newForecast.push({
        time: hour.getHours().toString().padStart(2, '0') + ':00',
        aqi: Math.round(baseAqi),
        condition: baseAqi <= 50 ? 'Clear' : baseAqi <= 100 ? 'Moderate' : baseAqi <= 150 ? 'Poor' : 'Hazardous'
      });
    }
    
    setAlerts(newAlerts);
    setForecast(newForecast);
  }, [currentAQI, zones]);

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-md border transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/70 border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-500 animate-pulse" />
          AI Insights & Forecast
        </h3>
      </div>

      {/* Live Alerts */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
          Live Alerts
        </h4>
        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg text-sm border-l-4 ${
                alert.includes('Critical') 
                  ? 'border-red-500 bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  : 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300'
              } animate-slideIn`}
            >
              {alert}
            </div>
          ))}
          {alerts.length === 0 && (
            <div className={`p-3 rounded-lg text-sm ${
              isDarkMode ? 'bg-green-900/20 text-green-300' : 'bg-green-50 text-green-800'
            }`}>
              ✅ No active air quality alerts
            </div>
          )}
        </div>
      </div>

      {/* 24-hour Forecast */}
      <div>
        <h4 className="text-sm font-medium mb-3">24-Hour Forecast</h4>
        <div className="grid grid-cols-3 gap-3">
          {forecast.map((item, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg text-center transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}
            >
              <div className="text-xs opacity-60 mb-1">{item.time}</div>
              <div className="text-lg font-bold mb-1">{item.aqi}</div>
              <div className="text-xs flex items-center justify-center">
                {item.condition === 'Clear' && <Sun className="w-3 h-3 mr-1 text-yellow-500" />}
                {item.condition === 'Moderate' && <Cloud className="w-3 h-3 mr-1 text-gray-500" />}
                {(item.condition === 'Poor' || item.condition === 'Hazardous') && <Wind className="w-3 h-3 mr-1 text-red-500" />}
                {item.condition}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};