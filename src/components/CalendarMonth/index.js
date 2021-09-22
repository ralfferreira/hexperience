import React from 'react';
import { Container, Month, Day } from './styles';

const CalendarMonth = ({month, day }) => {
  return (
    <Container>
      <Month>{(month)}</Month>
      <Day>{(day)}</Day>
    </Container>
  );
};

export default CalendarMonth;
