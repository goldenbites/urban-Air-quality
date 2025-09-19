import React from 'react';
import { Car, TrendingDown, Zap } from 'lucide-react';
import { AQIData } from '../utils/dataGenerator';

interface WhatIfSimulationProps {
  trafficReduction: number;
  onTrafficReductionChange: (value: number) => void;
  currentAQI: AQIData;
  isDarkMode: boolean;
}

export const WhatIfSimulation: React.FC<WhatIfSimulationProps> = ({ 
  trafficReduction, 
  onTrafficReductionChange, 
  currentAQI, 
  isDarkMode 
}) => {
  const projectedAQI = Math.max(20, currentAQI.overall - (trafficReduction * 0.6));
  const improvement = currentAQI.overall - projectedAQI;

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-md border transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/70 border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <Zap className="w-5 h-5 mr-2 text-purple-500 animate-pulse" />
          What-If Simulation
        </h3>
      </div>

      <div className="space-y-6">
        {/* Traffic Reduction Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium flex items-center">
              <Car className="w-4 h-4 mr-2" />
              Traffic Reduction
            </label>
            <span className="text-sm font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {trafficReduction}%
            </span>
          </div>
          
          <input
            type="range"
            min="0"
            max="80"
            value={trafficReduction}
            onChange={(e) => onTrafficReductionChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          
          <div className="flex justify-between text-xs opacity-60 mt-1">
            <span>No Change</span>
            <span>Major Reduction</span>
          </div>
        </div>

        {/* Results */}
        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'
        }`}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-sm opacity-60 mb-1">Current AQI</div>
              <div className="text-2xl font-bold">{currentAQI.overall}</div>
            </div>
            <div className="text-center">
              <div className="text-sm opacity-60 mb-1">Projected AQI</div>
              <div className="text-2xl font-bold text-green-500">
                {Math.round(projectedAQI)}
              </div>
            </div>
          </div>

          {improvement > 0 && (
            <div className="flex items-center justify-center p-3 bg-green-100 text-green-800 rounded-lg">
              <TrendingDown className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                {Math.round(improvement)} point improvement
              </span>
            </div>
          )}
        </div>

        {/* Impact Details */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Estimated Impact:</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>CO Emissions</span>
              <span className="text-green-600">-{Math.round(trafficReduction * 0.8)}%</span>
            </div>
            <div className="flex justify-between">
              <span>NO₂ Levels</span>
              <span className="text-green-600">-{Math.round(trafficReduction * 0.7)}%</span>
            </div>
            <div className="flex justify-between">
              <span>PM2.5 Particles</span>
              <span className="text-green-600">-{Math.round(trafficReduction * 0.5)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Health Benefit</span>
              <span className="text-blue-600">+{Math.round(improvement * 2)}%</span>
            </div>
          </div>
        </div>

        {trafficReduction > 50 && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
              🚌 Policy Suggestion
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400">
              Consider implementing car-free zones or improving public transportation to achieve this reduction.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};