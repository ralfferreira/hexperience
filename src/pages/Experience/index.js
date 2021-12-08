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
import FormInput from '../../components/FormInput';
import ParentalRating from '../../components/ParentalRating';
import ExperienceTitleInput from '../../components/ExperienceTitleInput';
import Like from '../../components/Like'
import ExperienceCarousel from '../../components/ExperienceCarousel';

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
import PlusIcon from '../../assets/img/plusicon.png';
import FolderImg from '../../assets/img/folder.png';

import { 
  Container, 
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
  FolderName,
  AlignFolder,
  PlusImg
} from './styles';

const Experience = () => {
  const commentFormRef = useRef();
  const appointmentFormRef = useRef();
  const favoriteFormRef = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  
  const { favoritesRelation, loadFavorites, folders } = useFavorites();

  const routeParams = route.params;

  const [experience, setExperience] = useState(null);  
  const [rating, setRating] = useState(1);

  const [appointmentModalVisible, setAppointmentModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const [guests, setGuests] = useState(null);

  const [favoriteModalVisible, setFavoriteModalVisible] = useState(false);
  const [newFolder, setNewFolder] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('Nenhuma pasta');

  const getExperience = useCallback(async () => {
    try {
      const response = await api.get(`/experiences/${routeParams.exp_id}/show`);

      setExperience(response.data);
    } catch (err) {
      Alert.alert('Erro ao carregar experiência', `${err.response.data.message}`)
    }
  }, [routeParams]);
  
  useEffect(() => {
    getExperience().finally(() => {});
  }, []);

  const navigateToReportExperience = useCallback((exp_id) => {
    navigation.navigate('ReportExperience', { exp_id });
  }, [navigation]);

  const handleShowAppointmentModal = useCallback((schedule) => {
    setSelectedSchedule(schedule)
    setAppointmentModalVisible(true);
  }, []);

  const handleShowFavoriteModal = useCallback(() => {
    if (isFavorite) {
      handleRemoveFromFavorites();
    } else {
      setFavoriteModalVisible(true);
    }
  }, [isFavorite]);

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
      await getExperience();
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
        status: 'unpaid',
        schedule_id: selectedSchedule.id
      });
      
      Alert.alert('Sucesso', 'Agendamento foi feito com sucesso!');

      setSelectedSchedule(null)
      setAppointmentModalVisible(false)
      await getExperience();
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
  }, [selectedSchedule]);

  const handleAddToFavorites = useCallback(async () => {
    try {
      const formData = { exp_id: experience.id };

      if (selectedFolder !== 'Nenhuma pasta') {
        Object.assign(formData, {
          folder: selectedFolder
        })
      }
      
      const response = await api.post('experiences/favorites', formData);

      Alert.alert('Sucesso', 'Experiência foi adicionada aos favoritos com sucesso');

      setExperience(response.data.experience);
      await loadFavorites();
      setFavoriteModalVisible(false);
      setSelectedFolder('Nenhuma pasta')
      setNewFolder(null)
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
  }, [experience, loadFavorites, selectedFolder]);

  const handleRemoveFromFavorites = useCallback(async () => {
    try {
      await api.delete(`/experiences/favorites/${experience.id}`);

      Alert.alert('Sucesso', 'Experiência foi removida de favoritos com sucesso!')
      await loadFavorites();
      setFavoriteModalVisible(false)
    } catch (err) {
      Alert.alert(
        'Erro ao remover experiência de favoritos',
        `${err.response.data.message}`
      );
    }
  }, [experience, loadFavorites]);

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

  const comments = useMemo(() => {
    if (!experience) {
      return [];
    }

    return experience.reviews.map(r => {
      return r  
    }).sort((a,b) => {
      const parsedA = parseISO(a.created_at)
      const parsedB = parseISO(b.created_at)
      
      if (isAfter(parsedA, parsedB)) {
        return -1;
      }

      return 1;
    })
  }, [experience]);

  const photos = useMemo(() => {
    let array = [];
    
    if (!experience) {
      return [];
    }

    if (experience.cover_url) {
      array.push(experience.cover_url);
    }

    if (experience.photos.length) {
      array.push(...experience.photos.map(p => { return p.photo_url }))
    }

    return array;
  }, [experience])

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
              <ExperienceCarousel
                photos={photos}
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
                  
                  <ExperienceDescription>
                    <Like 
                      onPress={isFavorite 
                        ? handleRemoveFromFavorites 
                        : handleShowFavoriteModal
                      }
                      isFavorite={isFavorite}
                    />
                  </ExperienceDescription>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={favoriteModalVisible}
                    onRequestClose={() => {
                      setFavoriteModalVisible(false);
                      setSelectedFolder('Nenhuma pasta')
                      setNewFolder(null)
                    }}
                  >
                    <FolderModalView>
                      <AlignFolder>
                        <ModalTitle style={{ marginTop: 15 }} >Seus favoritos</ModalTitle>
                        <OptionTitle>
                          Pasta escolhida: {selectedFolder}
                        </OptionTitle>
                        <OptionTitle style={styles.center}>Confirmar adição aos favoritos?</OptionTitle>
                        <Row style={{ justifyContent: 'center' }}>
                          <Touchable
                            onPress={() => {
                              setFavoriteModalVisible(false);
                              setSelectedFolder('Nenhuma pasta')
                              setNewFolder(null)
                            }}
                          >
                            <OptionTitle style={styles.red}>Não</OptionTitle>
                          </Touchable>
                          <Touchable onPress={() => handleAddToFavorites()}>
                            <OptionTitle style={styles.green}>Sim</OptionTitle>
                          </Touchable>
                        </Row>
                        <Form>
                          <CreateFolder>
                            <AddComments>
                              <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : undefined}
                                enabled
                              />                    
                              <FormInput 
                                name="folder"
                                placeholder="Crie uma nova pasta"
                                maxLength={100}
                                value={newFolder}
                                onChangeText={(text) => setNewFolder(text)}
                                multiline
                              />
                              <AddCommentButton 
                                onPress={() => {
                                  if (newFolder) {
                                    setSelectedFolder(newFolder)
                                  }
                                }}
                              >
                                <AddCommentIcon source={AddCommentImg} />
                              </AddCommentButton>
                            </AddComments>
                          </CreateFolder>
                        </Form>
                        <Touchable onPress={() => setSelectedFolder('Nenhuma pasta')}>
                          <Folder>
                            <FolderIcon source={FolderImg} />
                            <FolderName>Nenhuma pasta</FolderName>
                          </Folder> 
                        </Touchable>
                        {
                          folders.length
                          && folders.map((f, i) => {
                            return (
                              <Touchable 
                                key={`Touchable:${f}:${i}`}
                                onPress={() => setSelectedFolder(f)}
                              >
                                <Folder key={`Folder:${f}:${i}`} >
                                  <FolderIcon source={FolderImg} />
                                  <FolderName>{f}</FolderName>
                                </Folder> 
                              </Touchable>
                            )
                          })                          
                        }                                               
                      </AlignFolder>
                    </FolderModalView>
                  </Modal>                  
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
                  <DetailsInput>{experience.price > 0 ? `R$ ${experience.price}`: 'Gratuito'}</DetailsInput>
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
                      setAppointmentModalVisible(fals)
                    }}>
                    <ModalView>
                      <AlignCallback>
                        <Title>Resumo do Agendamento</Title>
                      </AlignCallback>
                      {
                        selectedSchedule
                        ? (
                          <Form ref={appointmentFormRef} onSubmit={handleMakeAppointment}>
                            <OptionTitle>
                              Data: {selectedSchedule.formattedDate}, às {selectedSchedule.formattedTime}
                            </OptionTitle>

                            <OptionTitle>
                              Disponibilidade: {selectedSchedule.availability} pessoas
                            </OptionTitle>

                            <OptionTitle>
                              Preço da experiência: {experience.price > 0 ? `R$ ${experience.price}` : 'Gratuito'}
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
                              Preço Final: {experience.price > 0 ? `R$ ${finalPrice}` : 'Gratuito'}
                            </OptionTitle>                            
                            
                            <AlignCallback>
                              <OptionTitle style={styles.center}>Você deseja agendar sua experiência?</OptionTitle>
                              <Row>
                                <Touchable
                                  onPress={() => {
                                    setSelectedSchedule(null)
                                    setAppointmentModalVisible(false)
                                  }}
                                >
                                  <OptionTitle style={styles.red}>Não</OptionTitle>
                                </Touchable>
                                <Touchable 
                                  onPress={() => {
                                    appointmentFormRef.current?.submitForm()
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
                  comments 
                  ? comments.map((review) => {
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
