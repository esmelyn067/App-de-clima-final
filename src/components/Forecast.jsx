import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

function Forecast({ city, unit }) {
  const [forecastData, setForecastData] = useState([]);
  const [windIcon, setWindIcon] = useState('');
  const [humidityIcon, setHumidityIcon] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=${unit}`);
      const data = await response.json();
      setForecastData(data.list);
      setWindIcon(`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`);
      setHumidityIcon(`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`);
    };
    fetchData();
  }, [city, unit]);

  const renderForecastItem = (item, index) => {
    const date = new Date(item.dt * 1000);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const temperature = Math.round(item.main.temp);
    const weatherDescription = item.weather[0].main;

    return (
      <div key={index} className="forecast-item">
        <div className="date">{date.toLocaleDateString()}</div>
        <div className="time">{time}</div>
        <div className="temperature">
          {temperature}
          <span className="temperature-unit">{unit === 'metric' ? '°C' : '°F'}</span>
        </div>
        <div className="weather">{weatherDescription}</div>
        <div className="details">
          <div className="humidity">
            <img src={humidityIcon} alt="Humidity Icon" className="icon" />
            <p>{item.main.humidity}%</p>
          </div>
          <div className="wind-speed">
            <img src={windIcon} alt="Wind Icon" className="icon" />
            <p>{item.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
          </div>
        </div>
        <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="Weather Icon" className="weather-icon" />
      </div>
    );
  };

  return (
    <div className="forecast-container">
      <h2 className="forecast-heading">Forecast</h2>
      <div className="forecast-list">
        {forecastData.map(renderForecastItem)}
      </div>
    </div>
  );
}

export default Forecast;
