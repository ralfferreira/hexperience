import React, { useCallback, useRef, useState } from 'react'
import { Platform, ScrollView, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import { Form } from "@unform/mobile";

import BackImg from '../../assets/img/back.png';
import LogoImg from '../../assets/img/dinoDaleGreen.png';

import { 
  Container,
  HeaderContent,
  Back,
  BackIcon,
  HeaderTitle,
  Logo,
  Title,
  AlignForm,
  InputRow,
  InputTitle,
  DateInput,
  DetailsInput,
  SaveBtn,
  SaveBtnText,
  SaveBtnView 
} from './styles';

const ReportExperience = () => {
  const formRef = useRef();
  const navigation = useNavigation();

  const [showDatepicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChange = useCallback((event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setDate(date);
    }
  }, []);

  const handleSubmit = useCallback(() => {}, []);

  return (
    <Container>
      <HeaderContent>
        <Back onPress={() => navigation.goBack()} >
          <BackIcon source={BackImg}/>
        </Back>
        <HeaderTitle>Denunciar Experiência</HeaderTitle>
        <Logo source={LogoImg} />
      </HeaderContent>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Title>Caso se encontre em situação de emergência, peça ajuda antes de nos contatar.</Title>

      <Form ref={formRef} onSubmit={handleSubmit} >
        <AlignForm>
          <InputRow>
            <InputTitle>Data do Ocorrido:</InputTitle>
            <DateInput onPress={handleToggleDatePicker} />
            {
              showDatepicker &&
              <DateTimePicker
                value={date}
                mode='date'
                is24Hour={true}
                display='calendar'
                onChange={handleDateChange}
              />
            }
          </InputRow>
          {/* <CheckBox
            title='Falta de Segurança'
            containerStyle={styles.checkbox}
            checkedColor="green"
            checked={checked}
            onPress={() => toggleChecked(!checked)}
          />
          <CheckBox
            title='Assédio'
            containerStyle={styles.checkbox}
            checkedColor="green"
            checked={checked}
            onPress={() => toggleChecked(!checked)}
          />
          <CheckBox
            title='Conteúdo Ilegal'
            containerStyle={styles.checkbox}
            checkedColor="green"
            checked={checked}
            onPress={() => toggleChecked(!checked)}
          />
          <CheckBox
            title='Violência Física/Verbal'
            containerStyle={styles.checkbox}
            checkedColor="green"
            checked={checked}
            onPress={() => toggleChecked(!checked)}
          /> */}
          <InputTitle>Outro</InputTitle>
          <DetailsInput 
            autoCapitalize="words"
            name="other"
            placeholder="Descreva para nós o corrido"
            maxLength={300}
          />
          <SaveBtn>
            <SaveBtnView onPress={() => { navigation.navigate('Home') }}>
              <SaveBtnText>Enviar</SaveBtnText>
            </SaveBtnView>
          </SaveBtn>
        </AlignForm>
      </Form>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    paddingLeft: 0,
  }
});

export default ReportExperience;
