import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const CITY = "Budapest";
const API_KEY = "fe834ece9c3da2d7f6ff7c59b4f47d10";
const LAT = 47.4979;
const LON = 19.0402;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
`;

const CardHeader = styled.div`
  margin-bottom: 20px;
`;

const CardContent = styled.div``;

const HourlyForecast = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const HourlyItem = styled.div`
  text-align: center;
`;

const WeatherIcon = ({ condition }) => {
  switch (condition) {
    case "Clear":
      return "☀️";
    case "Clouds":
      return "☁️";
    case "Rain":
      return "🌧️";
    default:
      return "🌤️";
  }
};

const HourlyWeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();

        const filteredData = data.list.filter((item) => {
          const itemDate = new Date(item.dt * 1000).toISOString().split("T")[0];
          return itemDate === selectedDate;
        });

        setWeatherData({ ...data, list: filteredData });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [selectedDate]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const hourlyData = weatherData.list.map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    temp: Math.round(item.main.temp),
    condition: item.weather[0].main,
  }));

  return (
    <Card>
      <CardHeader>
        <h2>{CITY} - Hourly Forecast</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={
            new Date(new Date().setDate(new Date().getDate() + 4))
              .toISOString()
              .split("T")[0]
          }
        />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hourlyData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        <HourlyForecast>
          {hourlyData.map((hour, index) => (
            <HourlyItem key={index}>
              <div>{hour.time}</div>
              <WeatherIcon condition={hour.condition} />
              <div>{hour.temp}°C</div>
            </HourlyItem>
          ))}
        </HourlyForecast>
      </CardContent>
    </Card>
  );
};

export default HourlyWeatherWidget;
