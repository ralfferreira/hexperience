import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import formatStringByPattern from 'format-string-by-pattern';
import * as Yup from 'yup'

import { Form } from "@unform/mobile";

import FormInput from '../../components/FormInput';
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

  const [phoneNumber, setPhoneNumber] = useState(null);

  const handlePhoneTextChange = useCallback((value) => {
    const formatted = formatStringByPattern('+99 (99) 99999-9999', value);

    setPhoneNumber(formatted);
  }, []);

  const handleSubmit = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        phone: Yup.string()
          .optional()
          .matches(
            /^\+[0-9]+\s\([0-9]+\)\s\d\d\d\d\d-\d\d\d\d$/i, 
            "Telefone deve estar no formato: '+XX (XX) XXXXX-XXXX'"
          ),
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

      await api.post('/users/sign-up', {
        name: data.name,
        email: data.email,
        password: data.password,
        phone_number: data.phone,
      });

      Alert.alert('Parabéns', 'Cadastro realizado com sucesso')

      navigation.navigate('Login');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }  

      Alert.alert(
        'Erro no cadastro',
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
          <FormInput 
            autoCapitalize="words"
            name="name"
            placeholder="Nome"
            maxLength={100}
          />
          <InputTitle>Email</InputTitle>
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            name="email"
            placeholder="E-mail"
            maxLength={150}
          />
          <InputTitle>Telefone</InputTitle>
          <FormInput
            keyboardType="number-pad"
            name="phone"
            placeholder="Telefone"
            maxLength={19}
            onChangeText={(value) => handlePhoneTextChange(value)}
            value={phoneNumber}
          /> 
          <InputTitle>Senha</InputTitle>
          <FormInput
            name="password"
            placeholder="Senha"
            secureTextEntry
            textContentType="newPassword"  
          />
          <InputTitle>Confirmar Senha</InputTitle>
          <FormInput
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
