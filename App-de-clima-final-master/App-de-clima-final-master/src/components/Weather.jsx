
import React, { useState, useEffect } from 'react';
import UnitSelector from './UnitSelector';
import './App.css'

const API_KEY = '3a140248970a01e6fa79ee2a4e6d0bcd'; 
const UNSPLASH_ACCESS_KEY = '2Pklo33OVyOYqBJgAMtFijR2hYhVE1tET1Vjj-LNyUw'; 
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState('metric');
  const [imageURL, setImageURL] = useState('');
  const [iconURL, setIconURL] = useState('');
  const [humidityIcon, setHumidityIcon] = useState('');
  const [windIcon, setWindIcon] = useState('');

  const search = async (e) => {
    if (e.key === 'Enter') {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${API_KEY}`);
      const data = await response.json();
      setWeather(data);
      setQuery('');
      fetchCityImage(data.name);
      fetchWeatherIcon(data.weather[0].icon);
      fetchHumidityIcon();
      fetchWindIcon();
    }
  };

  const fetchCityImage = async (city) => {
    try {
      const response = await fetch(`${UNSPLASH_BASE_URL}/search/photos?page=1&query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`);
      const data = await response.json();
      if (data.results.length > 0) {
        setImageURL(data.results[0].urls.regular);
      } else {
        setImageURL(''); 
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const fetchWeatherIcon = async (iconName) => {
    const iconBaseUrl = 'http://openweathermap.org/img/wn/';
    setIconURL(`${iconBaseUrl}${iconName}@2x.png`);
  };

  const fetchHumidityIcon = () => {
    setHumidityIcon('../../public/icons/humidity.png');
  };

  const fetchWindIcon = () => {
    
    setWindIcon('../../public/icons/Wind.png');
  };

 const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchWeatherData(`${latitude},${longitude}`);
      }, (error) => {
        console.error('Error getting geolocation:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  useEffect(() => {
    getLocation();
  }, [unit]);

  const handleChangeUnit = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar ciudad..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
       <UnitSelector unit={unit} handleChangeUnit={handleChangeUnit} />
      </div>
      {(typeof weather.main != 'undefined') ? (
          <div className="weather-box">
           <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{new Date().toLocaleDateString()}</div>
            <div className='image'>
            {imageURL && <img src={imageURL} alt="City" className="city-image" />}
           </div>
            
          </div>
            <div className="temperature">{Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</div>
            <div className="weather">{weather.weather[0].main}</div>
            <div className="details">
              <div className="humidity">
                <img src={humidityIcon} alt="Humidity Icon" className="icon" />
                <p>Humedad: {weather.main.humidity}%</p>
              </div>
              <div className="wind-speed">
                <img src={windIcon} alt="Wind Icon" className="icon" />
                <p>Viento: {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
              </div>
            </div>
            {iconURL && <img src={iconURL} alt="Weather Icon" className="weather-icon" />}
          </div>
        </div>
      ) : ('')}
      
    </div>
  );
}

export default Weather;
