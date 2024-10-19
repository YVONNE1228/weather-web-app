import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch, error, getCity, getCountry }) => {
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [Errors, setErrors] = useState(false);
  useEffect(() => {
    if (![getCity, getCountry].includes(null)) {
      setCity(getCity);
      setCountry(getCountry);
    }
  }, [getCity, getCountry]);

  return (
    <>
      <div className="search-bar">
        <TextField
          required
          label="City"
          value={city}
          defaultValue={getCity}
          color="white"
          focused
          fullWidth
          onChange={(e) => {
            setCity(e.target.value);
            setErrors(false);
          }}
          error={Errors || error}
          helperText={!Errors ? "" : error}
        />
        <TextField
          required
          label="Country"
          value={country}
          defaultValue={getCountry}
          onChange={(e) => {
            setCountry(e.target.value);
            setErrors(false);
          }}
          color="white"
          focused
          fullWidth
          error={Errors || error}
          helperText={!Errors ? "" : error}
        />
        <Button
          className="MuiButton-root"
          onClick={() => {
            if (city && country) {
              onSearch(city, country);
            } else {
              setErrors(true);
            }
          }}
        >
          <SearchIcon style={{ color: "white" }} />{" "}
        </Button>
      </div>
    </>
  );
};

export default SearchBar;
