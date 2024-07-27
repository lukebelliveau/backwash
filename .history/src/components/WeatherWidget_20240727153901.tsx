import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const WidgetContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  max-width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const WeatherInfo = styled.div`
  margin-top: 20px;
`;

const API_KEY = "fe834ece9c3da2d7f6ff7c59b4f47d10";
const CITY = "London";

interface WeatherData {
  dt: number;
  temp: number;
  humidity: number;
  weather: { description: string }[];
}

const WeatherWidget: React.FC = () => {
  const [date, setDate] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeather = async () => {
    try {
      const timestamp = Math.floor(new Date(date).getTime() / 1000);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=51.5074&lon=-0.1278&dt=${timestamp}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data.current);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again.");
    }
  };

  return (
    <WidgetContainer>
      <h2>Weather in {CITY}</h2>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
      />
      <Button onClick={fetchWeather}>Get Weather</Button>
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
