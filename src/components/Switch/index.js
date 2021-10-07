import React from 'react';
import { Switch } from 'react-native'
import { Container } from './styles';

const SwitchComponent = () => {
  const [isSwitchEnabled, setSwitch] = React.useState(false)
  return (
    <Container>
      <Switch
      value={isSwitchEnabled}
      style={{
      paddingTop: 7,
      transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]}}
      onValueChange={(value) => setSwitch(value) }
      trackColor={{true: '#30d158', false:'lightgray'}}
      thumbColor={isSwitchEnabled ? "#f4f3f4" : "#f4f3f4"}
      />
    </Container>
  );
};

export default SwitchComponent;
