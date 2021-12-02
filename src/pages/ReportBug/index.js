import React, { useCallback, useRef } from 'react';
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Form } from "@unform/mobile";
import * as Yup from 'yup';

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import FormInput from '../../components/FormInput';
import MultilineDetailsInput from '../../components/MultilineDetailsInput';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { 
  Container,
  Title,
  AlignForm,
  InputTitle,
  SaveBtn,
  SaveBtnText,
  SaveBtnView
} from './styles';

const ReportBug = () => {
  const formRef = useRef(null);
  const navigation = useNavigation();

  const handleSubmit = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        screen: Yup.string().required('Obrigatório informar a tela do erro'),
        problem: Yup.string().required('Obrigatório informar o que ocorreu'),
        steps: Yup.string().required('Obrigatório detalhar a situação')
      })

      await schema.validate(data, {
        abortEarly: true
      });

      await api.post('/reports/bugs/', {
        where: data.screen,
        what: data.problem,
        description: data.steps
      });

      Alert.alert(
        'Obrigado', 
        'O erro foi reportado com sucesso, estaremos trabalhando para corrigi-lo'
      );

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        Alert.alert(
          'Erro ao reportar bug',
          `${err.message}`
        );

        return;
      }  

      Alert.alert(
        'Erro ao reportar bug',
        `${err.response.data.message}`
      );
    }
  }, []);

  return (
    <Container>
      <HeaderWithoutSearch>Reportar Problema</HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Title>Nos ajude a melhorar sua experiência com o app! Nos diga o que aconteceu e faremos o possível para ajudar.</Title>
        <Form ref={formRef} onSubmit={handleSubmit} >
          <AlignForm>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              enabled
            />
            <InputTitle>Em qual tela o problema ocorreu?</InputTitle>
            <FormInput 
              name="screen"
              placeholder="Tela de Login"
              placeholderTextColor="gray"
              maxLength={50}
            />
            <InputTitle>O que ocorreu?</InputTitle>
            <MultilineDetailsInput
              name="problem"
              placeholder="Não consegui inserir meus dados"
              placeholderTextColor="gray"
              maxLength={300}
              multiline={true}
            />
            <InputTitle>Quais passos realizou antes do problema acontecer?</InputTitle>
            <MultilineDetailsInput
              name="steps"
              placeholder=""
              maxLength={300}
              multiline={true}
            />
            <SaveBtn>
              <SaveBtnView 
                onPress={() => {
                  formRef.current.submitForm()
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

export default ReportBug;
