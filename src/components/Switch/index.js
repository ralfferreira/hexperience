import React from 'react';
import { Switch } from 'react-native'
import { Container } from './styles';

const SwitchComponent = () => {
  const [isSwitchEnabled, setSwitch] = React.useState(false)
  return (
    <Container>
      <Switch
      value={isSwitchEnabled}
      onValueChange={(value) => setSwitch(value) }
      // trackColor={{true: 'red'}}
      />
    </Container>
  );
};

export default SwitchComponent;
