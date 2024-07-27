import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sun, Cloud, CloudRain } from "lucide-react";

const CITY = "Budapest";
const API_KEY = "YOUR_API_KEY_HERE";
const LAT = 47.4979;
const LON = 19.0402;

const WeatherIcon = ({ condition }) => {
  switch (condition) {
    case "Clear":
      return <Sun />;
    case "Clouds":
      return <Cloud />;
    case "Rain":
      return <CloudRain />;
    default:
      return <Cloud />;
  }
};

const HourlyWeatherWidget = () => {
  const [weatherData, setWeatherData] = React.useState(null);

  React.useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const hourlyData = weatherData.list.slice(0, 24).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      hour12: false,
    }),
    temp: Math.round(item.main.temp),
    condition: item.weather[0].main,
  }));

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">{CITY} - Hourly Forecast</h2>
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
        <div className="mt-4 grid grid-cols-8 gap-2">
          {hourlyData.map((hour, index) => (
            <div key={index} className="text-center">
              <div>{hour.time}</div>
              <WeatherIcon condition={hour.condition} />
              <div>{hour.temp}°C</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyWeatherWidget;
