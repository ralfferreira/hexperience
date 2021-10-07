import React from 'react'
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'
import { Container } from './styles';

const CreateExperience = () => {
  return (
    <Container>
      <HeaderWithoutSearch>Nova Experiência</HeaderWithoutSearch>
      <CreateExperience>
        <Title>Título da Experiência</Title>
        <ExperienceTitle />

        <Title>Imagens</Title>
        <ExperienceImage />

        <Title>Descrição</Title>
        <ExperienceDescription />

        <Title>Detalhes</Title>
        <ExperienceDetails>
          <ExperienceAddress>
            <AddressIcon />
            <AddressInput />
          </ExperienceAddress>
          <ExperienceReferencePoint>
            <ReferencePointIcon />
            <ReferencePointInput />
          </ExperienceReferencePoint>
          <ExperienceDuration>
            <DurationIcon />
            <DurationInput />
          </ExperienceDuration>
          <ExperienceAmountPeople>
            <AmountPeopleIcon />
            <AmountPeopleInput />
          </ExperienceAmountPeople>
          <ExperiencePrice>
            <PriceIcon />
            <PriceInput />
          </ExperiencePrice>
        </ExperienceDetails>

        <Title>Classificação Indicativa</Title>
        <ParentalRating>
          <ParentalRatingOption>
            <FreeIcon />
          </ParentalRatingOption>

          <ParentalRatingOption>
            <TenYearsIcon />
          </ParentalRatingOption>

          <ParentalRatingOption>
            <TwelveYearsIcon />
          </ParentalRatingOption>

          <ParentalRatingOption>
            <FourteenYearsIcon />
          </ParentalRatingOption>

          <ParentalRatingOption>
            <EighteenYearsIcon />
          </ParentalRatingOption>
        </ParentalRating>

        <Title>O Que Levar? (Opcional)</Title>
        <ExperienceDescription />
      </CreateExperience>
    </Container>
  );
};

export default CreateExperience;
