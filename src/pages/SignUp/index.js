import React from 'react'
import { View, ScrollView, KeyboardAvoidingView, } from 'react-native';
import { Form } from "@unform/mobile";
import SignUpInput from '../../components/SignUpInput';
import SignUpButton from '../../components/SignUpButton';
import { Center, Container, Image, Title, InputTitle, BackToSignIn, BackToSignInText, Underline } from './styles';
import Logo from '../../assets/img/dinoDaleGreen.png'

const SignUp = () => {
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
          <SignUpInput 
          autoCapitalize="words"
          name="name"
          placeholder="Nome"
          />
          <InputTitle>Email</InputTitle>
          <SignUpInput
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          name="email"
          placeholder="E-mail"
          returnKeyType="next"
          />
          <InputTitle>Telefone</InputTitle>
          <SignUpInput
          keyboardType="number-pad"
          name="phone"
          placeholder="Telefone"
          /> 
          <InputTitle>Senha</InputTitle>
          <SignUpInput
          name="password"
          placeholder="Senha"
          textContentType="newPassword"
          returnKeyType="send"
          />
          <InputTitle>Confirmar Senha</InputTitle>
          <SignUpInput
          name="confirm-password"
          placeholder="Digite novamente sua Senha"
          textContentType="newPassword"
          returnKeyType="send"
          />
          <Center>
            <SignUpButton />   
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
