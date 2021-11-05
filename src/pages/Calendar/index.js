import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { getYear, getMonth, getDate, parseISO } from 'date-fns';

import Header from '../../components/Header'
import FloatButton from '../../components/FloatButton'
import HorizontalCard from '../../components/HorizontalCard'
import CalendarMonth from '../../components/CalendarMonth';

import { useAuth } from '../../hooks/auth';
import { useFavorites } from '../../hooks/favorites';

import api from '../../services/api';

import { 
  Container, 
  CalendarHeader, 
  CalendarHeaderTitle, 
  CalendarContent 
} from './styles';

const Calendar = () => {
  const { user } = useAuth();
  const { favoritesRelation } = useFavorites();
  const navigation = useNavigation();

  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    api.get(`/appointments/users/${user.id}`).then((response) => {
      setAppointments(response.data);
    }).catch((err) => {
      Alert.alert(`${err.message}`)
    });
  }, []);

  const handleNavigation = useCallback(({ isHost, exp_id }) => {
    if (isHost) {
      return;
    }
    
    navigation.navigate('ExperienceRoute', { 
      screen: 'Experience',
      params: {
        exp_id
      }
    })
  });

  const formattedData = useMemo(() => {
    if (!appointments) {
      return [];
    }

    const years = [...new Set(appointments.map(a => {
      const { appointment } = a;

      const parsedDate = parseISO(appointment.schedule.date);

      return getYear(parsedDate);
    }))];

    const yearsResult = years.map(y => {
      const fromY = appointments.filter(a => {
        const { appointment } = a;

        const parsedDate = parseISO(appointment.schedule.date);

        if (getYear(parsedDate) === y) {
          return a;
        }
      });

      const months = [...new Set(fromY.map(a => {
        const { appointment } = a;

        const parsedDate = parseISO(appointment.schedule.date);
  
        return getMonth(parsedDate);
      }))];

      const monthsResult = months.map(m => {
        const fromM = fromY.filter(a => {
          const { appointment } = a;

          const parsedDate = parseISO(appointment.schedule.date);
  
          if (getMonth(parsedDate) === m) {
            return a;
          }
        });

        const days = [...new Set(fromY.map(a => {
          const { appointment } = a;

          const parsedDate = parseISO(appointment.schedule.date);
    
          return getDate(parsedDate);
        }))];

        const daysResult = days.map(d => {
          const fromD = fromM.filter(a => {
            const { appointment } = a;

            const parsedDate = parseISO(appointment.schedule.date);
    
            if (getDate(parsedDate) === d) {
              return a;
            }
          });

          return {
            data: fromD,
            day: d
          };
        });

        return {
          month: m,
          days: daysResult
        };
      });

      return {
        year: y,
        months: monthsResult
      };
    });

    return yearsResult;
  }, [appointments]);

  return (
    <Container>
      <Header>Calendário</Header>
      <ScrollView>
        {
          formattedData 
          ? formattedData.map((y, iy) => {
            return (
              <>
                <CalendarHeader key={`CalendarHeader:${y.year}:${iy}`} >
                  <CalendarHeaderTitle key={`CalendarHeaderTitle:${y.year}:${iy}`}>
                    {y.year}
                  </CalendarHeaderTitle>
                </CalendarHeader>
                <CalendarContent key={`CalendarContent:${y.year}:${iy}`} >
                  {
                    y.months.length 
                    ? y.months.map((m, im) => {
                      return (
                        <>    
                          <CalendarMonth 
                            key={`CalendarMonth:${y.year}:${m.month}:${im}`}
                            month={m.month} 
                            day={m.days[0].day} 
                          />
                          {
                            m.days.length 
                            ? m.days.map((d, i) => {
                              return (
                                <>
                                  {
                                    i > 0
                                    ? (
                                      <CalendarMonth
                                        key={`CalendarDay:${y.year}:${m.month}:${d.day}:${i}`}
                                        day={d.day}
                                      />
                                    )
                                    : (<></>)
                                  }
                                  {
                                    d.data.length
                                    ? d.data.map(dt => {
                                      const a = dt.appointment;
                                      const e = a.schedule.experience;

                                      let isFavorite = false;

                                      if (favoritesRelation.find(e => e.exp_id === e.id)) {
                                        isFavorite = true;
                                      }

                                      return (
                                        <HorizontalCard 
                                          key={`Appointment:${y.year}:${m.month}:${d.day}:${a.id}`}
                                          image={e.cover_url}
                                          name={e.name}
                                          address={e.address}
                                          price={e.price}
                                          onPress={() => handleNavigation({
                                            isHost: dt.isHost,
                                            exp_id: e.id
                                          })}
                                          isFavorite={isFavorite}
                                        />
                                      )
                                    })
                                    : (<></>)
                                  }
                                </>
                              )
                            })
                            : (<></>)
                          }
                        </>                       
                      )                      
                    })
                    : (<></>)
                  }
                </CalendarContent>                  
              </>
            )
          })
          : (<></>)
        }
      </ScrollView>
      {user.type === 'host' ? <FloatButton /> : <></> }
    </Container>
  );
};

export default Calendar;
