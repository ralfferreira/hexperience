import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';

import { 
  Container,
  AlignForm,
  Title,
  Description,
  InputTitle,
  SaveBtn,
  SaveBtnText,
  SaveBtnView,
  DetailsInput 
} from './styles';

const RequestHost = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <HeaderWithoutSearch>Anfitrião</HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Title>Seja um Anfitrião e trabalhe Conosco!</Title>
        <Description>Um anfitrião tem permissão para proporcionar e divulgar experiências em nossa plataforma.</Description>
        <AlignForm>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            enabled
          />
          <InputTitle>Apelido</InputTitle>
          <DetailsInput 
            autoCapitalize="words"
            name="surname"
            placeholder="Coloque um Apelido bem legal"
            maxLength={150}
          />
          <InputTitle>CPF</InputTitle>
          <DetailsInput
            name="cpf"
            maxLength={11}
            keyBoardType={'numeric'}
            placeholder="000.000.000-00"
            placeholderTextColor="gray"
          />
          <InputTitle>CNPJ</InputTitle>
          <DetailsInput
            name="cnpj"
            maxLength={14}
            placeholder="000.000.000-00"
            placeholderTextColor="gray"
            keyBoardType={'numeric'}
          />
          <InputTitle>CEP</InputTitle>
          <DetailsInput
            name="cep"
            maxLength={8}
            keyBoardType={'numeric'}
            placeholder="00066-000"
            placeholderTextColor="gray"
          />
          <SaveBtn>
            <SaveBtnView onPress={() => { navigation.navigate('AuthRoute') }}>
              <SaveBtnText>Enviar</SaveBtnText>
            </SaveBtnView>
          </SaveBtn>
        </AlignForm>
      </ScrollView>
    </Container>
  );
};

export default RequestHost;
