import React from 'react';
import { Moon, Sun, Download, Settings as SettingsIcon } from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isDarkMode, onToggleTheme }) => {
  const exportReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      cityAQI: Math.floor(Math.random() * 150) + 50,
      zones: Array.from({ length: 8 }, (_, i) => ({
        name: `Zone ${String.fromCharCode(65 + i)}`,
        aqi: Math.floor(Math.random() * 200) + 20
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `air-quality-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onToggleTheme}
        className={`p-3 rounded-xl backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50' 
            : 'bg-white/70 border-gray-200 hover:bg-white/90'
        }`}
        title="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-blue-500" />
        )}
      </button>

      <button
        onClick={exportReport}
        className={`p-3 rounded-xl backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50' 
            : 'bg-white/70 border-gray-200 hover:bg-white/90'
        }`}
        title="Export daily report"
      >
        <Download className="w-5 h-5 text-green-500" />
      </button>

      <div className={`p-3 rounded-xl backdrop-blur-md border ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-white/70 border-gray-200'
      }`}>
        <SettingsIcon className="w-5 h-5 opacity-60" />
      </div>
    </div>
  );
};