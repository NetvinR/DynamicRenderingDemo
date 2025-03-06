"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  interface WeatherData {
    hourly: {
      temperature_2m: number[];
      time: string[];
    };
  }

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.get('/api/weather', {
          params: {
            latitude: 52.52,
            longitude: 13.419998,
          },
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div>
      <h1>Current Weather</h1>
      {weatherData ? (
        <div>
          <p>Temperature: {weatherData.hourly.temperature_2m[0]}°C</p>
          <p>Time: {weatherData.hourly.time[0]}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}