export interface AQIData {
  overall: number;
  pollutants: {
    'PM2.5': number;
    'PM10': number;
    'CO': number;
    'NO₂': number;
    'SO₂': number;
    'O₃': number;
  };
}

export interface ZoneData {
  name: string;
  aqi: number;
  population: string;
}

export const generateAQIData = (trafficReduction: number = 0): AQIData => {
  const baseReduction = trafficReduction * 0.01;
  
  const pollutants = {
    'PM2.5': Math.max(5, Math.round((Math.random() * 100 + 20) * (1 - baseReduction * 0.5))),
    'PM10': Math.max(8, Math.round((Math.random() * 120 + 30) * (1 - baseReduction * 0.4))),
    'CO': Math.max(2, Math.round((Math.random() * 50 + 10) * (1 - baseReduction * 0.8))),
    'NO₂': Math.max(3, Math.round((Math.random() * 80 + 15) * (1 - baseReduction * 0.7))),
    'SO₂': Math.max(1, Math.round((Math.random() * 40 + 5) * (1 - baseReduction * 0.3))),
    'O₃': Math.max(10, Math.round((Math.random() * 90 + 20) * (1 - baseReduction * 0.2)))
  };

  // Calculate overall AQI (simplified - normally uses complex EPA formula)
  const overall = Math.max(20, Math.round(
    Math.max(...Object.values(pollutants)) * 1.2 * (1 - baseReduction * 0.6)
  ));

  return {
    overall,
    pollutants
  };
};

export const generateZoneData = (trafficReduction: number = 0): ZoneData[] => {
  const baseReduction = trafficReduction * 0.01;
  const zoneNames = [
    'Downtown', 'Industrial', 'Residential', 'Park District',
    'Harbor', 'Airport', 'University', 'Shopping', 
    'Tech Hub', 'Old Town', 'Waterfront', 'Suburbs'
  ];

  return zoneNames.slice(0, 12).map(name => ({
    name,
    aqi: Math.max(15, Math.round(
      (Math.random() * 180 + 30) * (1 - baseReduction * 0.6)
    )),
    population: `${Math.round((Math.random() * 150 + 25))}K`
  }));
};