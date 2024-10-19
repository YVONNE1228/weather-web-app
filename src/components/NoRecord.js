import React from "react";
import "../styles/index.css"; // Import the CSS styles
import CloudSun from "../assets/sun.png"; // Import the image

const NoRecord = ({ errorMessage }) => {
  return (
    <div className="weather-card">
      <div className="weather-info">
        <p className="range">Today's Weather</p>
        <div className="message">
          <i className="fas fa-exclamation-circle"></i>
          <h2>No Record Found</h2>
          <p>{errorMessage}</p>
          {/* <p>Please enable location permissions to access weather information.</p> */}
        </div>
        <div className="weather-display">
          <img src={CloudSun} alt="Weather Icon" className="weather-icon" />
        </div>
      </div>
    </div>
  );
};

export default NoRecord;
