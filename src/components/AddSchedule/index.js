import React, { useMemo } from 'react';
import { format, addMinutes, parseISO } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR';

import { 
  Experience, 
  ExperienceDate, 
  ExperienceTime, 
  ExperienceButton, 
  ExperienceButtonText 
} from './styles';

const AddSchedule = ({datetime, onPress, duration }) => {
  const date = useMemo(() => {
    const parsedDate = parseISO(datetime);

    const date = format(parsedDate, "EEEE',' dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,            
    }); 

    const dateText = date.charAt(0).toUpperCase() + date.slice(1);

    return dateText
  }, [datetime]);

  const time = useMemo(() => {
    const parsedDate = parseISO(datetime);

    const startsAt = format(parsedDate, "HH:mm", {
      locale: ptBR
    });

    const endsAt = format(addMinutes(parsedDate, duration), "HH:mm", {
      locale: ptBR
    });

    return `${startsAt} - ${endsAt}`
  }, [datetime, duration]);

  return (
    <Experience>
      <ExperienceDate>{date}</ExperienceDate>
      <ExperienceTime>{time}</ExperienceTime>
    </Experience>
  );
};

export default AddSchedule;
