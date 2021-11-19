import React, { useCallback, useRef } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from "@unform/mobile";

import FormInput from '../../components/FormInput';
import SignButton from '../../components/SignButton';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Logo from '../../assets/img/dinoDaleGreen.png'

import { 
  Container, 
  Image, 
  Title, 
  InputTitle, 
  ForgotPassword, 
  ForgotPasswordText, 
  CreateAccount, 
  CreateAccountText, 
  Underline,
} from './styles';

const Login = () => {
  const formRef = useRef(null);
  
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        })

        await schema.validate(data, {
          abortEarly: false
        });

        await signIn({
          email: data.email,
          password: data.password
        })

        navigation.navigate('AppRoute');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          Alert.alert(
            'Erro na autenticação',
            `${err.message}`
          );

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          `${err.response.data.message}`
        );
      }
    },
    [signIn, navigation]
  );

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
        
        <Form ref={formRef} onSubmit={handleSubmit} >
          <InputTitle>Email</InputTitle>
          <FormInput 
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            name="email"
            placeholder="E-mail"
            maxLength={150}
          />
          <InputTitle>Senha</InputTitle>
          <FormInput
            secureTextEntry
            name="password"
            placeholder="Senha"
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
          <SignButton
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Entrar
          </SignButton>
        </Form>

        <ForgotPassword>
          <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
        </ForgotPassword>

        <CreateAccount onPress={() => { navigation.navigate('SignUp') }}>
          <CreateAccountText>Não possui uma conta? <Underline>Cadastre-se</Underline></CreateAccountText>
        </CreateAccount>
      </Container>
    </>
  );
};

export default Login;
