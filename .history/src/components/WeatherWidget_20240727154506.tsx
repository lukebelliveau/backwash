import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const WidgetContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  max-width: 300px;
  margin: 0 auto;
`;

const WeatherInfo = styled.div`
  margin-top: 20px;
`;

const API_KEY = "1c11a74a9b3f689b76a30ddb09e11a69";
const CITY = "Budapest";
const LAT = 47.4979;
const LON = 19.0402;

interface WeatherData {
  dt: number;
  temp: number;
  humidity: number;
  weather: { description: string }[];
}

const WeatherWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`
        );
        setWeatherData({
          dt: response.data.dt,
          temp: response.data.main.temp,
          humidity: response.data.main.humidity,
          weather: response.data.weather,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Error fetching weather data. Please try again later.");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <WidgetContainer>Loading...</WidgetContainer>;
  }

  if (error) {
    return <WidgetContainer>{error}</WidgetContainer>;
  }

  return (
    <WidgetContainer>
      <h2>Current Weather in {CITY}</h2>
      {weatherData && (
        <WeatherInfo>
          <p>Date: {new Date(weatherData.dt * 1000).toLocaleDateString()}</p>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Conditions: {weatherData.weather[0].description}</p>
        </WeatherInfo>
      )}
    </WidgetContainer>
  );
};

export default WeatherWidget;
