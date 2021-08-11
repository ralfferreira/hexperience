import React from 'react'
import { View, ScrollView, KeyboardAvoidingView, } from 'react-native';
import { Form } from "@unform/mobile";
import LoginInput from '../../components/LoginInput';
import LoginButton from '../../components/LoginButton';
import { Container, Image, Title, InputTitle, ForgotPassword, ForgotPasswordText, CreateAccount, CreateAccountText, Underline } from './styles';
import Logo from '../../assets/img/dinoDaleGreen.png'

const Login = () => {
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
        <Image source={Logo}></Image>
        <View>
          <Title>Login</Title>
        </View>
        
        <Form>
          <InputTitle>Email</InputTitle>
          <LoginInput 
          keyboardType="email-address"
          name="email"
          placeholder="E-mail"
          />
          <InputTitle>Senha</InputTitle>
          <LoginInput
          name="password"
          placeholder="Senha"
          returnKeyType="send"
          />
          <LoginButton />   
        </Form>

        <ForgotPassword>
          <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
        </ForgotPassword>
        <CreateAccount>
          <CreateAccountText>Não possui uma conta? <Underline>Cadastre-se</Underline></CreateAccountText>
        </CreateAccount>
      </Container>
    </>
  );
};

export default Login;
