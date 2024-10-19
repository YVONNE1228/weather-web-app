import React from "react";
import CloudSun from "../assets/sun.png"; // Import the image
const timezoneFormat = require("../Utils/timezoneUtils");

const WeatherDisplay = ({ weatherData }) => {
  let date = timezoneFormat(new Date(), weatherData?.timezone);
  return (
    <div className="weather-card">
      <div className="weather-info">
        <p className="range">Today's Weather</p>
        <h1 className="temperature">{weatherData.main.temp}°</h1>

        <div className="second-line">
          <p className="range">
            H: {weatherData.main.temp_max}° L: {weatherData.main.temp_min}°
          </p>
          <p className="location">
            {weatherData.name}, {weatherData.sys.country}
          </p>
        </div>

        <div className="line">
          <p className="date-time">{date}</p>
          <p className="condition">Humidity: {weatherData.main.humidity}%</p>
          <p className="description">{weatherData?.weather[0]?.description}</p>
        </div>
      </div>
      <div className="weather-display">
        <img src={CloudSun} alt="Weather Icon" className="weather-icon" />
      </div>
    </div>
  );
};

export default WeatherDisplay;
