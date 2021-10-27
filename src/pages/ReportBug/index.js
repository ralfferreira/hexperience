import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';

import { 
  Container,
  Title,
  AlignForm,
  InputTitle,
  DetailsInputScreen,
  DetailsInput,
  SaveBtn,
  SaveBtnText,
  SaveBtnView
} from './styles';

const ReportBug = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <HeaderWithoutSearch>Reportar Problema</HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Title>Nos ajude a melhorar sua experiência com o app! Nos diga o que aconteceu e faremos o possível para ajudar.</Title>
        <AlignForm>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            enabled
          />
          <InputTitle>Em qual tela o problema ocorreu?</InputTitle>
          <DetailsInputScreen 
            autoCapitalize="words"
            name="screen-problem"
            placeholder="Tela de Login"
            placeholderTextColor="gray"
            maxLength={50}
          />
          <InputTitle>O que ocorreu?</InputTitle>
          <DetailsInput
            autoCapitalize="words"
            name="problem"
            placeholder="Dinossauro saiu voando e não reapareceu 😞"
            placeholderTextColor="gray"
            maxLength={300}
          />
          <InputTitle>Quais passos realizou antes do problema acontecer?</InputTitle>
          <DetailsInput
            autoCapitalize="words"
            name="steps"
            placeholder=""
            maxLength={300}
          />
          <SaveBtn>
            <SaveBtnView onPress={() => { navigation.navigate('Home') }}>
              <SaveBtnText>Enviar</SaveBtnText>
            </SaveBtnView>
          </SaveBtn>
        </AlignForm>
      </ScrollView>
    </Container>
  );
};

export default ReportBug;
