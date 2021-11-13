import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Form } from "@unform/mobile";
import * as Yup from 'yup'
import formatStringByPattern from 'format-string-by-pattern';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import FormInput from '../../components/FormInput';

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
  const formRef = useRef();

  const [cpf, setCPF] = useState(null);
  const [cnpj, setCNPJ] = useState(null);

  const handleCPFTextChange = useCallback((value) => {
    const formatted = formatStringByPattern('999.999.999-99', value)   

    setCPF(formatted);
  }, [setCPF]);

  const handleCNPJTextChange = useCallback((value) => {
    const formatted = formatStringByPattern('99.999.999/9999-99', value)

    setCNPJ(formatted);
  }, [setCNPJ]);
  
  const handleSubmit = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        nickname: Yup.string().required('Apelido é obrigatório'),
      });

      if (!data.cpf && !data.cnpj) {
        throw new Error('CPF ou CNPJ deve ser fornecido');
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      const postData = {
        nickname: data.nickname,
      }

      if (data.cpf) {
        const formattedCPF = data.cpf.replace(/[^\d]/g, '');

        Object.assign(postData, { cpf: formattedCPF })
      }

      if (data.cnpj) {
        const formattedCNPJ = data.cnpj.replace(/[^\d]/g, '');

        Object.assign(postData, { cnpj: formattedCNPJ })
      }

      await api.post('hosts/request-privilege', postData)
        .catch((err) => { console.log(err.response);});

      navigation.navigate('Home')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }

      Alert.alert(
        'Erro',
        `${err}`
      );
    }
  }, [navigation]);

  return (
    <Container>
      <HeaderWithoutSearch>Anfitrião</HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Title>Seja um Anfitrião e trabalhe Conosco!</Title>
        <Description>Um anfitrião tem permissão para proporcionar e divulgar experiências em nossa plataforma.</Description>
        <Form ref={formRef} onSubmit={handleSubmit} >
          <AlignForm>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              enabled
            />
            <InputTitle>Apelido</InputTitle>
            <FormInput 
              autoCapitalize="words"
              name="nickname"
              placeholder="Coloque um Apelido bem legal"
              maxLength={150}
              containerStyle={DetailsInput}
            />
            <InputTitle>CPF</InputTitle>
            <FormInput
              name="cpf"
              maxLength={14}
              keyboardType="number-pad"
              placeholder="000.000.000-00"
              placeholderTextColor="gray"
              value={cpf}         
              onChangeText={(value) => handleCPFTextChange(value)}
              containerStyle={DetailsInput}
            />
            <InputTitle>CNPJ</InputTitle>
            <FormInput
              name="cnpj"
              maxLength={18}
              placeholder="00.000.000/0000-00"
              placeholderTextColor="gray"
              keyboardType="number-pad"
              value={cnpj}
              onChangeText={(value) => handleCNPJTextChange(value)}
              containerStyle={DetailsInput}
            />
            <SaveBtn>
              <SaveBtnView
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                <SaveBtnText>Enviar</SaveBtnText>
              </SaveBtnView>
            </SaveBtn>
          </AlignForm>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default RequestHost;
