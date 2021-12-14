import React, { useState, useCallback, useMemo, } from 'react';
import { ScrollView, KeyboardAvoidingView, Alert, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { format, addMinutes, parseISO } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR';

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import AddressIcon from '../../assets/img/address.png';
import DurationIcon from '../../assets/img/duration.png';
import AmountPeopleIcon from '../../assets/img/amountpeople.png';
import PriceIcon from '../../assets/img/price.png';
import DefaultImg from '../../assets/img/DinoGreenColor.png'

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
  const navigation = useNavigation();
  const { user } = useAuth();

  const routeParams = route.params;

  const [appointment, setAppointment] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [experience, setExperience] = useState(null);

  const [loading, setLoading] = useState(false);

  const getAppointment = useCallback(async () => {
    try {
      const response = await api.get(`/appointments/${routeParams.appointment_id}`);

      setAppointment(response.data);
      setSchedule(response.data.schedule);
    } catch (err) {
      Alert.alert('Erro ao carregar experiência', `${err.response.data.message}`)
    }
  }, [routeParams]);

  const getExperience = useCallback(async () => {
    try {
      const response = await api.get(`/experiences/${appointment.schedule.experience.id}/show`);

      setExperience(response.data);
      setLoading(true);
    } catch (err) {
      Alert.alert('Erro ao carregar experiência', `${err.response.data.message}`)
    }
  }, [appointment]);

  const navigateToExperience = useCallback(() => {
    if (isHost) {
      return;
    }
    
    navigation.navigate('ExperienceRoute', { 
      screen: 'Experience',
      params: {
        exp_id: experience.id
      }
    })
  }, [navigation, user, experience, isHost]);

  const handleCancelAppointment = useCallback(async () => {
    try {
      await api.delete('/appointments', {
        data: { appointment_id: appointment.id }
      });

      Alert.alert('Sucesso', 'Agendamento foi cancelado');
      navigation.navigate('AppRoute', {
        screen: 'Calendar'
      })
    } catch (err) {
      Alert.alert('Erro ao carregar experiência', `${err.response.data.message}`)
    }
  }, [appointment])

  const ensureCancelAppointment = useCallback(() => {
    Alert.alert(
      'Cancelar agendamento',
      'Tem certeza que deseja cancelar agendamento?',
      [
        { text: 'Fechar', style: 'cancel', onPress: () => {} },
        { text: 'Cancelar', style: 'destructive', onPress: () => handleCancelAppointment() }
      ]
    )
  }, []);

  const isHost = useMemo(() => {
    if (!user || !experience) {
      return true;
    }

    if (user.type !== 'host') {
      return false;
    }

    if (user.host.id === experience.host.id) {
      return true;
    }
    return false;
  }, [user, experience]);

  const formattedDate = useMemo(() => {
    if (!schedule) {
      return false;
    }

    const parsedDate = parseISO(schedule.date);

    const date = format(parsedDate, "EEEE',' dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,            
    }); 

    const dateText = date.charAt(0).toUpperCase() + date.slice(1);

    return dateText
  }, [schedule]);

  const formattedDuration = useMemo(() => {
    if (!schedule || !experience) {
      return false;
    }

    const parsedDate = parseISO(schedule.date);

    const startsAt = format(parsedDate, "HH:mm", {
      locale: ptBR
    });

    const endsAt = format(addMinutes(parsedDate, experience.duration), "HH:mm", {
      locale: ptBR
    });

    return `${startsAt} - ${endsAt}`
  }, [schedule, experience]);

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
                <Touchable
                  onPress={() => navigateToExperience()}
                >
                  <ExperienceTitle>{experience.name}</ExperienceTitle>
                </Touchable>
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
                      {formattedDuration}
                    </DetailsInput>
                  </ExperienceDetailsRow>
                  <ExperienceDetailsRow>
                    <ImageDetails source={AmountPeopleIcon} />
                    <DetailsInput>{`${appointment.guests} pessoas`}</DetailsInput>
                  </ExperienceDetailsRow>
                  <ExperienceDetailsRow>
                    <ImageDetails source={PriceIcon} />
                    <DetailsInput>{appointment.final_price > 0 ? `R$ ${appointment.final_price}` : 'Gratuito'}</DetailsInput>
                  </ExperienceDetailsRow>
                </ExperienceDetails>

                <Title>Horário da experiência</Title>
                <Title>{formattedDate}</Title>

                {
                  appointment.user.id === user.id && (
                    <Touchable 
                      style={{ marginTop: 15, marginBottom: 15 }}
                      onPress={() => ensureCancelAppointment()}
                    >
                      <CancelExperience>Cancelar agendamento</CancelExperience>
                    </Touchable>
                  )
                }
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