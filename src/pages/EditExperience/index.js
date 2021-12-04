import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Form } from "@unform/mobile";

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import ExperienceTitleInput from '../../components/ExperienceTitleInput';
import ExperienceDescriptionInput from '../../components/ExperienceDescriptionInput';
import ExperienceDetailsInput from '../../components/ExperienceDetailsInput';
import AddSchedule from '../../components/AddSchedule';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import PlusIcon from '../../assets/img/plusicon.png';
import AddressIcon from '../../assets/img/address.png';
import DurationIcon from '../../assets/img/duration.png';
import AmountPeopleIcon from '../../assets/img/amountpeople.png';
import PriceIcon from '../../assets/img/price.png';
import FreeIcon from '../../assets/img/freeicon.png';
import TenYearsIcon from '../../assets/img/tenyearsicon.png';
import TwelveYearsIcon from '../../assets/img/twelveyearsicon.png';
import FourteenYearsIcon from '../../assets/img/fourteenyearsicon.png';
import SixteenYearsIcon from '../../assets/img/sixteenyearsicon.png';
import EighteenYearsIcon from '../../assets/img/eighteenyearsicon.png';

import { 
  Container, 
  Title,
  ExperienceImageView, 
  ExperienceImage, 
  AddExperienceImage, 
  ExperienceDetails, 
  ExperienceDetailsRow, 
  ParentalRating, 
  ParentalRatingOption, 
  PlusImg, 
  ImageDetails, 
  ParentalRatingImg, 
  SaveBtn, 
  SaveBtnText, 
  SaveBtnView, 
  Touchable,
  ExperienceSchedules
} from './styles';

const EditExperience = () => {
  const updateFormRef = useRef()
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params;

  const [experience, setExperience] = useState({ photos: [], schedules: [] });
  const [duration, setDuration] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [cover, setCover] = useState(null);

  const [parentalRating, setParentalRating] = useState(1);
  const [freeForAll, setFreeForAll] = useState(true);
  const [tenYears, setTenYears] = useState(false);
  const [twelveYears, setTwelveYears] = useState(false);
  const [fourteenYears, setFourteenYears] = useState(false);
  const [sixteenYears, setSixteenYears] = useState(false);
  const [eighteenYears, setEighteenYears] = useState(false);

  const [schedulesModalVisible, setSchedulesModalVisible] = useState(true);

  useEffect(() => {
    api.get(`/experiences/${routeParams.exp_id}/show`).then((response) => {
      setExperience(response.data);
    }).catch((err) => {
      Alert.alert('Erro ao carregar Experiência', `${err.response.data.message}`);
    })
  }, []);

  useEffect(() => {
    if (experience.duration) {
      setDuration(experience.duration)
    }

    if (experience.max_guests) {
      setMaxGuests(experience.max_guests);
    }

    if (experience.cover_url) {
      setCover(experience.cover_url)
    }

    if (experience.parental_rating) {
      handleParentalRating(experience.parental_rating);
    }
  }, [experience]);

  const handleUpdateCover = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (result.cancelled) {
      return;
    }

    const coverForm = new FormData();

    coverForm.append('cover', {
      type: 'image/jpeg',
      name: `cover:${result.uri.substr(-10, 10)}.jpg`,
      uri: result.uri,
    });

    try {
      const response = await api.patch(`/experiences/${experience.id}/cover`, coverForm);

      setExperience(response.data);
    } catch (err) {
      Alert.alert('Erro ao atualizar capa da experiência', `${err.response.data.message}`);
    }
  }, [experience]);

  const handleChangeCoverEvent = useCallback(() => {
    Alert.alert(
      'Atualizar capa',
      'Tem certeza que deseja atualizar a capa da experiência?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => handleUpdateCover(),          
        }
      ]
    );
  }, [handleUpdateCover]);

  const handleUpdatePhoto = useCallback(async (photo_id) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (result.cancelled) {
      return;
    }

    const photoForm = new FormData();

    photoForm.append('photo', {
      type: 'image/jpeg',
      name: `photo:${result.uri.substr(-10, 10)}.jpg`,
      uri: result.uri,
    });

    try {
      const response = await api.patch(
        `/experiences/${experience.id}/photos/${photo_id}`, 
        photoForm
      );

      setExperience(response.data);
    } catch (err) {
      Alert.alert('Erro ao atualizar imagem da experiência', `${err.response.data.message}`);
    }
  }, [experience]);

  const handleDeletePhoto = useCallback((photo_id) => {
    api.delete(`/experiences/${experience.id}/photos/${photo_id}`).then((response) => {
      setExperience(response.data);

      Alert.alert('Sucesso', 'Foto foi excluída com sucesso');      
    }).catch((err) => {
      Alert.alert('Erro ao excluir foto', `${err.response.data.message}`);
    })
  }, [experience]);

  const handlePhotosEvent = useCallback((photo_id) => {
    Alert.alert(
      'Imagem da Experiência',
      'O que deseja fazer?',
      [
        { text: 'Fechar', onPress: () => {}, style: 'cancel' },
        { text: 'Atualizar', onPress: () => handleUpdatePhoto(photo_id) },
        { text: 'Excluir', onPress: () => handleDeletePhoto(photo_id) }
      ]
    )
  }, [handleUpdatePhoto, handleDeletePhoto]);

  const handleAddPhotosEvent = useCallback(async () => {
    if (!cover) {
      await handleUpdateCover();
      return;
    }

    if (experience.photos.length >= 4) {
      Alert.alert('Limite atingido', 'Cada experiência pode ter apenas 5 fotos');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (result.cancelled) {
      return;
    }

    const photoForm = new FormData();

    photoForm.append('photo', {
      type: 'image/jpeg',
      name: `photo:${result.uri.substr(-10, 10)}.jpg`,
      uri: result.uri,
    });

    try {
      const response = await api.patch(
        `/experiences/${experience.id}/photos`, 
        photoForm
      );

      setExperience(response.data);
    } catch (err) {
      Alert.alert('Erro ao atualizar imagem da experiência', `${err.response.data.message}`);
    }
  }, [cover, experience]);

  const handleParentalRating = useCallback((age) => {
    setParentalRating(age);
    switch (age) {
      case 10:
        setFreeForAll(false);
        setTenYears(true);
        setTwelveYears(false);
        setFourteenYears(false);
        setSixteenYears(false);
        setEighteenYears(false);
        break;
      case 12:
        setFreeForAll(false);
        setTenYears(false);
        setTwelveYears(true);
        setFourteenYears(false);
        setSixteenYears(false);
        setEighteenYears(false);
        break;
      case 14:
        setFreeForAll(false);
        setTenYears(false);
        setTwelveYears(false);
        setFourteenYears(true);
        setSixteenYears(false);
        setEighteenYears(false);
        break;
      case 16:
        setFreeForAll(false);
        setTenYears(false);
        setTwelveYears(false);
        setFourteenYears(false);
        setSixteenYears(true);
        setEighteenYears(false);
        break;
      case 18:
        setFreeForAll(false);
        setTenYears(false);
        setTwelveYears(false);
        setFourteenYears(false);
        setSixteenYears(false);
        setEighteenYears(true);
        break;
      default:
        setFreeForAll(true);
        setTenYears(false);
        setTwelveYears(false);
        setFourteenYears(false);
        setSixteenYears(false);
        setEighteenYears(false);
        break;
    }
  }, []);

  const handleSubmit = useCallback(() => {
    try {

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        updateFormRef.current?.setErrors(errors);

        Alert.alert(
          'Erro ao atualizar experiência',
          `${err.message}`
        );

        return;
      }  

      Alert.alert(
        'Erro ao atualizar experiência',
        `${err.response.data.message}`
      );
    }
  }, []);  

  return (
    <Container>
      <HeaderWithoutSearch>
        Editar Experiência
      </HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        />
        <Form 
          ref={updateFormRef} 
          onSubmit={handleSubmit}
          initialData={{ 
            title: experience.name,
            description: experience.description,
            address: experience.address,
            duration: duration.toString(),
            amount_people: maxGuests.toString(),
            price: experience.price,
            requirements: experience.requirements
          }}
        >
          <ExperienceTitleInput 
            autoCapitalize="words"
            name="title"
            placeholder="Titulo da Experiência"
            placeholderTextColor="gray"
            maxLength={200}
            multiline
          />

          <Title>Imagens</Title>
          <ExperienceImageView>
            {
              cover && 
              <Touchable onPress={handleChangeCoverEvent}> 
                <ExperienceImage 
                  source={{ uri: cover }} 
                />
              </Touchable>
            }
            {
              experience.photos.length
              ? experience.photos.map(photo => {
                return (
                  <Touchable onPress={() => handlePhotosEvent(photo.id)}>
                    <ExperienceImage 
                      source={{ uri: photo.photo_url }} 
                    />
                  </Touchable>
                )
              })
              : (<></>)
            }
            <AddExperienceImage onPress={handleAddPhotosEvent}>
              <PlusImg source={PlusIcon} />
            </AddExperienceImage>
          </ExperienceImageView>

          <Title>Descrição</Title>
          <ExperienceDescriptionInput 
            autoCapitalize="words"
            name="description"
            placeholder="Descreva sua experiência para o mundo!"
            placeholderTextColor="gray"
            maxLength={300}
            multiline
          />

          <Title>Detalhes</Title>
          <ExperienceDetails>
            <ExperienceDetailsRow>
              <ImageDetails source={AddressIcon} />
              <ExperienceDetailsInput 
                autoCapitalize="words"
                name="address"
                placeholder="Endereço da experiência"
                placeholderTextColor="gray"
                maxLength={100}
              />
            </ExperienceDetailsRow>
            <ExperienceDetailsRow>
              <ImageDetails source={DurationIcon} />
              <ExperienceDetailsInput 
                keyboardType="number-pad"                
                name="duration"
                placeholder="Duração da experiência em minutos"
                placeholderTextColor="gray"
                maxLength={100}                
              />
            </ExperienceDetailsRow>
            <ExperienceDetailsRow>
              <ImageDetails source={AmountPeopleIcon} />
              <ExperienceDetailsInput 
                keyboardType="number-pad"  
                name="amount_people"
                placeholder="Quantidade de pessoas por horário"
                placeholderTextColor="gray"
                maxLength={100}
              />
            </ExperienceDetailsRow>
            <ExperienceDetailsRow>
              <ImageDetails source={PriceIcon} />
              <ExperienceDetailsInput 
                keyboardType="number-pad"  
                name="price"
                placeholder="Preço"
                placeholderTextColor="gray"
                maxLength={100}
              />
            </ExperienceDetailsRow>
          </ExperienceDetails>

          <Title>Classificação Indicativa</Title>
          <ParentalRating>
            <ParentalRatingOption
              style={freeForAll ? styles.parentalRating : {}}
              onPress={() => handleParentalRating(1)}
            >
              <ParentalRatingImg source={FreeIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption
              style={tenYears ? styles.parentalRating : {}}
              onPress={() => handleParentalRating(10)}
            >
              <ParentalRatingImg source={TenYearsIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption
              style={twelveYears ? styles.parentalRating : {}}
              onPress={() => handleParentalRating(12)}
            >
              <ParentalRatingImg source={TwelveYearsIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption
              style={fourteenYears ? styles.parentalRating : {}}
              onPress={() => handleParentalRating(14)}
            >
              <ParentalRatingImg source={FourteenYearsIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption
              style={sixteenYears ? styles.parentalRating : {}}
              onPress={() => handleParentalRating(16)}
            >
              <ParentalRatingImg source={SixteenYearsIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption
              style={eighteenYears ? styles.parentalRating : {}}
              onPress={() => handleParentalRating(18)}
            >
              <ParentalRatingImg source={EighteenYearsIcon} />
            </ParentalRatingOption>
          </ParentalRating>

          <Title>O Que Levar? (Opcional)</Title>
          <ExperienceDescriptionInput
            autoCapitalize="words"
            name="requirements"
            placeholder="O que levar na sua experiência? (Opcional)"
            placeholderTextColor="gray"
            maxLength={300}
            multiline
          />

          <Title>Horários</Title>
          <ExperienceSchedules horizontal={true} showsHorizontalScrollIndicator={false}>
            {
              experience.schedules.length
              ? experience.schedules.map(schedule => {
                return (
                  <AddSchedule 
                    key={`AddSchedule:${schedule.id}`}
                    datetime={schedule.date}                  
                  />
                )
              })
              : (<></>)
            }
            <AddExperienceImage onPress={() => setSchedulesModalVisible(true)}>              
              <PlusImg source={PlusIcon} />
            </AddExperienceImage>
          </ExperienceSchedules>
          <SaveBtn>
            <SaveBtnView 
              onPress={() => { 
                updateFormRef.current?.submitForm();
              }}
            >
              <SaveBtnText>Salvar Alterações</SaveBtnText>
            </SaveBtnView>
          </SaveBtn>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default EditExperience;
