import React, { useMemo } from 'react';
import { format, setMonth } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR';

import { Container, Month, Day } from './styles';

const CalendarMonth = ({month, day }) => {
  const formattedMonth = useMemo(() => {
    if (month === undefined) {
      return null;
    }

    const date = setMonth(new Date(), month);

    const monthName = format(date, 'MMMM', { locale: ptBR });

    return monthName.charAt(0).toUpperCase() + monthName.slice(1)
  }, [month]);

  return (
    <Container>
      { month && (<Month>{formattedMonth}</Month>)}
      { day && (<Day>{day}</Day>) }
    </Container>
  );
};

export default CalendarMonth;
