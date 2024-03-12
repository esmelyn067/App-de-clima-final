import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const Settings = ({ units, onUnitsChange }) => {
  const options = [
    {
      key: 'metric',
      text: 'Metric',
      value: 'metric',
    },
    {
      key: 'imperial',
      text: 'Imperial',
      value: 'imperial',
    },
  ];

  return (
    <Dropdown
      placeholder="Select units"
      fluid
      selection
      options={options}
      value={units}
      onChange={onUnitsChange}
    />
  );
};

export default Settings;
