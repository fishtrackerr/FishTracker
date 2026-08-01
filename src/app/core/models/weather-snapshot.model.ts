export interface HourlyForecast {
  time: string;
  temperatureC: number;
  precipitationProbability: number;
  weatherCode: number;
}

export interface DailyForecast {
  date: string;
  tempMinC: number;
  tempMaxC: number;
  precipitationProbability: number;
  weatherCode: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherSnapshot {
  description: string;
  temperatureC: number;
  feelsLikeC?: number;
  tempMinC?: number;
  tempMaxC?: number;
  windSpeedKmh: number;
  windDirection: number;
  windGustKmh?: number;
  airPressureHpa: number;
  humidity: number;
  cloudCoverage: number;
  rain: boolean;
  rainProbability?: number;
  rainAmountMm?: number;
  visibility?: number;
  uvIndex?: number;
  stormWarning?: boolean;
  thunderstormProbability?: number;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  capturedAt: string;
  isCached?: boolean;
  source?: 'live' | 'cached' | 'manual';
  hourly?: HourlyForecast[];
  daily?: DailyForecast[];
}

export interface WeatherWarning {
  type: 'storm' | 'thunder' | 'wind' | 'rain' | 'temperature' | 'fire';
  message: string;
  severity: 'warning' | 'danger';
}
