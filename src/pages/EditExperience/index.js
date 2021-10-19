import React from 'react'
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'
import { useNavigation } from '@react-navigation/native'; 
import { Container, Title, ExperienceTitle, DetailsInput, ExperienceImageView, ExperienceImage, AddExperienceImage, ExperienceDescription, ExperienceDetails, ExperienceDetailsRow, ParentalRating, ParentalRatingOption, PlusImg, ImageDetails, ParentalRatingImg, SaveBtn, SaveBtnText, SaveBtnView } from './styles';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
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
const EditExperience = () => {
  const navigation = useNavigation();
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
        <ExperienceTitle 
        autoCapitalize="words"
        name="title"
        placeholder="Pescaria com Caio Castro"
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
        placeholder="Uma manhã de pescaria com o ator Caio Castro"
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
            placeholder="Fortaleza - CE"
            placeholderTextColor="gray"
            maxLength={100}
            />
          </ExperienceDetailsRow>
          <ExperienceDetailsRow>
            <ImageDetails source={ReferencePointIcon} />
            <DetailsInput
            autoCapitalize="words"
            name="reference-point"
            placeholder="Perto do Trevo Açaí Lago"
            placeholderTextColor="gray"
            maxLength={100}
            />
          </ExperienceDetailsRow>
          <ExperienceDetailsRow>
            <ImageDetails source={DurationIcon} />
            <DetailsInput 
            autoCapitalize="words"
            name="duration"
            placeholder="1 hora"
            placeholderTextColor="gray"
            maxLength={100}
            />
          </ExperienceDetailsRow>
          <ExperienceDetailsRow>
            <ImageDetails source={AmountPeopleIcon} />
            <DetailsInput 
            autoCapitalize="words"
            name="amount-people"
            placeholder="5 pessoas"
            placeholderTextColor="gray"
            maxLength={100}
            />
          </ExperienceDetailsRow>
          <ExperienceDetailsRow>
            <ImageDetails source={PriceIcon} />
            <DetailsInput 
            autoCapitalize="words"
            name="price"
            placeholder="800,00"
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
          <SaveBtnView  
          onPress={() => {
          navigation.navigate('Home')
          }}>
            <SaveBtnText>
            Salvar Alterações
            </SaveBtnText>
          </SaveBtnView>
        </SaveBtn>
      </ScrollView>
    </Container>
  );
};

export default EditExperience;
