import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { ScrollView, KeyboardAvoidingView, Alert, StyleSheet, Modal, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { isAfter, format, addMinutes, parseISO, intervalToDuration } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR';
import { Form } from "@unform/mobile";
import * as Yup from 'yup';

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import ExperienceCategory from '../../components/ExperienceCategory';
import ExperienceSchedule from '../../components/ExperienceSchedule';
import Comment from '../../components/Comment';
import Rating from '../../components/Rating';
import AddComment from '../../components/AddComment';
import ParentalRating from '../../components/ParentalRating';
import ExperienceTitleInput from '../../components/ExperienceTitleInput';
import Like from '../../components/Like'

import { useFavorites } from '../../hooks/favorites';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import ReportImg from '../../assets/img/report-experience.png'
import AddressIcon from '../../assets/img/address.png';
import DurationIcon from '../../assets/img/duration.png';
import AmountPeopleIcon from '../../assets/img/amountpeople.png';
import PriceIcon from '../../assets/img/price.png';
import DefaultImg from '../../assets/img/DinoGreenColor.png'
import AddCommentImg from '../../assets/img/add-comment.png'

import { 
  Container, 
  ExperienceImage, 
  ExperienceTitle, 
  ExperienceOptions, 
  ExperienceReport, 
  ReportImage, 
  ExperienceRating, 
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
  ExperienceParentalRating,
  ExperienceWhatTake, 
  ExperienceSchedules, 
  CommentsList,
  AddComments,
  AddCommentButton,
  AddCommentIcon,
  AlignRating,
  OptionTitle, 
  Touchable,
  ModalView,
  Row,
  Align,
  AlignCallback,
  FolderModalView,
  ModalTitle,
  CreateFolder,
  CreateFolderIcon,
  FolderText,
  Folder,
  FolderIcon,
  FolderName
} from './styles';

const Experience = () => {
  const commentFormRef = useRef();
  const appointmentFormRef = useRef();
  const favoriteFormRef = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  
  const { favoritesRelation, loadFavorites } = useFavorites();

  const routeParams = route.params;

  const [experience, setExperience] = useState(null);  
  const [rating, setRating] = useState(1);

  const [appointmentModalVisible, setAppointmentModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const [guests, setGuests] = useState(0);

  const [favoriteModalVisible, setFavoriteModalVisible] = useState(false);

  useEffect(() => {
    api.get(`/experiences/${routeParams.exp_id}/show`).then((response) => {
      setExperience(response.data);
    }).catch((err) => {
      Alert.alert(`${err.message}`)
    });
  }, [routeParams]);

  const navigateToReportExperience = useCallback((exp_id) => {
    navigation.navigate('ReportExperience', { exp_id });
  }, [navigation]);

  const handleShowAppointmentModal = useCallback((schedule) => {
    setSelectedSchedule(schedule)
    setAppointmentModalVisible(true);
  }, [setSelectedSchedule, setAppointmentModalVisible]);

  const handleShowFavoriteModal = useCallback(() => {
    if (isFavorite) {
      handleRemoveFromFavorites();
      return;
    }

    setFavoriteModalVisible(true);
  }, [isFavorite, handleRemoveFromFavorites]);

  const handleCreateComment = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        comment: Yup.string().required('Comentário é obrigatório') 
      })

      await schema.validate(data, {
        abortEarly: true
      });

      await api.post('/reviews', {
        comment: data.comment,
        rating: rating,
        exp_id: experience.id
      });

      Alert.alert('Sucesso', 'Comentário realizado com sucesso!');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        commentFormRef.current?.setErrors(errors);

        Alert.alert(
          'Erro ao realizar comentário',
          `${err.message}`
        );

        return;
      }  

      Alert.alert(
        'Erro ao realizar comentário',
        `${err.response.data.message}`
      );
    }
  }, [experience, rating]);

  const handleAppointmentGuestsChange = useCallback((value) => {
    setGuests(value);
    
    const total = value * experience.price;

    setFinalPrice(total);
  }, [experience]);

  const handleMakeAppointment = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        guests: Yup.number()
          .min(1, 'Ao minímo uma pessoa deve ir')
          .max(selectedSchedule.availability, 'Número de pessoas ultrapassa a disponibilidade')
          .required('Comentário é obrigatório') 
      })

      await schema.validate(data, {
        aabortEarly: true
      });

      await api.post('/appointments', {
        guests: data.guests,
        paid: false,
        schedule_id: selectedSchedule.id
      });
      
      Alert.alert('Sucesso', 'Agendamento foi feito com sucesso!');

      setSelectedSchedule(null)
      setAppointmentModalVisible(!appointmentModalVisible)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        appointmentFormRef.current?.setErrors(errors);

        Alert.alert(
          'Erro ao agendar horário',
          `${err.message}`
        );

        return;
      }  

      Alert.alert(
        'Erro ao agendar horário',
        `${err.response.data.message}`
      );
    }
  }, [appointmentModalVisible, selectedSchedule]);

  const handleAddToFavorites = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        folder: Yup.string().optional() 
      });

      await schema.validate(data, {
        abortEarly: true
      });

      const formData = { exp_id: experience.id };

      if (data.folder) {
        Object.assign(formData, {
          folder: data.folder
        })
      }
      
      const response = await api.post('experiences/favorites', formData);

      Alert.alert('Sucesso', 'Experiência foi adicionada aos favoritos com sucesso');

      setExperience(response.data.experience);
      await loadFavorites();
      setFavoriteModalVisible(!favoriteModalVisible);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        favoriteFormRef.current?.setErrors(errors);

        Alert.alert(
          'Erro ao adicionar experiência à favoritos',
          `${err.message}`
        );

        return;
      }  

      Alert.alert(
        'Erro ao adicionar experiência à favoritos',
        `${err.response.data.message}`
      );
    }
  }, [experience, loadFavorites, favoriteModalVisible, setFavoriteModalVisible]);

  const handleRemoveFromFavorites = useCallback(async () => {
    try {
      await api.delete(`/experiences/favorites/${experience.id}`);

      Alert.alert('Sucesso', 'Experiência foi removida de favoritos com sucesso!')
      loadFavorites().then(() => setFavoriteModalVisible(!favoriteModalVisible))
    } catch (err) {
      Alert.alert(
        'Erro ao remover experiência de favoritos',
        `${err.response.data.message}`
      );
    }
  }, [favoriteModalVisible, experience, loadFavorites]);

  const schedules = useMemo(() => {
    if (!experience) {
      return [];
    }

    return experience.schedules.filter((schedule) => {
        const parsedDate = parseISO(schedule.date);

        if (isAfter(parsedDate, new Date())) {
          return schedule;
        }
      })
      .map((schedule) => {
        const parsedDate = parseISO(schedule.date);

        const startsAt = format(parsedDate, "HH:mm", {
          locale: ptBR
        });

        const endsAt = format(addMinutes(parsedDate, experience.duration), "HH:mm", {
          locale: ptBR
        });

        const date = format(parsedDate, "EEEE',' dd 'de' MMMM 'de' yyyy", {
          locale: ptBR,            
        });        

        return {
          id: schedule.id,
          formattedDate: date.charAt(0).toUpperCase() + date.slice(1),
          formattedTime: `${startsAt} - ${endsAt}`,
          availability: schedule.availability
        }
      });
  }, [experience]);

  const formattedDuration = useMemo(() => {
    if (!experience) {
      return null;
    }

    const startsAt = new Date();
    const endsAt = addMinutes(new Date(), experience.duration);

    const duration = intervalToDuration({
      start: startsAt,
      end: endsAt
    });

    if (duration.hours) {
      return duration.minutes 
        ? `${duration.hours} h ${duration.minutes} min` 
        : `${duration.hours} h`
    }

    return `${duration.minutes} min`
  }, [experience]);    

  const isFavorite = useMemo(() => {
    if (!favoritesRelation || !experience ) {
      return false;
    }

    if (favoritesRelation.find(e => e.exp_id === experience.id)) {
      return true;
    }

    return false;
  }, [favoritesRelation, experience]);

  return (
    <Container>
      <HeaderWithoutSearch>Experiência</HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        />
        {
          experience 
          ? (
            <>
              <ExperienceImage 
                resizeMode="center" 
                source={
                  experience.cover_url
                  ? { uri: experience.cover_url }
                  : DefaultImg
                } 
              />
              <ExperienceTitle>{experience.name}</ExperienceTitle>
              <ExperienceOptions>
                <ExperienceReport onPress={() => navigateToReportExperience(experience.id)}>
                  <ReportImage source={ReportImg} />
                </ExperienceReport>
                <ExperienceRating>
                  <Rating
                    rating={experience.rating}
                    disabled={true}
                  />
                </ExperienceRating>
                  <ExperienceCategory name={experience.category.name} />
                  <Touchable onPress={() => handleShowFavoriteModal()}>
                    <ExperienceDescription>
                      <Like />
                    </ExperienceDescription>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={favoriteModalVisible}
                      onRequestClose={() => {
                        setFavoriteModalVisible(!favoriteModalVisible);
                      }}
                    >
                      <FolderModalView>
                        <ModalTitle>Seus favoritos</ModalTitle>
                        <CreateFolder>
                          <CreateFolderIcon />
                          <FolderText>Criar nova pasta de favoritos</FolderText>
                        </CreateFolder>
                        <Folder>
                          <FolderIcon />
                          <FolderName>Florianópolis</FolderName>
                        </Folder>
                      </FolderModalView>
                    </Modal>
                  </Touchable>
              </ExperienceOptions>

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
                      formattedDuration ? formattedDuration : 'Indeterminado'
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

                <Title>Classificação Indicativa</Title>
                <ExperienceParentalRating>
                  <ParentalRating age={experience.parental_rating} />
                </ExperienceParentalRating>
              </ExperienceDetails>

              <Title>O Que Levar (Opcional)</Title>
              <ExperienceWhatTake>{experience.requirements}</ExperienceWhatTake>

              <Title>Horários</Title>
              <ExperienceSchedules horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                  schedules.length 
                  ? schedules.map((schedule) => {
                    return (
                      <ExperienceSchedule onPress={() => handleShowAppointmentModal(schedule)}
                        key={schedule.id}
                        date={schedule.formattedDate}
                        time={schedule.formattedTime}
                      />
                    )
                  })
                  : (<></>)
                }
                <Align>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={appointmentModalVisible}
                    onRequestClose={() => {
                      setSelectedSchedule(null)
                      setAppointmentModalVisible(!appointmentModalVisible)
                    }}>
                    <ModalView>
                      <AlignCallback>
                        <Title>Resumo do Agendamento</Title>
                      </AlignCallback>
                      {
                        selectedSchedule
                        ? (
                          <Form ref={appointmentFormRef} Submit={handleMakeAppointment}>
                            <OptionTitle>
                              Data: {selectedSchedule.formattedDate}, às {selectedSchedule.formattedTime}
                            </OptionTitle>

                            <OptionTitle>
                              Preço da experiência: {`R$ ${experience.price}`}
                            </OptionTitle>

                            <OptionTitle>
                              Disponibilidade: {selectedSchedule.availability} pessoas
                            </OptionTitle>
                            
                            <Row>
                              <OptionTitle>Pessoas: </OptionTitle> 
                              <ExperienceTitleInput 
                                autoCapitalize="words"
                                keyboardType="number-pad"
                                name="guests"
                                placeholder="Número de pessoas"
                                style={{fontSize:18, textAlign: 'left', marginTop: 7,}} 
                                maxLength={100}
                                onChangeText={(value) => handleAppointmentGuestsChange(value)}
                                value={guests}
                              />
                            </Row>                            
                            
                            <OptionTitle>
                              Preço Final: {`R$ ${finalPrice}`}
                            </OptionTitle>                            
                            
                            <AlignCallback>
                            <OptionTitle style={styles.center}>Você deseja agendar sua experiência?</OptionTitle>
                              <Row>
                                <Touchable
                                  onPress={() => {
                                    setSelectedSchedule(null)
                                    setAppointmentModalVisible(!appointmentModalVisible)
                                  }}
                                >
                                  <OptionTitle style={styles.red}>Não</OptionTitle>
                                </Touchable>
                                <Touchable 
                                  onPress={() => {
                                    appointmentFormRef.current.submitForm()
                                  }}
                                >
                                  <OptionTitle style={styles.green}>Sim</OptionTitle>
                                </Touchable>
                              </Row>
                            </AlignCallback>
                          </Form>
                        )
                        : (<></>)
                      }                      
                    </ModalView>
                  </Modal>
                </Align>                            
              </ExperienceSchedules>

              <Title>Comentários</Title>
              <Form ref={commentFormRef} onSubmit={handleCreateComment} >
                <AlignRating>
                  <Rating
                    rating={rating}
                    disabled={false}
                    setRating={setRating}
                  />
                </AlignRating>
                <AddComments>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    enabled
                  />                    
                  <AddComment 
                    autoCapitalize="words"
                    name="comment"
                    placeholder="Adicione um comentário"
                    maxLength={200}
                    multiline
                  />
                  <AddCommentButton 
                    onPress={() => {
                      commentFormRef.current?.submitForm();
                    }}
                  >
                    <AddCommentIcon source={AddCommentImg} />
                  </AddCommentButton>
                </AddComments>
              </Form>
              <CommentsList>
                {
                  experience.reviews 
                  ? experience.reviews.map((review) => {
                    return (
                      <Comment
                        key={review.id}
                        name={review.user.name}
                        content={review.comment}
                        date={review.updated_at}
                        rating={review.rating}
                        avatar_url={review.user.avatar_url}
                      />
                    )
                  })
                  : (<></>)
                }
              </CommentsList>
            </>
          ) : (<></>)
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

export default Experience;
