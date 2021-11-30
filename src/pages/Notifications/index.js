import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'
import NotificationCard from '../../components/NotificationCard';

import api from '../../services/api';

import { 
  Container, 
  NotificationList 
} from './styles';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get('/notifications').then((response) => {
      setNotifications(response.data)
    }).catch((err) => {
      Alert.alert(
        'Erro de carregar notificações', 
        `${err.response.data.message}`
      );
    });
  }, []);

  return (
    <Container>
      <HeaderWithoutSearch>Notificações</HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <NotificationList>
          {
            notifications.length
            ? notifications.map((notification, i) => {
              return (
                <NotificationCard
                  key={`${notification.id}:${i}`}
                  title={notification.title}
                  text={notification.message}
                />
              )
            })
            : (<></>)
          }
        </NotificationList>
      </ScrollView>
    </Container>
  );
};

export default Notifications;
