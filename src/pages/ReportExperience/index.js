import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import { Form } from "@unform/mobile";

import ExperienceDetailsInput from '../../components/ExperienceDetailsInput';
import MultilineDetailsInput from '../../components/MultilineDetailsInput';

import api from '../../services/api';

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
  InputTitle,
  SaveBtn,
  SaveBtnText,
  SaveBtnView 
} from './styles';

const ReportExperience = () => {
  const formRef = useRef();
  const route = useRoute();
  const navigation = useNavigation();

  const routeParams = route.params;

  const [expId, setExpId] = useState(0);

  const [reason, setReason] = useState('Falta de Segurança');
  const [otherReason, setOtherReason] = useState(null);
  const [lackOfSafety, setLackOfSafety] = useState(true);
  const [harassment, setHarassment] = useState(false);
  const [illegal, setIllegal] = useState(false);
  const [violence, setViolence] = useState(false);
  const [otherCheckBox, setOtherCheckBox] = useState(false);

  const [comment, setComment] = useState(null);

  useEffect(() => {
    setExpId(routeParams.exp_id);
  }, [routeParams]);

  const handleCheckBoxChange = useCallback((option) => {
    setReason(option);
    
    switch (option) {
      case 'Falta de Segurança':        
        setLackOfSafety(true);
        setHarassment(false);
        setIllegal(false);
        setViolence(false);
        setOtherCheckBox(false);
        break;
      case 'Assédio':
        setLackOfSafety(false);
        setHarassment(true);
        setIllegal(false);
        setViolence(false);
        setOtherCheckBox(false);
        break;
      case 'Conteúdo Ilegal':
        setLackOfSafety(false);
        setHarassment(false);
        setIllegal(true);
        setViolence(false);
        setOtherCheckBox(false);
        break;
      case 'Violência Física/Verbal':
        setLackOfSafety(false);
        setHarassment(false);
        setIllegal(false);
        setViolence(true);
        setOtherCheckBox(false);
        break;
      case 'Outro':
        setLackOfSafety(false);
        setHarassment(false);
        setIllegal(false);
        setViolence(false);
        setOtherCheckBox(true);
        break;
    }
  }, [otherCheckBox]);

  const handleSubmit = useCallback(async () => {
    try {
      if (expId === 0) {
        throw new Error('Experiencia não existe');
      }

      let reportReason = reason;

      if (otherCheckBox) {
        if (!otherReason) {
          throw new Error('Uma categoria deve ser informada');
        }

        reportReason = otherReason;
      }

      if (!comment) {
        throw new Error('Deve ser descrito o que ocorreu');
      }

      await api.post('/reports/experiences/', {
        comment: comment,
        reason: reportReason,
        exp_id: expId
      });

      Alert.alert('Obrigado', 'Sua denúncia foi feita com sucesso.');

      navigation.goBack();
    } catch (err) {
      console.log(err.response);

      Alert.alert('Erro', `${err}`)
    }
  }, [expId, reason, otherCheckBox, otherReason, comment]);

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
          <CheckBox
            title='Falta de Segurança'
            containerStyle={styles.checkbox}
            checkedColor="green"
            checked={lackOfSafety}
            onPress={() => handleCheckBoxChange('Falta de Segurança')}
          />
          <CheckBox
            title='Assédio'
            containerStyle={styles.checkbox}
            checkedColor="green"
            checked={harassment}
            onPress={() => handleCheckBoxChange('Assédio')}
          />
          <CheckBox
            title='Conteúdo Ilegal'
            containerStyle={styles.checkbox}
            checkedColor="green"
            checked={illegal}
            onPress={() => handleCheckBoxChange('Conteúdo Ilegal')}
          />
          <CheckBox
            title='Violência Física/Verbal'
            containerStyle={styles.checkbox}
            checkedColor="green"
            checked={violence}
            onPress={() => handleCheckBoxChange('Violência Física/Verbal')}
          />
          <CheckBox
            title='Outro:'
            containerStyle={styles.checkbox}
            checkedColor="green"
            checked={otherCheckBox}
            onPress={() => handleCheckBoxChange('Outro')}
          />
          {
            otherCheckBox
            ? (
              <ExperienceDetailsInput               
                name="reason"
                maxLength={100}
                editable={otherCheckBox}
                value={otherReason}
                placeholder='Informe a categoria da denúncia. Ex: Fraude'
                onChangeText={(text) => setOtherReason(text)}
              />
            )
            : (<></>)
          }          
          <InputTitle>O que ocorreu?</InputTitle>
          <MultilineDetailsInput 
            name="other"
            placeholder="Descreva para nós o ocorrido"
            maxLength={350}
            multiline={true}
            value={comment}
            onChangeText={(text) => setComment(text)}
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

const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    paddingLeft: 0,
  }
});

export default ReportExperience;
