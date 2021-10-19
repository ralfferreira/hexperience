import React, { useState } from 'react'
import { Container, HeaderContent, Back, BackIcon, HeaderTitle, Logo, Title, AlignForm, InputRow, InputTitle, DateInput, DetailsInput, SaveBtn, SaveBtnText, SaveBtnView } from './styles';
import { ScrollView, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import BackImg from '../../assets/img/back.png'
import LogoImg from '../../assets/img/dinoDaleGreen.png'
const ReportExperience = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const [checked, toggleChecked] = useState(false);
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

      <AlignForm>
        <InputRow>
          <InputTitle>Data do Ocorrido:</InputTitle>
          <DateInput onPress={showDatepicker} />
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        </InputRow>
          <CheckBox
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
          />
        <InputTitle>Outro</InputTitle>
        <DetailsInput 
        autoCapitalize="words"
        name="other"
        placeholder="Descreva para nós o corrido"
        maxLength={300}
        />
        <SaveBtn>
          <SaveBtnView  
          onPress={() => {
          navigation.navigate('Home')
          }}>
            <SaveBtnText>
            Enviar
            </SaveBtnText>
          </SaveBtnView>
        </SaveBtn>
      </AlignForm>
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
