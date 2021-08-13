import React from 'react'
import { View, ScrollView, KeyboardAvoidingView, } from 'react-native';
import { Form } from "@unform/mobile";
import SignInput from '../../components/SignInput';
import LoginButton from '../../components/LoginButton';
import { Container, Image, Title, InputTitle, ForgotPassword, ForgotPasswordText, CreateAccount, CreateAccountText, Underline } from './styles';
import Logo from '../../assets/img/dinoDaleGreen.png'
import { useNavigation } from '@react-navigation/native'; 

const Login = () => {
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
        <Image source={Logo}></Image>
        <View>
          <Title>Login</Title>
        </View>
        
        <Form>
          <InputTitle>Email</InputTitle>
          <SignInput 
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          name="email"
          placeholder="E-mail"
          returnKeyType="next"
          />
          <InputTitle>Senha</InputTitle>
          <SignInput
          name="password"
          placeholder="Senha"
          returnKeyType="send"
          />
          <LoginButton onPress={() => {
          navigation.navigate('AppRoute')
          }}/>   
        </Form>

        <ForgotPassword>
          <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
        </ForgotPassword>
        <CreateAccount onPress={() => {
          navigation.navigate('SignUp')
        }}>
          <CreateAccountText>Não possui uma conta? <Underline>Cadastre-se</Underline></CreateAccountText>
        </CreateAccount>
      </Container>
    </>
  );
};

export default Login;
