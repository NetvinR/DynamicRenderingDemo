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
          {weatherData.hourly.time.map((time, index) => (
            <div key={index}>
              <p>Time: {time}</p>
              <p>Temperature: {weatherData.hourly.temperature_2m[index]}°C</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}