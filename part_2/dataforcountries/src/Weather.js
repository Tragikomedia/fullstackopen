import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({
    temp: 0,
    icon: "01d",
    description: "sunny day",
    windSpeed: 6.62,
    windDeg: 360,
  });

  // useCallback is used to memoize the function so that it will not be redeclared in next renders
  const getWeather = useCallback(async () => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const newWeather = {
      temp: Math.round(data.main.temp - 273.15),
      icon: data.weather[0].icon,
      description: data.weather[0].description,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
    };
    setWeather(newWeather);
  }, [capital]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature: {weather.temp} C</p>
      <img
        src={`http://openweathermap.org/img/w/${weather.icon}.png`}
        alt={weather.description}
      />
      <p>
        wind: {weather.windSpeed} km/h degree {weather.windDeg}
      </p>
    </div>
  );
};

export default Weather;
