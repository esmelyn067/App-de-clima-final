import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const CurrentWeather = ({ weatherData }) => {
  const { main, weather } = weatherData;
  const iconUrl = `${process.env.REACT_APP_API_URL}/img/wn/${weather[0].icon}@2x.png`;

  return (
    <Card>
      <Image src={iconUrl} />
      <Card.Content>
        <Card.Header>{main.temp}°F</Card.Header>
        <Card.Meta>{weather[0].description}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default CurrentWeather