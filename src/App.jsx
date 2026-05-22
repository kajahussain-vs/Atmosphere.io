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
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('owm_api_key') || '');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    localStorage.setItem('owm_api_key', apiKey);
  }, [apiKey]);

  const handleSearch = async (city) => {
    if (!apiKey) {
      setError('Please enter an OpenWeatherMap API key to continue.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchCurrentWeather(city, apiKey);
      const forecastData = await fetchForecast(city, apiKey);
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

        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="w-full max-w-md relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
            <div className="relative glass p-1 rounded-xl flex items-center gap-2">
              <div className="pl-3 text-white/40">
                <AlertCircle size={18} />
              </div>
              <input
                type={showKey ? "text" : "password"}
                placeholder="Enter OpenWeatherMap API Key..."
                className="bg-transparent border-none focus:ring-0 text-white text-sm w-full py-2"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="pr-3 text-white/40 hover:text-white/70 transition-colors"
                type="button"
              >
                {showKey ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-6 animate-in fade-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/30 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <div className="relative bg-[#1e1b4b]/80 p-8 rounded-3xl border border-white/10 glass shadow-2xl">
                <Loader2 className="text-purple-400 animate-spin" size={48} />
              </div>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-white font-medium tracking-widest uppercase text-xs opacity-50">Synchronizing</p>
              <p className="text-white/90 text-xl font-light tracking-wide">Fetching atmospheric data...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-xl mx-auto mb-12 overflow-hidden rounded-2xl border border-red-500/50 bg-red-950/30 backdrop-blur-md shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)]">
            <div className="flex items-stretch">
              <div className="bg-red-500 px-6 flex items-center justify-center">
                <AlertCircle size={32} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-red-400 font-bold text-lg mb-1">Weather Service Error</h3>
                <p className="text-red-100/80 leading-relaxed">
                  {error}
                </p>
              </div>
            </div>
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
