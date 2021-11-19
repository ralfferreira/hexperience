import React from 'react'
import HeaderText from '../../components/HeaderText';
import FormInput from '../../components/FormInput';
import SwitchComponent from '../../components/Switch';
import { Container, AlignForm, InputTitle, DetailsInput, SaveBtn, SaveBtnText, SaveBtnView, SettingsThemeSwitcher, OptionTitle } from './styles';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { Form } from "@unform/mobile";

const AdminSettings = () => {
  return (
    <Container>
      <HeaderText>Configurações</HeaderText>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Form>
          <AlignForm>
            <SettingsThemeSwitcher>
              <OptionTitle>Tema Escuro</OptionTitle>
              <SwitchComponent />
            </SettingsThemeSwitcher>
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
                // onPress={() => {
                //   formRef.current?.submitForm();
                // }}
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

export default AdminSettings;
