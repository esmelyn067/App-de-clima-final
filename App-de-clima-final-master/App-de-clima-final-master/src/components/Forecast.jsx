import React from 'react';
import './App.css';

function Forecast({ forecast, unit }) {
  return (
    <div className="forecast-container">
      <h2 className="forecast-heading">Forecast</h2>
      <div className="forecast-list">
        {forecast.map((item, index) => (
          <div key={index} className="forecast-item">
            <div className="date">{new Date(item.dt * 1000).toLocaleDateString()}</div>
            <div className="time">{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="temperature">
              {Math.round(item.main.temp)}
              <span className="temperature-unit">{unit === 'metric' ? '°C' : '°F'}</span>
            </div>
            <div className="weather">{item.weather[0].main}</div>
            <div className="details">
              <div className="humidity">
                <img src="/humidity-icon.png" alt="Humidity Icon" className="icon" />
                <p>{item.main.humidity}%</p>
              </div>
              <div className="wind-speed">
                <img src="/wind-icon.png" alt="Wind Icon" className="icon" />
                <p>{item.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
              </div>
            </div>
            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="Weather Icon" className="weather-icon" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
