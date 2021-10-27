import React, { useCallback, useRef } from 'react';
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import * as Yup from 'yup'

import { Form } from "@unform/mobile";

import SignInput from '../../components/SignInput';
import SignButton from '../../components/SignButton';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Logo from '../../assets/img/dinoDaleGreen.png'

import { 
  Center, 
  Container, 
  Image, 
  Title, 
  InputTitle, 
  BackToSignIn, 
  BackToSignInText, 
  Underline 
} from './styles';

const SignUp = () => {
  const formRef = useRef(null);

  const navigation = useNavigation();

  const handleSubmit = useCallback(async (data) => {
    try {

      console.log('Passei aqui');

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string()
          .required('Senha obrigatório')
          .min(8, 'Senha deve ter no minímo 8 digitos'),
        confirm_password: Yup.string()
          .when('password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf(
            [Yup.ref('password'), null],
            'Confirmação de senha está incorreta',
          ),
      })

      await schema.validate(data, {
        abortEarly: false
      });

      console.log('Cheguei aqui');

      await api.post('/users/sign-up', {
        name: data.name,
        email: data.email,
        password: data.password
      })

      navigation.navigate('Login');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        console.log(err);

        return
      }

      Alert.alert(
        'Erro na autenticação',
        `${err}`
      );
    }
  }, [navigation]);

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
        
        <Form ref={formRef} onSubmit={handleSubmit} >
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
            maxLength={150}
          />
          {/* <InputTitle>Telefone</InputTitle>
          <SignInput
            keyboardType="number-pad"
            name="phone"
            placeholder="Telefone"
            maxLength={17}
          />  */}
          <InputTitle>Senha</InputTitle>
          <SignInput
            name="password"
            placeholder="Senha"
            secureTextEntry
            textContentType="newPassword"          
          />
          <InputTitle>Confirmar Senha</InputTitle>
          <SignInput
            name="confirm_password"
            secureTextEntry
            placeholder="Digite novamente sua Senha"
            textContentType="newPassword"          
          />
          <Center>
            <SignButton
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
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
