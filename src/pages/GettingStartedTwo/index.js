import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, DinoImage, Title, Subtitle, LandingNavigation, Select, Next, NextView, NextText, Skip, SkipView, SkipText } from './styles';
import Dino from '../../assets/img/dino2.png';
import SelectGreen from '../../assets/img/select-green.png';
import SelectGray from '../../assets/img/select-gray.png';
const GettingStartedTwo = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <DinoImage source={Dino} />
      <Title>Divulgue seu trabalho!</Title>
      <Subtitle>Torne-se um Anfitrião e proporcione experiências!</Subtitle>
      <LandingNavigation>
        <Select source={SelectGray} />
        <Select source={SelectGreen} />
        <Select source={SelectGray} />
      </LandingNavigation>

      <Next>
        <NextView  
        onPress={() => {
        navigation.navigate('GettingStartedThree')
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

export default GettingStartedTwo;
