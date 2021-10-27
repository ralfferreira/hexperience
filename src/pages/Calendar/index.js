import React from 'react';
import { ScrollView } from 'react-native';

import Header from '../../components/Header'
import FloatButton from '../../components/FloatButton'
import HorizontalCard from '../../components/HorizontalCard'
import CalendarMonth from '../../components/CalendarMonth';

import { useAuth } from '../../hooks/auth';

const ExperienceImg = require('../../assets/img/div-image-experience.png');

import { 
  Container, 
  CalendarHeader, 
  CalendarHeaderTitle, 
  CalendarContent 
} from './styles';

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const Calendar = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Header>Calendário</Header>
      <ScrollView>
        <CalendarHeader>
          <CalendarHeaderTitle>
            {getCurrentYear()}
          </CalendarHeaderTitle>
        </CalendarHeader>
        <CalendarContent>
          <CalendarMonth
            month="Setembro"
            day="23"
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00"
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00"
          />
          <CalendarMonth day="29"/>
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00"
          />
          <CalendarMonth month="Outubro" day="10"/>
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00"
          />
          <CalendarMonth day="31" />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Dia das Bruxas com Caio Castro"
            localizationText="São Roque - SP"
            price="R$ 2050,00"
          />
        </CalendarContent>
      </ScrollView>
      {user.type === 'host' ? <FloatButton /> : <></> }
    </Container>
  );
};

export default Calendar;
