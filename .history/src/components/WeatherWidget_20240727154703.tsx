import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

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

interface WeatherData {
  dt: number;
  temp: number;
  humidity: number;
  weather: { description: string }[];
}

const mockWeatherData: WeatherData = {
  dt: Date.now() / 1000,
  temp: 22.5,
  humidity: 65,
  weather: [{ description: "Partly cloudy" }],
};

const fetchWeatherData = async (): Promise<WeatherData> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockWeatherData;
};

const WeatherWidget: React.FC = () => {
  const {
    data: weatherData,
    isLoading,
    error,
  } = useQuery<WeatherData, Error>({
    queryKey: ["weatherData"],
    queryFn: fetchWeatherData,
  });

  if (isLoading) {
    return <WidgetContainer>Loading...</WidgetContainer>;
  }

  if (error) {
    return <WidgetContainer>{error.message}</WidgetContainer>;
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
