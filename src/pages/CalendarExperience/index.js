import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ScrollView, KeyboardAvoidingView, Alert, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';

import api from '../../services/api';

import ReportImg from '../../assets/img/report-experience.png'
import AddressIcon from '../../assets/img/address.png';
import DurationIcon from '../../assets/img/duration.png';
import AmountPeopleIcon from '../../assets/img/amountpeople.png';
import PriceIcon from '../../assets/img/price.png';
import DefaultImg from '../../assets/img/DinoGreenColor.png'
import AddCommentImg from '../../assets/img/add-comment.png'
import PlusIcon from '../../assets/img/plusicon.png';
import FolderImg from '../../assets/img/folder.png';

import { 
  Container, 
  ExperienceTitle, 
  ExperienceHost, 
  ExperienceHostProfile, 
  ExperienceHostName, 
  Title, 
  ExperienceDescription, 
  Description, 
  ExperienceDetails, 
  ExperienceDetailsRow, 
  ImageDetails, 
  DetailsInput,
  CancelExperience,
  Touchable
} from './styles';

const CalendarExperience = () => {
  const route = useRoute();

  const routeParams = route.params;

  const [appointment, setAppointment] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [experience, setExperience] = useState(null);

  const [loading, setLoading] = useState(false);

  const getAppointment = useCallback(async () => {
    try {
      const response = await api.get(`/appointments/${routeParams.appointment_id}`);

      setAppointment(response.data);
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao carregar experiência', `${err.response.data.message}`)
    }
  }, [routeParams]);

  const getExperience = useCallback(async () => {
    try {
      const response = await api.get(`/experiences/${appointment.schedule.experience.id}/show`);

      setExperience(response.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao carregar experiência', `${err.response.data.message}`)
    }
  }, [appointment]);
  
  useEffect(() => {
    
  }, []);

  useEffect(() => {
    if (appointment) {
      setSchedule(appointment.schedule);
    }
  }, [appointment]);

  if (!loading){
    setTimeout(() => {
      getAppointment().finally(() => getExperience().finally(() => {}));
    }, 350)
  }  
  return (
    <Container>
      <HeaderWithoutSearch>Agendamento</HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        />
          {
            loading === true 
            ? (
              <>
                <ExperienceTitle>{experience.name}</ExperienceTitle>
                <ExperienceHost>
                  <ExperienceHostProfile 
                    source={
                      experience.host.user.avatar_url
                      ? { uri: experience.host.user.avatar_url }
                      : DefaultImg
                    }
                    resizeMode="center"
                  />
                  <ExperienceHostName>{`@${experience.host.nickname}`}</ExperienceHostName>
                </ExperienceHost>

                <Title>Descrição</Title>
                <ExperienceDescription>
                  <Description>{experience.description}</Description>
                </ExperienceDescription>

                <Title>Detalhes</Title>
                <ExperienceDetails>
                  <ExperienceDetailsRow>
                    <ImageDetails source={AddressIcon} />
                    <DetailsInput>
                      {
                        experience.address 
                        ? experience.address
                        : 'Online'
                      }
                    </DetailsInput>
                  </ExperienceDetailsRow>                  
                  <ExperienceDetailsRow>
                    <ImageDetails source={DurationIcon} />
                    <DetailsInput>
                      {
                        'Indeterminado'
                      }
                    </DetailsInput>
                  </ExperienceDetailsRow>
                  <ExperienceDetailsRow>
                    <ImageDetails source={AmountPeopleIcon} />
                    <DetailsInput>{`${experience.max_guests} pessoas`}</DetailsInput>
                  </ExperienceDetailsRow>
                  <ExperienceDetailsRow>
                    <ImageDetails source={PriceIcon} />
                    <DetailsInput>{`R$ ${experience.price}`}</DetailsInput>
                  </ExperienceDetailsRow>
                </ExperienceDetails>
                <Title>Horário da experiência</Title>
                <Title>Sabado eu me mato, oba, sabado eu me mato</Title>
                <Touchable>
                 <CancelExperience>Cancelar agendamento</CancelExperience>
                </Touchable>
              </>
            )
            : (
              <View style={{ flex: 1, justifyContent: 'center', marginTop: 50 }}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            )
          }
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  green: {
    color: '#32cd32',
  },
  red: {
    color: '#910101',
  },
  center: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default CalendarExperience