import React, { useState, useEffect } from "react";
import "./styles/App.css";
import WeatherDisplay from "./components/WeatherDisplay";
import SearchHistory from "./components/SearchHistory";
import SearchBar from "./components/SearchBar";
import NoRecord from "./components/NoRecord";

const customFormat = require("./Utils/customDateTimeUtils");
const API_KEY = process.env.REACT_APP_API_KEY; // Replace with your OpenWeatherAPI key

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [warning, setWarning] = useState("");

  const currentDateTime = customFormat(new Date());
  const [searchHistory, setSearchHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("weatherSearchHistory")) || [];
  });

  const fetchWeather = async (city, country) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setWarning("Invalid city or country. Please try again.");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        addHistory(data.name, data.sys.country);

        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setWeatherData(null);
      });
  };

  const fetchCurrentLocationWeather = async (lat, lon) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch weather data.");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        setWeatherData(null);
      });
  };
  // Add search to history
  const addHistory = (city, country) => {
    const newHistory = [
      ...searchHistory,
      { city, country, date: currentDateTime },
    ];
    setSearchHistory(newHistory);
    localStorage.setItem("weatherSearchHistory", JSON.stringify(newHistory));
  };

  // Delete search history
  const deleteHistory = (index) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    localStorage.setItem(
      "weatherSearchHistory",
      JSON.stringify(updatedHistory)
    );
  };

  // Search weather from history
  const searchHistoryWeather = (city, country) => {
    setCountry(country);
    setCity(city);
    fetchWeather(city, country);
  };

  const handleSearch = (city, country) => {
    fetchWeather(city, country);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("position", position);
          // Fetch weather using latitude and longitude
          fetchCurrentLocationWeather(latitude, longitude);
        },
        (error) => {
          setWarning(
            "Unable to retrieve your location to access weather information."
          );
        }
      );
    } else {
      setWarning("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation(); // Fetch weather on component mount
  }, []);

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        error={error}
        getCity={city}
        getCountry={country}
      />
      {!weatherData && <NoRecord errorMessage={warning} />}

      {weatherData && <WeatherDisplay weatherData={weatherData} />}

      {searchHistory?.length > 0 && (
        <SearchHistory
          searchHistory={searchHistory}
          searchHistoryWeather={searchHistoryWeather}
          deleteHistory={deleteHistory}
        />
      )}
    </div>
  );
}
// Attempt to close the window or tab
// Clear local storage
window.close();
localStorage.clear();

export default App;
