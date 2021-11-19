import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Form } from "@unform/mobile";

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import ExperienceTitleInput from '../../components/ExperienceTitleInput';
import ExperienceDescriptionInput from '../../components/ExperienceDescriptionInput';
import ExperienceDetailsInput from '../../components/ExperienceDetailsInput';

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
  SaveBtnView 
} from './styles';

const EditExperience = () => {
  const formRef = useRef()
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params;

  const [experience, setExperience] = useState({});

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    api.get(`/experiences/${routeParams.exp_id}/show`).then((response) => {
      setExperience(response.data);
    }).catch((err) => {
      Alert.alert('Erro ao carregar Experiência', `${err.response.data.message}`);
    })
  }, []);

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
  }, []);

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
  }, []);

  const handleDeletePhoto = useCallback((photo_id) => {
    api.delete(`/experiences/${experience.id}/photos/${photo_id}`).then(() => {
      api.get(`/experiences/${experience.id}/show`).then((response) => {
        setExperience(response.data);

        Alert.alert('Sucesso', 'Foto foi excluída com sucesso');
      }).catch((err) => {
        Alert.alert('Erro ao excluir foto', `${err.response.data.message}`);
      });
      
    }).catch((err) => {
      Alert.alert('Erro ao excluir foto', `${err.response.data.message}`);
    })
  }, []);

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

  const handleSubmit = useCallback(() => {}, []);  

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
          ref={formRef} 
          onSubmit={handleSubmit}
          initialData={{ 
            title: experience.name,
            description: experience.description,
            address: experience.address,
            duration: experience.duration.toString(),
            amount_people: experience.max_guests.toString(),
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
              experience.cover_url && 
              <ExperienceImage 
                source={{ uri: experience.cover_url }} 
              />
            }
            {
              experience.photos.length
              ? experience.photos.map(photo => {
                return (
                  <ExperienceImage 
                    source={{ uri: photo.photo_url }} 
                  />
                )
              })
              : (<></>)
            }
            <AddExperienceImage>
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
            <ParentalRatingOption>
              <ParentalRatingImg source={FreeIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption>
              <ParentalRatingImg source={TenYearsIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption>
              <ParentalRatingImg source={TwelveYearsIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption>
              <ParentalRatingImg source={FourteenYearsIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption>
              <ParentalRatingImg source={EighteenYearsIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption>
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
          <SaveBtn>
            <SaveBtnView onPress={() => { navigation.navigate('Home') }}>
              <SaveBtnText>Salvar Alterações</SaveBtnText>
            </SaveBtnView>
          </SaveBtn>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default EditExperience;
