import React from 'react';
import { Container, Option, OptionTitle } from './styles';

const SettingsOptions = ({name}) => {
  return (
    <Container>
      <Option>
        <OptionTitle>{(name)}</OptionTitle>
      </Option>
    </Container>
  );
};

export default SettingsOptions;
