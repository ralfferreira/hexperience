import React from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { Form } from "@unform/mobile";
import SignInput from '../../components/SignInput';
import SignButton from '../../components/SignButton';
import { Center, Container, Image, 
Title, InputTitle, BackToSignIn, 
BackToSignInText, Underline } from './styles';
import { useNavigation } from '@react-navigation/native'; 
import Logo from '../../assets/img/dinoDaleGreen.png'

const SignUp = () => {
  const navigation = useNavigation();
  return (
    <>
     <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
      />
      <Container>
        <Center>
          <Image source={Logo}></Image>
          <Title>Cadastro</Title>
        </Center>
        
        <Form>
          <InputTitle>Nome</InputTitle>
          <SignInput 
          autoCapitalize="words"
          name="name"
          placeholder="Nome"
          maxLength={100}
          />
          <InputTitle>Email</InputTitle>
          <SignInput
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          name="email"
          placeholder="E-mail"
          returnKeyType="next"
          maxLength={150}
          />
          <InputTitle>Telefone</InputTitle>
          <SignInput
          keyboardType="number-pad"
          name="phone"
          placeholder="Telefone"
          maxLength={17}
          /> 
          <InputTitle>Senha</InputTitle>
          <SignInput
          name="password"
          placeholder="Senha"
          textContentType="newPassword"
          returnKeyType="send"
          />
          <InputTitle>Confirmar Senha</InputTitle>
          <SignInput
          name="confirm-password"
          placeholder="Digite novamente sua Senha"
          textContentType="newPassword"
          returnKeyType="send"
          />
          <Center>
            <SignButton 
            onPress={() => {
            navigation.navigate('AppRoute')
            }}>
            Cadastrar
            </SignButton>
          </Center>
        </Form>

        <BackToSignIn onPress={() => navigation.goBack()}>
        <BackToSignInText>Já possui uma conta? <Underline>Faça Login</Underline></BackToSignInText>
        </BackToSignIn>
      </Container>
    </>
  );
};


export default SignUp;
