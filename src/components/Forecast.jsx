import React from 'react';
import { List, Card } from 'semantic-ui-react';
import Moment from 'moment';

const Forecast = ({ weatherData }) => {
  const { list } = weatherData;

  return (
    <List>
      {list.map((day) => {
        const { main, weather } = day;
        const iconUrl = `${process.env.REACT_APP_API_URL}/img/wn/${weather[0].icon}@2x.png`;

        return (
          <Card key={day.dt}>
            <Card.Content>
              <Card.Header>{Moment(day.dt * 1000).format('dddd')}</Card.Header>
              <Card.Meta>{weather[0].description}</Card.Meta>
            </Card.Content>
            <Card.Image src={iconUrl} />
            <Card.Content>
              <Card.Header>{main.temp}°F</Card.Header>
            </Card.Content>
          </Card>
        );
      })}
    </List>
  );
};

export default Forecast;
