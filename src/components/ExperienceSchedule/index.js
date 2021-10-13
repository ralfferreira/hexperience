import React from 'react'
import { Experience, ExperienceDate, ExperienceTime, ExperienceButton, ExperienceButtonText } from './styles';

const ExperienceSchedule = ({date, time }) => {
  return (
    <Experience>
      <ExperienceDate>{date}</ExperienceDate>
      <ExperienceTime>{time}</ExperienceTime>
      <ExperienceButton>
        <ExperienceButtonText>Agendar</ExperienceButtonText>
      </ExperienceButton>
    </Experience>
  );
};

export default ExperienceSchedule;
