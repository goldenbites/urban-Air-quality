import React from 'react';
import { Heart, Users, Activity, Shield } from 'lucide-react';
import { AQIData } from '../utils/dataGenerator';

interface HealthRecommendationsProps {
  currentAQI: AQIData;
  isDarkMode: boolean;
}

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({ currentAQI, isDarkMode }) => {
  const getRecommendations = (aqi: number) => {
    if (aqi <= 50) {
      return [
        { icon: Activity, text: "Perfect for outdoor activities", color: "text-green-500" },
        { icon: Heart, text: "All age groups can enjoy fresh air", color: "text-green-500" },
        { icon: Users, text: "Great day for community events", color: "text-green-500" }
      ];
    } else if (aqi <= 100) {
      return [
        { icon: Activity, text: "Moderate outdoor activities OK", color: "text-yellow-500" },
        { icon: Shield, text: "Sensitive groups should limit exposure", color: "text-yellow-500" },
        { icon: Users, text: "Children should reduce outdoor time", color: "text-yellow-500" }
      ];
    } else if (aqi <= 150) {
      return [
        { icon: Shield, text: "Masks recommended for outdoor activities", color: "text-orange-500" },
        { icon: Heart, text: "Heart/lung patients stay indoors", color: "text-orange-500" },
        { icon: Activity, text: "Limit strenuous outdoor exercise", color: "text-orange-500" }
      ];
    } else {
      return [
        { icon: Shield, text: "Stay indoors with air purification", color: "text-red-500" },
        { icon: Heart, text: "High-risk groups avoid all outdoor activities", color: "text-red-500" },
        { icon: Users, text: "Keep windows closed and sealed", color: "text-red-500" }
      ];
    }
  };

  const recommendations = getRecommendations(currentAQI.overall);
  const healthScore = Math.max(0, 100 - currentAQI.overall);

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-md border transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/70 border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <Heart className="w-5 h-5 mr-2 text-red-500 animate-pulse" />
          Health Recommendations
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          healthScore >= 70 ? 'bg-green-100 text-green-800' :
          healthScore >= 40 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          Health Score: {healthScore}/100
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {recommendations.map((rec, index) => (
          <div 
            key={index}
            className={`flex items-start p-3 rounded-lg transition-all duration-300 ${
              isDarkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <rec.icon className={`w-5 h-5 mr-3 mt-0.5 ${rec.color}`} />
            <span className="text-sm">{rec.text}</span>
          </div>
        ))}
      </div>

      {/* Risk Groups Alert */}
      <div className={`p-4 rounded-lg border-l-4 ${
        currentAQI.overall > 100 
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
      }`}>
        <div className="text-sm font-medium mb-2">
          {currentAQI.overall > 100 ? '⚠️ High-Risk Groups' : 'ℹ️ General Population'}
        </div>
        <div className="text-xs opacity-80">
          {currentAQI.overall > 100 
            ? 'Children, elderly, pregnant women, and those with heart/lung conditions should take extra precautions.'
            : 'Current air quality is suitable for all population groups with normal outdoor activities.'
          }
        </div>
      </div>

      {/* Air Purifier Recommendation */}
      {currentAQI.overall > 100 && (
        <div className="mt-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
          <div className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-1">
            💨 Indoor Air Quality Tips
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Consider using HEPA air purifiers and keep indoor plants to improve air quality.
          </div>
        </div>
      )}
    </div>
  );
};