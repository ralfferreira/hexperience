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

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get(`/appointments/users/${user.id}`).then((response) => {
      setAppointments(response.data);
    }).catch((err) => {
      Alert.alert('Erro ao carregar agendamentos', `${err.response.data.message}`)
    });
  }, []);

  const handleNavigation = useCallback((appointment_id) => {
    navigation.navigate('ExperienceRoute', { 
      screen: 'CalendarExperience',
      params: {
        appointment_id
      }
    })
  }, [navigation]);

  const formattedData = useMemo(() => {
    if (!appointments.length) {
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

          const formattedAppointment = fromD.map(entry => {
            const { appointment, isHost } = entry;

            const { experience } = appointment.schedule;

            let isFavorite = false;

            if (favoritesRelation.length) {
              if (favoritesRelation.find(fav => fav.exp_id === experience.id)) {
                isFavorite = true;
              }
            }

            return {
              appointment: appointment,
              isFavorite: isFavorite,
              isHost: isHost
            };
          });

          return {
            data: formattedAppointment,
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
  }, [appointments, favoritesRelation]);

  return (
    <Container>
      <Header>Calendário</Header>
      <ScrollView>
        {
          formattedData.length
          ? formattedData.map((y) => {
            return (
              <React.Fragment key={`YearFragment:${y.year}`}>
                <CalendarHeader key={`CalendarHeader:${y.year}`} >
                  <CalendarHeaderTitle key={`CalendarHeaderTitle:${y.year}`}>
                    {y.year}
                  </CalendarHeaderTitle>
                </CalendarHeader>
                <CalendarContent key={`CalendarContent:${y.year}`} >
                  {
                    y.months.length 
                    ? y.months.map((m) => {
                      return (
                        <React.Fragment key={`MonthFragment:${m.month}:${y.year}`}>    
                          <CalendarMonth 
                            key={`CalendarMonth:${m.month}:${y.year}`}
                            month={m.month} 
                            day={m.days[0].day} 
                          />
                          {
                            m.days.length 
                            ? m.days.map((d, i) => {
                              return (
                                <React.Fragment key={`DayFragment:${d.day}:${m.month}:${y.year}`}>
                                  {
                                    i > 0
                                    ? (
                                      <CalendarMonth
                                        key={`CalendarDay:${d.day}:${m.month}:${y.year}`}
                                        day={d.day}
                                      />
                                    )
                                    : (<React.Fragment key={`FirstDayFragment:${d.day}:${m.month}:${y.year}`}></React.Fragment>)
                                  }
                                  {
                                    d.data.length
                                    ? d.data.map(dt => {
                                      const a = dt.appointment;                                      
                                      const e = a.schedule.experience;

                                      return (
                                        <HorizontalCard 
                                          key={`Appointment:${d.day}:${m.month}:${y.year}:${a.id}`}
                                          image={e.cover_url}
                                          name={e.name}
                                          address={e.address}
                                          price={e.price}
                                          onPress={() => handleNavigation(a.id)}
                                          isFavorite={dt.isFavorite}
                                        />
                                      )
                                    })
                                    : (<React.Fragment key={`EmptyDataFragment:${d.day}:${m.month}:${y.year}`}></React.Fragment>)
                                  }
                                </React.Fragment>
                              )
                            })
                            : (<React.Fragment key={`EmptyMonthFragment:${m.month}:${y.year}`}></React.Fragment>)
                          }
                        </React.Fragment>                       
                      )                      
                    })
                    : (<React.Fragment key={`EmptyYearFragment:${y.year}`}></React.Fragment>)
                  }
                </CalendarContent>                  
              </React.Fragment>
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
