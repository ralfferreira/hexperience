import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useConnection } from '../../hooks/connection';

import Dino from '../../assets/img/dino3.jpg';
import SelectGreen from '../../assets/img/select-green.png';
import SelectGray from '../../assets/img/select-gray.png';

import { 
  Container,
  DinoImage,
  Title,
  Subtitle,
  LandingNavigation,
  Select,
  Start,
  StartView,
  StartText,
  Sign,
  SignView,
  SignText 
} from './styles';

const GettingStartedThree = () => {
  const navigation = useNavigation();
  const { handleFirstTime } = useConnection();

  const handleNavigation = useCallback((page) => {
    handleFirstTime().then(() => navigation.navigate(page));
  }, [navigation, handleFirstTime]);

  return (
    <Container>
      <DinoImage source={Dino} />
      <Title>Vamos começar!</Title>
      <Subtitle>Cadastre-se ou entre em sua conta para ter acesso às experiência</Subtitle>
      <LandingNavigation>
        <Select source={SelectGray} />
        <Select source={SelectGray} />
        <Select source={SelectGreen} />
      </LandingNavigation>

      <Start>
        <StartView onPress={() => handleNavigation('SignUp')}>
          <StartText>Começe agora</StartText>
        </StartView>
      </Start>

      <Sign>
        <SignView onPress={() => handleNavigation('Login')}>
          <SignText>Entrar</SignText>
        </SignView>
      </Sign>

    </Container>
  );
};

export default GettingStartedThree;
