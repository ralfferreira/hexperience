import React, { useCallback, useRef } from 'react'
import { ScrollView, KeyboardAvoidingView, StyleSheet, Alert } from 'react-native';
import { Form } from "@unform/mobile";
import * as Yup from 'yup';

import HeaderText from '../../components/HeaderText';
import FormInput from '../../components/FormInput';
import SwitchComponent from '../../components/Switch';

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
  SettingsThemeSwitcher, 
  OptionTitle 
} from './styles';

const AdminSettings = () => {
  const formRef = useRef();
  const { signOut } = useAuth();

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

  const handleAdminConfigureUpdate = useCallback(() => {}, []);

  return (
    <Container>
      <HeaderText>Configurações</HeaderText>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Form ref={formRef} onSubmit={handleAdminConfigureUpdate}>
          <AlignForm>
            <SettingsThemeSwitcher>
              <OptionTitle>Tema Escuro</OptionTitle>
              <SwitchComponent />
            </SettingsThemeSwitcher>
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
