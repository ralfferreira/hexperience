import React from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

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
        <ExperienceTitle 
          autoCapitalize="words"
          name="title"
          placeholder="Título da Experiência"
          placeholderTextColor="gray"
          maxLength={100}
        />

        <Title>Imagens</Title>
        <ExperienceImageView>
          <ExperienceImage source={ExperienceImg} />
          <AddExperienceImage>
            <PlusImg source={PlusIcon} />
          </AddExperienceImage>
        </ExperienceImageView>

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
              name="amount-people"
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
          name="description"
          placeholder="O que levar na sua experiência? (Opcional)"
          placeholderTextColor="gray"
          maxLength={300}
        />
        <SaveBtn>
          <SaveBtnView onPress={() => { navigation.navigate('Home') }}>
            <SaveBtnText>Criar Experiência</SaveBtnText>
          </SaveBtnView>
        </SaveBtn>
      </ScrollView>
    </Container>
  );
};

export default CreateExperience;
