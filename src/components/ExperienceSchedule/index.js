import React from 'react'
import { Experience, ExperienceDate, ExperienceTime, ExperienceButton, ExperienceButtonText } from './styles';

const ExperienceSchedule = ({date, time, onPress, buttonText }) => {
  return (
    <Experience>
      <ExperienceDate>{date}</ExperienceDate>
      <ExperienceTime>{time}</ExperienceTime>
      <ExperienceButton onPress={onPress} >
        <ExperienceButtonText>{buttonText ? buttonText : 'Agendar'}</ExperienceButtonText>
      </ExperienceButton>
    </Experience>
  );
};

export default ExperienceSchedule;
