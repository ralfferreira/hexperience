import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ScrollView, Alert, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { getYear, getMonth, getDate, parseISO } from 'date-fns';

import Header from '../../components/Header'
import FloatButton from '../../components/FloatButton'
import HorizontalCard from '../../components/HorizontalCard'
import CalendarMonth from '../../components/CalendarMonth';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

const ExperienceImg = require('../../assets/img/div-image-experience.png');

import { 
  Container, 
  CalendarHeader, 
  CalendarHeaderTitle, 
  CalendarContent 
} from './styles';

const Calendar = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [appointments, setAppointments] = useState(null);
  const [formating, setFormating] = useState(true);

  useEffect(() => {
    api.get(`/appointments/users/${user.id}`).then((response) => {
      setAppointments(response.data);
    }).catch((err) => {
      Alert.alert(`${err.message}`)
    });
  }, []);

  useEffect(() => {
    if (!formattedData) {
      return;
    }

    setFormating(false);
  }, [formattedData]);

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
      return null;
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
          formating
          ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#999" />
            </View>
          )
          : formattedData.length 
            ? formattedData.map(y => {
              return (
                <>
                  <CalendarHeader key={`CalendarHeader:${y.year}`} >
                    <CalendarHeaderTitle key={`CalendarHeaderTitle:${y.year}`}>
                      {y.year}
                    </CalendarHeaderTitle>
                  </CalendarHeader>
                  <CalendarContent key={`CalendarContent:${y.year}`} >
                  {
                    y.months.length 
                    ? y.months.map(m => {
                      return (
                        <>                    
                          <CalendarMonth 
                            key={`CalendarMonth:${y.year}:${m.month}`}
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
                                        key={`CalendarMonth:${y.year}:${m.month}:${d.day}`}
                                        day={d.day}
                                      />
                                    )
                                    : (<></>)
                                  }
                                  {
                                    d.data.length
                                    ? d.data.map(dt => {
                                      const a = dt.appointment;

                                      return (
                                        <HorizontalCard 
                                          key={a.id}
                                          image= {ExperienceImg}
                                          name={a.schedule.experience.name}
                                          address={
                                            a.schedule.experience.address
                                            ? a.schedule.experience.address
                                            : 'Online'
                                          }
                                          price={`R$ ${a.schedule.experience.price}`}
                                          onPress={() => handleNavigation({
                                            isHost: dt.isHost,
                                            exp_id: a.schedule.experience.id
                                          })}
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
