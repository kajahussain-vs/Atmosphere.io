import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather data for a given city.
 * @param {string} city - The city name.
 * @param {string} apiKey - OpenWeatherMap API Key.
 * @returns {Promise<Object>} The weather data.
 */
export const fetchCurrentWeather = async (city, apiKey) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches 5-day forecast data for a given city.
 * @param {string} city - The city name.
 * @param {string} apiKey - OpenWeatherMap API Key.
 * @returns {Promise<Object>} The forecast data.
 */
export const fetchForecast = async (city, apiKey) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
