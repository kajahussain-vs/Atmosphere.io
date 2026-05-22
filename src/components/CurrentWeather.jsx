import React from 'react';
import { Wind, Droplets, Thermometer, MapPin } from 'lucide-react';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const { name, main, weather, wind, sys } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-white mb-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-purple-300 mb-2 font-medium">
            <MapPin size={18} />
            <span className="tracking-wide uppercase text-sm">{name}, {sys.country}</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-extrabold mb-2 tracking-tighter bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            {Math.round(main.temp)}°
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <p className="text-xl md:text-2xl text-white/80 capitalize font-medium">
              {weather[0].description}
            </p>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20"></div>
            <p className="text-xl md:text-2xl text-white/50 font-light">
              H: {Math.round(main.temp_max)}° L: {Math.round(main.temp_min)}°
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500" />
          <img
            src={iconUrl}
            alt={weather[0].description}
            className="w-40 h-40 md:w-56 md:h-56 relative animate-pulse-slow"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10">
        <div className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/5">
          <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-300">
            <Thermometer size={24} />
          </div>
          <div>
            <p className="text-white/50 text-sm">Feels Like</p>
            <p className="text-xl font-semibold">{Math.round(main.feels_like)}°</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/5">
          <div className="p-3 bg-cyan-500/20 rounded-2xl text-cyan-300">
            <Droplets size={24} />
          </div>
          <div>
            <p className="text-white/50 text-sm">Humidity</p>
            <p className="text-xl font-semibold">{main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/5">
          <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-300">
            <Wind size={24} />
          </div>
          <div>
            <p className="text-white/50 text-sm">Wind Speed</p>
            <p className="text-xl font-semibold">{wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
