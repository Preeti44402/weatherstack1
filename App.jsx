import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HistoryWeather from './components/HistoryWeather';
import ApiFeatures from './components/ApiFeatures';
import Stopwatch from './components/Stopwatch';
import {
  getWeather,
  getForecast,
  getWeatherByCoordinates,
  getForecastByCoordinates
} from './services/weatherService';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('current');
  const [city, setCity] = useState('London'); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (cityName) => {
    let updatedFavorites;
    if (favorites.includes(cityName)) {
      updatedFavorites = favorites.filter(c => c !== cityName);
    } else {
      updatedFavorites = [...favorites, cityName];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };


  const toggleUnit = () => {
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  const fetchData = async (searchCity) => {
    setLoading(true);
    setError(null);
    try {
      const [current, forecast] = await Promise.all([
        getWeather(searchCity),
        getForecast(searchCity),
      ]);
      setWeatherData(current);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const [current, forecast] = await Promise.all([
        getWeatherByCoordinates(lat, lon),
        getForecastByCoordinates(lat, lon),
      ]);
      setCity(current.name); // Update city name from response
      setWeatherData(current);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchDataByCoords(latitude, longitude);
        },
        (err) => {
          setLoading(false);
          setError('Location access denied. Please enable location services.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };


  useEffect(() => {
    fetchData(city);
  }, []);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchData(searchCity);
  };

  const renderContent = () => {
    if (loading) return <div className="loader"></div>;
    if (error) return <div className="error-msg">{error}</div>;

    switch (activeTab) {
      case 'current':
        return (
          <CurrentWeather
            data={weatherData}
            unit={unit}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        );
      case 'history':
        return <HistoryWeather data={forecastData} unit={unit} />;
      case 'features':
        return <ApiFeatures />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <Stopwatch />
      <div className="dashboard-container">
        <header className="app-header">
          <h1>Weather Dashboard</h1>
        </header>

        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          unit={unit}
          toggleUnit={toggleUnit}
          favorites={favorites}
          onSearch={handleSearch}
        />

        <SearchBar onSearch={handleSearch} onLocationSearch={handleLocationSearch} />

        <main className="content-area">
          {renderContent()}
        </main>
      </div>
    </>
  );
}

export default App;
