import React, { useState, useEffect } from 'react';
import UnitSelector from './UnitSelector';
import './App.css';
import Forecast from './Forecast';

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
  const [forecast, setForecast] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const temp = Math.round(weather.main?.temp);
  const convertedTemp = unit === 'metric' ? temp : Math.round((temp * 9/5) + 32);

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
      fetchForecast(data.coord.lat, data.coord.lon);
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
        console.log(`${latitude},${longitude}`);
      }, (error) => {
        console.error('Error getting geolocation:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchForecast = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`);
    const data = await response.json();
    setForecast(data.list);
  };

  useEffect(() => {
    getLocation();
    setCurrentTime(new Date().toLocaleTimeString());
  }, [unit]);

  const handleChangeUnit = (e) => {
    setUnit(e.target.value);
  };

  const handleDaySelect = (date) => {
    setSelectedDate(date);
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
      <div className='App'>
      {(typeof weather.main !== 'undefined') ? (
        <div className="weather-box">
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{new Date().toLocaleDateString()}</div>
            <div className="time">{currentTime}</div>
            <div className='image'>
              {imageURL && <img src={imageURL} alt="City" className="city-image" />}
            </div>
          </div>
          <div className="temperature">
            {convertedTemp}°{unit === 'metric' ? 'C' : 'F'}
          </div>
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
      ) : ('')}
      <div>
        {forecast.length > 0 && (
        <Forecast forecast={forecast} windIcon={windIcon} humidityIcon={humidityIcon} unit={unit}/>
      )}
     </div>
    </div>
     
    </div>
  );

}

export default Weather;
