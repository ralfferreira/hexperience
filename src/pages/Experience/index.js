import React from 'react'
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import ExperienceCategory from '../../components/ExperienceCategory';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import ExperienceImg from '../../assets/img/div-image-experience.png'
import ReportImg from '../../assets/img/report-experience.png'
import FavoriteImg from '../../assets/img/heart-icon.png'
import Rating from '../../components/Rating'
import HostProfileImg from '../../assets/img/host-profile.png'
import { Container, ExperienceImage } from './styles';

const Experience = () => {
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
        <ExperienceReport>
          <ReportImage source={ReportImg} />
        </ExperienceReport>
        <ExperienceRating>
          <Rating />
        </ExperienceRating>
        <ExperienceCategory>Pescaria</ExperienceCategory>
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

          <ExperienceParentalRating>
            <ParentalRatingOption>
              <ParentalRatingImg source={TwelveYearsIcon} />
            </ParentalRatingOption>
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
          <Comment>
            <CommentRow>
              <CommentProfile source={UserProfileImg} />
              <CommentName>Sofia</CommentName>
              <Rating />
              <CommentDate>Sábado, 30 de outubro, 09:00</CommentDate>
            </CommentRow>
              <CommentContent>
                <CommentContentText>
                  Adorei!!! Tudo muito lindooooo, ai que tudo!
                </CommentContentText>
              </CommentContent>
          </Comment>
        </CommentsList>
        
      </ScrollView>
    </Container>
  );
};

export default Experience;
