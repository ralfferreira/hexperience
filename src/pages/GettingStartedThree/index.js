import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Dino from '../../assets/img/dino2.png';
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
        <StartView onPress={() => { navigation.navigate('SignUp') }}>
          <StartText>Começe agora</StartText>
        </StartView>
      </Start>

      <Sign>
        <SignView onPress={() => { navigation.navigate('Login') }}>
          <SignText>Entrar</SignText>
        </SignView>
      </Sign>

    </Container>
  );
};

export default GettingStartedThree;
