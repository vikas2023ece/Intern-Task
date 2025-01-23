import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import FakeWeatherData from "./components/FakeWeatherData";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
    // Simulating an API response with fake data
    const data = FakeWeatherData.find((data) => data.name.toLowerCase() === city.toLowerCase());
    if (data) {
      setWeather(data);
    } else {
      alert("City not found in fake data.");
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default App;