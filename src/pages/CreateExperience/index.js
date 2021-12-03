import React, { useRef, useCallback, useEffect, useState } from 'react'
import { ScrollView, KeyboardAvoidingView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Form } from "@unform/mobile";
import * as Yup from 'yup'
import * as ImagePicker from 'expo-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import ExperienceTitleInput from '../../components/ExperienceTitleInput';
import ExperienceDescriptionInput from '../../components/ExperienceDescriptionInput';
import ExperienceDetailsInput from '../../components/ExperienceDetailsInput';

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
  ExperienceDetailsRowAddress,
  ParentalRating, 
  ParentalRatingOption, 
  PlusImg, 
  ImageDetails, 
  ParentalRatingImg, 
  SaveBtn, 
  SaveBtnText, 
  SaveBtnView,
  ExperienceImageCarrousel,
  Touchable,
} from './styles';

const CreateExperience = () => {
  const navigation = useNavigation();
  const formRef = useRef(null);

  const [cover, setCover] = useState(null);
  const [photos, setPhotos] = useState([]);

  const [parentalRating, setParentalRating] = useState(1);
  const [freeForAll, setFreeForAll] = useState(true);
  const [tenYears, setTenYears] = useState(false);
  const [twelveYears, setTwelveYears] = useState(false);
  const [fourteenYears, setFourteenYears] = useState(false);
  const [sixteenYears, setSixteenYears] = useState(false);
  const [eighteenYears, setEighteenYears] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleSubmit = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('Título é obrigatório'),
        description: Yup.string().required('Descrição é obrigatório'),
        address: Yup.string().required('Descrição é obrigatório'),
        duration: Yup.number().max(360).required('Duração é obrigatório'),
        amount_people: Yup.number().required('Número de pessoas por horário é obrigatório'),
        price: Yup.number().min(0).required('Preço é obrigatorio'),
        requirements: Yup.string().optional()
      });

      await schema.validate(data, {
        abortEarly: false
      });

      if (!cover) {
        throw new Error('No minimo uma mensagem deve ser enviada');
      }

      const result = await api.post('/experiences', {
        name: data.title,
        duration: data.duration,
        description: data.description,
        price: data.price,
        requirements: data.requirements,
        parental_rating: parentalRating,
        max_guests: data.amount_people,
        is_online: data.address ? false : true,
        category_id: 1
      });

      const coverData = new FormData();

      coverData.append('photo', {
        type: 'image/jpeg',
        name: `cover:${result.data.name}:${result.data.id}.jpg`,
        uri: cover,
      })

      await api.post(`/experiences/${result.data.id}/cover`, coverData);

      for (const photo of photos) {
        const photoData = new FormData();

        photoData.append('photo', {
          type: 'image/jpeg',
          name: `photo:${result.data.id}.jpg`,
          uri: photo,
        });

        await api.post(`/experiences/${result.data.id}/photos`, photoData);
      }

      navigation.navigate('Home');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        Alert.alert(
          'Erro ao criar experiência',
          `${err.message}`
        );

        return;
      }  

      Alert.alert(
        'Erro ao criar experiência',
        `${err.response.data.message}`
      );
    }
  }, [parentalRating, cover, photos, navigation]);  

  const handlePickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (!cover) {
      setCover(result.uri);
      return;
    }

    if (photos.length >= 4) {
      Alert.alert('Limite atingido', 'Só é possível subir 5 imagens por experiência');
      
      return;
    }

    setPhotos([...photos, result.uri]);
  }, [cover, photos]);

  const handleCoverDecision = useCallback(() => {
    Alert.alert(
      'Capa da experiência',
      'O que deseja fazer com a capa da experiência?',
      [
        { text: 'Fechar', style: 'cancel', onPress: () => {} },
        { text: 'Alterar', style: 'default', onPress: () => handleChangeCover().finally(() => {}) },

      ]
    )
  }, [handleChangeCover]);

  const handleChangeCover = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    setCover(result.uri);
  }, [cover]);

  const handlePhotoDecision = useCallback(async (i) => {
    Alert.alert(
      'Foto da experiência',
      'O que deseja fazer com esta foto da experiência?',
      [
        { text: 'Fechar', style: 'cancel', onPress: () => {} },
        { text: 'Alterar', style: 'default', onPress: () => handleChangePhoto(i).finally(() => {}) },
        { text: 'Remover', style: 'destructive', onPress: () => handleRemovePhoto(i) }
      ]
    )
  }, []);

  const handleChangePhoto = useCallback(async (i) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    const uris = photos;
    uris.splice(i, 1, result.uri);
    setPhotos([...uris]);
  }, [photos]);

  const handleRemovePhoto = useCallback((i) => {
    const uris = photos;
    uris.splice(i, 1);

    setPhotos([...uris]);
  }, [photos]);

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

  return (
    <Container>
      <HeaderWithoutSearch>
        Nova Experiência
      </HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        />        
        <Form ref={formRef} onSubmit={handleSubmit} >          
          <ExperienceTitleInput 
            autoCapitalize="words"
            name="title"
            placeholder="Título da Experiência"
            placeholderTextColor="gray"
            maxLength={100}
            multiline
          />

          <Title>Imagens</Title>
          <ExperienceImageView>
            <ExperienceImageCarrousel horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                cover && 
                <Touchable onPress={handleCoverDecision}>
                  <ExperienceImage 
                    source={{ uri: cover }}
                  /> 
                </Touchable>
              }
              {
                photos.length >= 1
                ? photos.map((photo, i) => {
                  return (
                    <Touchable 
                      key={`Touchable:${photo}:${i}`}
                      onPress={() => handlePhotoDecision(i)}
                    >
                      <ExperienceImage key={`Photo:${photo}:${i}`} source={{uri: photo}} />
                    </Touchable>
                  )
                })
                : (<></>)
              }
              <AddExperienceImage onPress={handlePickImage}>
                <PlusImg source={PlusIcon} />
              </AddExperienceImage>   
            </ExperienceImageCarrousel>
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
            <ExperienceDetailsRowAddress>
              <ImageDetails source={AddressIcon} />
              <GooglePlacesAutocomplete
                placeholder='Endereço da experiência'
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                }}
                query={{
                  key: 'AIzaSyAI34vLZy3XXfTtGuP9yUafYlj4oW43Hu0',
                  language: 'pt-br',
                }}
                fetchDetails={true}
                styles={{ 
                  listView:{height:100},
                  textInput: {
                    paddingVertical: 0,
                    paddingBottom: 15,
                    paddingHorizontal: 0,
                    fontSize: 14,
                  },
                }}
              />
            </ExperienceDetailsRowAddress>
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
          <SaveBtn>
            <SaveBtnView 
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              <SaveBtnText>Criar Experiência</SaveBtnText>
            </SaveBtnView>
          </SaveBtn>
        </Form>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  parentalRating: {
    borderColor: '#818f81',
    borderWidth: 3
  }
});

export default CreateExperience;
