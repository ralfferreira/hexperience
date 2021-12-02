import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { ScrollView, KeyboardAvoidingView, Alert, StyleSheet, Modal } from 'react-native';
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

import { useFavorites } from '../../hooks/favorites';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import ReportImg from '../../assets/img/report-experience.png'
import UnfavoriteImg from '../../assets/img/heart-icon.png';
import FavoriteImg from '../../assets/img/heart-full.png';
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
  ExperienceFavorite, 
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
  Align
} from './styles';

const Experience = () => {
  const formRef = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  
  const { favoritesRelation } = useFavorites();

  const routeParams = route.params;

  const [experience, setExperience] = useState(null);
  const [rating, setRating] = useState(1);

  useEffect(() => {
    api.get(`/experiences/${routeParams.exp_id}/show`).then((response) => {
      setExperience(response.data);
    }).catch((err) => {
      Alert.alert(`${err.message}`)
    });
  }, []);

  const navigateToReportExperience = useCallback((exp_id) => {
    navigation.navigate('ReportExperience', { exp_id });
  }, [navigation]);

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

        formRef.current?.setErrors(errors);

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

  const schedules = useMemo(() => {
    if (!experience) {
      return;
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

  const [modalVisible, setModalVisible] = useState(false);

  const isFavorite = useMemo(() => {
    if (!favoritesRelation || !experience ) {
      return;
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
          experience ? (
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
                  <ExperienceFavorite 
                    source={
                      isFavorite
                      ? FavoriteImg
                      : UnfavoriteImg
                    } 
                  />
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
                <Align>
                  <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                  >
                    <ModalView>
  
                        {
                          schedules.length 
                          ? schedules.map((schedule) => {
                            return (
                              <OptionTitle onPress={() => setModalVisible(true)}
                              key={schedule.id}
                              >
                              Você quer agendar a experiência no dia {schedule.formattedDate}, às {schedule.formattedTime} ?
                              </OptionTitle>
                            )
                          })
                          : (<></>)
                        }         
                      <Row>
                        <Touchable onPress={() => setModalVisible(!modalVisible)}>
                          <OptionTitle style={styles.red}>Não</OptionTitle>
                        </Touchable>
                        <Touchable onPress={() => setModalVisible(!modalVisible)}>
                          <OptionTitle style={styles.green}>Sim</OptionTitle>
                        </Touchable>
                      </Row>
                    </ModalView>
                  </Modal>
                </Align>
                  {
                    schedules.length 
                    ? schedules.map((schedule) => {
                      return (
                        <ExperienceSchedule onPress={() => setModalVisible(true)}
                          key={schedule.id}
                          date={schedule.formattedDate}
                          time={schedule.formattedTime}
                        />
                      )
                    })
                    : (<></>)
                  }          
                </ExperienceSchedules>

                <Title>Comentários</Title>
                <Form ref={formRef} onSubmit={handleCreateComment} >
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
                        formRef.current?.submitForm();
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
});

export default Experience;
