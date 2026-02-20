import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

// Mock Data Generator
const generateMockWeather = (city) => {
  const randomTemp = Math.floor(Math.random() * 30) + 5; // 5 to 35
  const conditions = [
    { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
    { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
    { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
    { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
    { id: 502, main: 'Rain', description: 'heavy intensity rain', icon: '09d' },
  ];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

  return {
    coord: { lon: -0.1257, lat: 51.5085 },
    weather: [randomCondition],
    base: 'stations',
    main: {
      temp: randomTemp,
      feels_like: randomTemp - 2,
      temp_min: randomTemp - 3,
      temp_max: randomTemp + 3,
      pressure: 1012 + Math.floor(Math.random() * 20 - 10),
      humidity: 40 + Math.floor(Math.random() * 40),
    },
    visibility: 10000,
    wind: { speed: (Math.random() * 10).toFixed(1), deg: Math.floor(Math.random() * 360) },
    clouds: { all: Math.floor(Math.random() * 100) },
    dt: Date.now() / 1000,
    sys: {
      type: 2,
      id: 2075535,
      country: 'XX',
      sunrise: 1695188000,
      sunset: 1695233000,
    },
    timezone: 3600,
    id: Math.floor(Math.random() * 100000),
    name: city,
    cod: 200,
  };
};

const generateMockForecast = (city) => {
  return {
    cod: '200',
    message: 0,
    cnt: 40,
    list: Array.from({ length: 40 }, (_, i) => ({
      dt: Math.floor(Date.now() / 1000) + i * 10800, // Every 3 hours
      main: {
        temp: 15 + Math.random() * 10 - 5,
        feels_like: 14,
        temp_min: 12,
        temp_max: 18,
        pressure: 1012,
        humidity: 50 + Math.floor(Math.random() * 30),
      },
      weather: [
        {
          id: 800,
          main: Math.random() > 0.5 ? 'Clear' : 'Rain',
          description: Math.random() > 0.5 ? 'clear sky' : 'light rain',
          icon: Math.random() > 0.5 ? '01d' : '10d',
        },
      ],
      clouds: { all: i * 2 },
      wind: { speed: 3 + Math.random(), deg: 240 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: new Date(Date.now() + i * 10800 * 1000).toISOString().replace('T', ' ').substring(0, 19),
    })),
    city: {
      id: Math.floor(Math.random() * 100000),
      name: city,
      coord: { lat: 51.5085, lon: -0.1257 },
      country: 'XX',
      population: 1000000,
      timezone: 3600,
      sunrise: 1695188000,
      sunset: 1695233000,
    },
  };
};


export const getWeather = async (city) => {
  try {
    const response = await apiClient.get('/weather', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 404)) {
      console.warn('API Error, falling back to mock data:', error.response.status);
      return generateMockWeather(city);
    }
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const getForecast = async (city) => {
  try {
    const response = await apiClient.get('/forecast', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 404)) {
      console.warn('API Error, falling back to mock data:', error.response.status);
      return generateMockForecast(city);
    }
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Getting 5 day forecast as a proxy for history/trend
export const getWeatherHistory = async (city) => {
  return getForecast(city);
};

export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await apiClient.get('/weather', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 404)) {
      console.warn('API Error, falling back to mock data:', error.response.status);
      return generateMockWeather('My Location');
    }
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const getForecastByCoordinates = async (lat, lon) => {
  try {
    const response = await apiClient.get('/forecast', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 404)) {
      console.warn('API Error, falling back to mock data:', error.response.status);
      return generateMockForecast('My Location');
    }
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
