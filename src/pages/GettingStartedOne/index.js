import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, DinoImage, Title, Subtitle, LandingNavigation, Select, Next, NextView, NextText, Skip, SkipView, SkipText } from './styles';
import Dino from '../../assets/img/dino1.png';
import SelectGreen from '../../assets/img/select-green.png';
import SelectGray from '../../assets/img/select-gray.png';
const GettingStartedOne = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <DinoImage source={Dino} />
      <Title>Seja bem-vindo(a) ao Hexperience</Title>
      <Subtitle>Por aqui você conhecerá diversos lugares e pessoas incríveis!</Subtitle>
      <LandingNavigation>
        <Select source={SelectGreen} />
        <Select source={SelectGray} />
        <Select source={SelectGray} />
      </LandingNavigation>

      <Next>
        <NextView  
        onPress={() => {
        navigation.navigate('GettingStartedTwo')
        }}>
        <NextText>
        Próximo
        </NextText>
        </NextView>
      </Next>

      <Skip>
        <SkipView  
        onPress={() => {
        navigation.navigate('GettingStartedThree')
        }}>
        <SkipText>
        Pular
        </SkipText>
        </SkipView>
      </Skip>

    </Container>
  );
};

export default GettingStartedOne;
