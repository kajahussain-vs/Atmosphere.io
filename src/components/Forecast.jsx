import React from 'react';

const Forecast = ({ data }) => {
  if (!data) return null;

  // Filter for one forecast per day (around noon)
  const dailyForecast = data.list.filter((item) => item.dt_txt.includes('12:00:00'));

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-6 pl-4 border-l-4 border-purple-500">5-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {dailyForecast.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-2 hover:bg-white/10 transition-all duration-300 group shadow-lg"
            >
              <p className="text-white/60 font-medium uppercase text-xs tracking-widest">{dayName}</p>
              <img
                src={iconUrl}
                alt={day.weather[0].description}
                className="w-16 h-16 group-hover:scale-110 transition-transform"
              />
              <p className="text-2xl font-bold text-white">{Math.round(day.main.temp)}°</p>
              <p className="text-xs text-white/40 capitalize text-center leading-tight">
                {day.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
