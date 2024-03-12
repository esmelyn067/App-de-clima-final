import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import Settings from './Settings';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState('metric');

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/weather?q=${location}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`);
      const data = await response.json();
      setWeatherData(data);
    };

    if (location) {
      fetchWeatherData();
    }
  }, [location, units]);

  const handleSearch = (city) => {
    setLocation(city);
  };

  const handleUnitsChange = (e) => {
    setUnits(e.target.value);
  };

  return (
    <div>
      <Searchbar onSearch={handleSearch} />
      {weatherData && (
        <>
          <CurrentWeather weatherData={weatherData} />
          <Forecast weatherData={weatherData} />
        </>
      )}
      <Settings units={units} onUnitsChange={handleUnitsChange} />
    </div>
  );
};

export default App;
