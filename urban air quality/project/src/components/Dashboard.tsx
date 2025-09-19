import React, { useState, useEffect } from 'react';
import { AQIOverview } from './AQIOverview';
import { CityMap } from './CityMap';
import { TrendChart } from './TrendChart';
import { ForecastAlerts } from './ForecastAlerts';
import { HealthRecommendations } from './HealthRecommendations';
import { LiveTicker } from './LiveTicker';
import { Settings } from './Settings';
import { WhatIfSimulation } from './WhatIfSimulation';
import { generateAQIData, generateZoneData, AQIData, ZoneData } from '../utils/dataGenerator';

export const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentAQI, setCurrentAQI] = useState<AQIData>(generateAQIData());
  const [zones, setZones] = useState<ZoneData[]>(generateZoneData());
  const [historicalData, setHistoricalData] = useState<{ time: string; aqi: number }[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [trafficReduction, setTrafficReduction] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAQI = generateAQIData(trafficReduction);
      const newZones = generateZoneData(trafficReduction);
      
      setCurrentAQI(newAQI);
      setZones(newZones);
      setLastUpdate(new Date());
      
      // Update historical data
      setHistoricalData(prev => {
        const newEntry = {
          time: new Date().toLocaleTimeString(),
          aqi: newAQI.overall
        };
        return [...prev.slice(-19), newEntry]; // Keep last 20 entries
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [trafficReduction]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Urban Air Quality Intelligence
            </h1>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
          <Settings isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
        </div>

        {/* Live Ticker */}
        <LiveTicker currentAQI={currentAQI} zones={zones} isDarkMode={isDarkMode} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* AQI Overview */}
          <div className="lg:col-span-1">
            <AQIOverview data={currentAQI} isDarkMode={isDarkMode} />
          </div>
          
          {/* City Map */}
          <div className="lg:col-span-2">
            <CityMap zones={zones} isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* Charts and Predictions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <TrendChart data={historicalData} isDarkMode={isDarkMode} />
          <ForecastAlerts currentAQI={currentAQI} zones={zones} isDarkMode={isDarkMode} />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <HealthRecommendations currentAQI={currentAQI} isDarkMode={isDarkMode} />
          <WhatIfSimulation 
            trafficReduction={trafficReduction}
            onTrafficReductionChange={setTrafficReduction}
            currentAQI={currentAQI}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};