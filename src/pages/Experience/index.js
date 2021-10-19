import React from 'react'
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import ExperienceCategory from '../../components/ExperienceCategory';
import ExperienceSchedule from '../../components/ExperienceSchedule';
import Comment from '../../components/Comment';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import ReportImg from '../../assets/img/report-experience.png'
import FavoriteImg from '../../assets/img/heart-icon.png'
import Rating from '../../components/Rating'
import HostProfileImg from '../../assets/img/host-profile.png'
import AddressIcon from '../../assets/img/address.png';
import ReferencePointIcon from '../../assets/img/referencepoint.png';
import DurationIcon from '../../assets/img/duration.png';
import AmountPeopleIcon from '../../assets/img/amountpeople.png';
import PriceIcon from '../../assets/img/price.png';
import ExperienceImg from '../../assets/img/div-image-experience.png'
import FreeIcon from '../../assets/img/freeicon.png';
import { useNavigation } from '@react-navigation/native'; 
import { Container, ExperienceImage, ExperienceTitle, ExperienceOptions, ExperienceReport, ReportImage, ExperienceRating, ExperienceFavorite, ExperienceHost, ExperienceHostProfile, ExperienceHostName, Title, ExperienceDescription, Description, ExperienceDetails, ExperienceDetailsRow, ImageDetails, DetailsInput, ExperienceParentalRating, ParentalRatingImg, ExperienceWhatTake, ExperienceSchedules, CommentsList } from './styles';

const Experience = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <HeaderWithoutSearch>Experiência</HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
        />
      <ExperienceImage source={ExperienceImg} />
      <ExperienceTitle>Pescaria com Caio Castro</ExperienceTitle>
      <ExperienceOptions>
        <ExperienceReport onPress={() => {
          navigation.navigate('ReportExperience')
          }}>
          <ReportImage source={ReportImg} />
        </ExperienceReport>
        <ExperienceRating>
          <Rating />
        </ExperienceRating>
        <ExperienceCategory name="Pesca"></ExperienceCategory>
        <ExperienceFavorite source={FavoriteImg} />
      </ExperienceOptions>

      <ExperienceHost>
        <ExperienceHostProfile source={HostProfileImg} />
        <ExperienceHostName>Carlos</ExperienceHostName>
      </ExperienceHost>

      <Title>Descrição</Title>
        <ExperienceDescription>
          <Description>Uma manhã de pescaria com o ator Caio Castro</Description>
        </ExperienceDescription>

      <Title>Detalhes</Title>
        <ExperienceDetails>
          <ExperienceDetailsRow>
            <ImageDetails source={AddressIcon} />
            <DetailsInput>
            Fortaleza - CE
            </DetailsInput>
          </ExperienceDetailsRow>
          <ExperienceDetailsRow>
            <ImageDetails source={ReferencePointIcon} />
            <DetailsInput>
            Perto do Trevo Açaí Lago
            </DetailsInput>
          </ExperienceDetailsRow>
          <ExperienceDetailsRow>
            <ImageDetails source={DurationIcon} />
            <DetailsInput>
            1 hora
            </DetailsInput>
          </ExperienceDetailsRow>
          <ExperienceDetailsRow>
            <ImageDetails source={AmountPeopleIcon} />
            <DetailsInput>
            5 pessoas
            </DetailsInput>
          </ExperienceDetailsRow>
          <ExperienceDetailsRow>
            <ImageDetails source={PriceIcon} />
            <DetailsInput>
            800,00
            </DetailsInput>
          </ExperienceDetailsRow>

          <Title>Classificação Indicativa</Title>
          <ExperienceParentalRating>
            <ParentalRatingImg source={FreeIcon} />
          </ExperienceParentalRating>
        </ExperienceDetails>

        <Title>O Que Levar (Opcional)</Title>
        <ExperienceWhatTake>Nada</ExperienceWhatTake>

        <Title>Agendamentos</Title>
        <ExperienceSchedules horizontal={true} showsHorizontalScrollIndicator={false}>
          <ExperienceSchedule 
          date="Sábado, 30 de outubro"
          time="09:00 - 10:00"
          />
          <ExperienceSchedule 
          date="Domingo, 31 de outubro"
          time="09:00 - 10:00"
          />
          <ExperienceSchedule 
          date="Quinta, 30 de outubro"
          time="09:00 - 10:00"
          />
          <ExperienceSchedule 
          date="Quinta, 30 de outubro"
          time="09:00 - 10:00"
          />
          <ExperienceSchedule 
          date="Quinta, 30 de outubro"
          time="09:00 - 10:00"
          />
          <ExperienceSchedule 
          date="Quinta, 30 de outubro"
          time="09:00 - 10:00"
          />
        </ExperienceSchedules>

        <Title>Comentários</Title>
        <CommentsList>
          <Comment
          name="Luffy"
          content="Adorei!!! Tudo muito lindooooo, ai que tudo!"
          date="Sábado, 30 de outubro, 09:00"
          >
          </Comment>
        </CommentsList>
        
      </ScrollView>
    </Container>
  );
};

export default Experience;
