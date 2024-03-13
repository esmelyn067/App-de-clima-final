import React from 'react';
import { List, Card } from 'semantic-ui-react';
import Moment from 'moment';

const ApiKEY = '3a140248970a01e6fa79ee2a4e6d0bcd';
const prueba = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`

const Forecast = ({ weather }) => {
  const { list } = weather;

  return (
    <List>
      {list.map((day) => {
        const { main, weather } = day;
        const iconUrl = `${ApiKEY}/img/wn/${weather[0].icon}@2x.png`;

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