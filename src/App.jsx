// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
 
function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'f09ba23a9058b09557c5122cea65f085'; // Get your API key from a weather service provider

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div className="weather-container">
          <div className="weather-info">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p><i className="fas fa-thermometer-half"></i> Temperature: {weatherData.main.temp}°C</p>
            <p><i className="fas fa-tint"></i> Humidity: {weatherData.main.humidity}%</p>
            <p><i className="fas fa-wind"></i> Wind Speed: {weatherData.wind.speed} m/s</p>
            <p><i className="fas fa-eye"></i> Visibility: {weatherData.visibility / 1000} km</p>
          </div>
          <div className="date-time">
            <h2>{formatDate(weatherData.dt)}</h2>
            {/* You can add time here if required */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;