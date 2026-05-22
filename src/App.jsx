import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { fetchCurrentWeather, fetchForecast } from './services/weatherService';
import { CloudRainWind, Loader2, AlertCircle } from 'lucide-react';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Using a placeholder API key - in a real app this would be an env variable
  const API_KEY = 'YOUR_API_KEY_HERE';

  const handleSearch = async (city) => {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
      setError('Please provide a valid OpenWeatherMap API key in App.jsx');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchCurrentWeather(city, API_KEY);
      const forecastData = await fetchForecast(city, API_KEY);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data. Please check the city name.');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-500/20">
              <CloudRainWind className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Atmosphere.io</h1>
          </div>
          <p className="text-white/40 max-w-md mx-auto">
            Experience premium weather tracking with real-time updates and precise 5-day forecasts.
          </p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="text-purple-500 animate-spin" size={48} />
            <p className="text-white/50 animate-pulse">Fetching atmospheric data...</p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-center gap-4 text-red-400 mb-8">
            <AlertCircle size={24} />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && !weather && (
          <div className="text-center py-20 opacity-20">
            <CloudRainWind size={120} className="mx-auto mb-6 text-white" />
            <p className="text-2xl text-white font-light">Search for a city to see the weather</p>
          </div>
        )}

        {!loading && weather && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <CurrentWeather data={weather} />
            <Forecast data={forecast} />
          </div>
        )}

        <footer className="mt-20 text-center text-white/20 text-sm">
          <p>&copy; 2024 Atmosphere.io • Powered by OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
