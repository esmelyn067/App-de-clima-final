import React from 'react';
import './App.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Forecast({ forecast, unit, windIcon, humidityIcon }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="forecast-container">
      <h2 className="forecast-heading">Forecast</h2>
      <div className="slider-container">
        <Slider {...settings}>
          {forecast.map((item, index) => {
            const temp = Math.round(item.main?.temp);
            const convertedTemp = unit === 'metric' ? temp : Math.round((temp * 9/5) + 32);
            return (
              <div key={index} className="forecast-item">
                <div className="date">{new Date(item.dt * 1000).toLocaleDateString()}</div>
                <div className="time">{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="temperature">
                  {convertedTemp}°{unit === 'metric' ? 'C' : 'F'}
                </div>
                <div className="weather">{item.weather[0].main}</div>
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
          })}
        </Slider>
      </div>
    </div>
  );
}

export default Forecast;
