import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const CITY = "Budapest";
const LAT = 47.4979;
const LON = 19.0402;

interface WeatherData {
  dt: number;
  temp: number;
  humidity: number;
  weather: { description: string }[];
}

// Mock data
const mockWeatherData: WeatherData = {
  dt: Date.now() / 1000,
  temp: 22.5,
  humidity: 65,
  weather: [{ description: "Partly cloudy" }],
};

const WeatherWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setWeatherData(mockWeatherData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <WidgetContainer>Loading...</WidgetContainer>;
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
