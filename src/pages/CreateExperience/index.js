import React, { useRef, useCallback, useEffect, useState } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Form } from "@unform/mobile";
import * as Yup from 'yup'
import * as ImagePicker from 'expo-image-picker';
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'

import PlusIcon from '../../assets/img/plusicon.png';
import AddressIcon from '../../assets/img/address.png';
import ReferencePointIcon from '../../assets/img/referencepoint.png';
import DurationIcon from '../../assets/img/duration.png';
import AmountPeopleIcon from '../../assets/img/amountpeople.png';
import PriceIcon from '../../assets/img/price.png';
import ExperienceImg from '../../assets/img/div-image-experience.png'
import FreeIcon from '../../assets/img/freeicon.png';
import TenYearsIcon from '../../assets/img/tenyearsicon.png';
import TwelveYearsIcon from '../../assets/img/twelveyearsicon.png';
import FourteenYearsIcon from '../../assets/img/fourteenyearsicon.png';
import EighteenYearsIcon from '../../assets/img/eighteenyearsicon.png';

import { 
  Container, 
  Title, 
  ExperienceTitle, 
  DetailsInput, 
  ExperienceImageView, 
  ExperienceImage, 
  AddExperienceImage, 
  ExperienceDescription, 
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

const CreateExperience = () => {
  const navigation = useNavigation();
  const formRef = useRef(null);

  const [cover, setCover] = useState(null);
  const [parentalRating, setParentalRating] = useState(1);

  const handleSubmit = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('Título é obrigatório'),
        description: Yup.string().required('Descrição é obrigatório'),
        address: Yup.string().required('Descrição é obrigatório'),
        duration: Yup.number().required('Duração é obrigatório'),
        amount_people: Yup.number().required('Número de pessoas por horário é obrigatório'),
        price: Yup.number().required('Preço é obrigatorio'),
        requirements: Yup.string().optional()
      });

      await schema.validate(data, {
        abortEarly: false
      });


    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        return
      }

      Alert.alert(
        'Erro na autenticação',
        `${err}`
      );
    }
  }, []);
  const [image, setImage] = useState(null);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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

        <Title>Imagens</Title>
        <ExperienceImageView>
          {image && <ExperienceImage source={{ uri: image }} /> }
          <AddExperienceImage onPress={pickImage}>
            <PlusImg source={PlusIcon} />
          </AddExperienceImage>
        </ExperienceImageView>

        <Form ref={formRef} onSubmit={handleSubmit} >
          <ExperienceTitle 
            autoCapitalize="words"
            name="title"
            placeholder="Título da Experiência"
            placeholderTextColor="gray"
            maxLength={100}
          />

          <Title>Descrição</Title>
          <ExperienceDescription 
            autoCapitalize="words"
            name="description"
            placeholder="Descreva sua experiência para o mundo!"
            placeholderTextColor="gray"
            maxLength={300}
          />

          <Title>Detalhes</Title>
          <ExperienceDetails>
            <ExperienceDetailsRow>
              <ImageDetails source={AddressIcon} />
              <DetailsInput 
                autoCapitalize="words"
                name="address"
                placeholder="Endereço da experiência"
                placeholderTextColor="gray"
                maxLength={100}
              />
            </ExperienceDetailsRow>
            <ExperienceDetailsRow>
              <ImageDetails source={ReferencePointIcon} />
              <DetailsInput
                autoCapitalize="words"
                name="reference-point"
                placeholder="Ponto de referência"
                placeholderTextColor="gray"
                maxLength={100}
              />
            </ExperienceDetailsRow>
            <ExperienceDetailsRow>
              <ImageDetails source={DurationIcon} />
              <DetailsInput 
                autoCapitalize="words"
                name="duration"
                placeholder="Duração da experiência"
                placeholderTextColor="gray"
                maxLength={100}
              />
            </ExperienceDetailsRow>
            <ExperienceDetailsRow>
              <ImageDetails source={AmountPeopleIcon} />
              <DetailsInput 
                autoCapitalize="words"
                name="amount_people"
                placeholder="Quantidade de pessoas por horário"
                placeholderTextColor="gray"
                maxLength={100}
              />
            </ExperienceDetailsRow>
            <ExperienceDetailsRow>
              <ImageDetails source={PriceIcon} />
              <DetailsInput 
                autoCapitalize="words"
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
          </ParentalRating>

          <Title>O Que Levar? (Opcional)</Title>
          <ExperienceDescription
            autoCapitalize="words"
            name="requirements"
            placeholder="O que levar na sua experiência? (Opcional)"
            placeholderTextColor="gray"
            maxLength={300}
          />
          <SaveBtn>
            <SaveBtnView onPress={() => { navigation.navigate('Home') }}>
              <SaveBtnText>Criar Experiência</SaveBtnText>
            </SaveBtnView>
          </SaveBtn>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default CreateExperience;
