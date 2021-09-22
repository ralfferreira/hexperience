import React from 'react'
import { Container, ButtonText } from './styles';

const SignButton = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{(children)}</ButtonText>
    </Container>
  );
};

export default SignButton;
