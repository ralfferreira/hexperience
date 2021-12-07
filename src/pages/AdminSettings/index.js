import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView, KeyboardAvoidingView, StyleSheet, Alert } from 'react-native';
import { Form } from "@unform/mobile";
import * as Yup from 'yup';

import HeaderText from '../../components/HeaderText';
import FormInput from '../../components/FormInput';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import { 
  Container, 
  AlignForm, 
  Touchable, 
  InputTitle, 
  DetailsInput, 
  SaveBtn, 
  SaveBtnText, 
  SaveBtnView, 
  OptionTitle 
} from './styles';

const AdminSettings = () => {
  const formRef = useRef();
  const { signOut } = useAuth();

  const [daysBlocked, setDaysBlocked] = useState(1); 
  const [minToBlock, setMinToBlock] = useState(1);

  useEffect(() => {
    api.get('/admin/configure').then(response => {
      setDaysBlocked(response.data.days_blocked);
      setMinToBlock(response.data.reports_to_block);
    }).catch((err) => {
      Alert.alert('Erro ao carregar configurações administrativas', `${err.response.data.message}`);
    })
  }, [])

  const handleSignOut = useCallback(() => {
    Alert.alert('Tchauzinho', 'Nos vemos em breve!');

    signOut();
  }, [signOut]);

  const ensureSignOut = useCallback(() => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Sair',
          onPress: () => handleSignOut(),
        }
      ]
    )
  }, [handleSignOut]);

  const handleAdminConfigureUpdate = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        blockedDays: Yup.number().min(1).required('Tempo bloqueado é obrigatório'),
        minDangerBlock: Yup.number().min(1).required('Minimo de denúncias para bloquear é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: true
      });

      const response = await api.put('/admin/configure', {
        days_blocked: data.blockedDays,
        reports_to_block: data.minDangerBlock
      });

      Alert.alert('Sucesso', 'Configurações administrativas foram atualizadas com sucesso');
      setDaysBlocked(response.data.days_blocked);
      setMinToBlock(response.data.reports_to_block);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        Alert.alert(
          'Erro ao atualizar configurações administrativas',
          `${err.message}`
        );

        return;
      }  

      Alert.alert(
        'Erro ao atualizar configurações administrativas',
        `${err.response.data.message}`
      );
    }
  }, []);

  return (
    <Container>
      <HeaderText>Configurações</HeaderText>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Form 
          ref={formRef} 
          onSubmit={handleAdminConfigureUpdate}
          initialData={{ 
            blockedDays: daysBlocked.toString(), 
            minDangerBlock: minToBlock.toString()
          }}
        >
          <AlignForm>
            <Touchable onPress={ensureSignOut} >
              <OptionTitle style={styles.red}>Sair</OptionTitle>
            </Touchable>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              enabled
            />
            <InputTitle>Tempo de bloqueio (em dias)</InputTitle>
            <FormInput 
              name="blockedDays"
              keyboardType="number-pad"
              placeholder="7"
              maxLength={20}
              containerStyle={DetailsInput}
            />
            <InputTitle>Número mínimo de denúncias para bloqueio</InputTitle>
            <FormInput
              name="minDangerBlock"
              maxLength={20}
              keyboardType="number-pad"
              placeholder="5"
              placeholderTextColor="gray"      
              containerStyle={DetailsInput}
            />
            <SaveBtn>
              <SaveBtnView
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                <SaveBtnText>Salvar Alterações</SaveBtnText>
              </SaveBtnView>
            </SaveBtn>
          </AlignForm>
        </Form>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  orange: {
    color: '#CA8C00',
  },
  red: {
    color: '#FD0303',
  },
});

export default AdminSettings;
