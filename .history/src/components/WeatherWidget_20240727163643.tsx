import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

const WidgetContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const WeatherInfo = styled.div`
  margin-top: 20px;
`;

const DayForecast = styled.div`
  border-top: 1px solid #ccc;
  padding: 10px 0;
`;

const CITY = "Budapest";
const API_KEY = "fe834ece9c3da2d7f6ff7c59b4f47d10";
const LAT = 47.4979;
const LON = 19.0402;

interface WeatherData {
  list: Array<{
    dt: number;
    main: { temp: number; humidity: number };
    weather: Array<{ description: string }>;
  }>;
}

const fetchWeatherData = async (): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
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

  // Group forecast data by day
  const dailyForecasts = weatherData?.list.reduce((acc, forecast) => {
    const date = new Date(forecast.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = forecast;
    }
    return acc;
  }, {} as Record<string, WeatherData["list"][0]>);

  return (
    <WidgetContainer>
      <h2>5-Day Forecast for {CITY}</h2>
      <WeatherInfo>
        {dailyForecasts &&
          Object.entries(dailyForecasts).map(([date, forecast]) => (
            <DayForecast key={date}>
              <h3>{date}</h3>
              <p>Temperature: {forecast.main.temp.toFixed(1)}°C</p>
              <p>Humidity: {forecast.main.humidity}%</p>
              <p>Conditions: {forecast.weather[0].description}</p>
            </DayForecast>
          ))}
      </WeatherInfo>
    </WidgetContainer>
  );
};

export default WeatherWidget;
