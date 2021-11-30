import React from 'react'
import { Container, Notification, NotificationHeader, NotificationTitle, NotificationBody, NotificationText } from './styles';

const NotificationCard = ({title, text}) => {
  return (
    <Container>
      <Notification>
        <NotificationHeader>
          <NotificationTitle>{(title)}</NotificationTitle>
        </NotificationHeader>
        <NotificationBody>
          <NotificationText>{(text)}</NotificationText>
        </NotificationBody>
      </Notification>
    </Container>
  );
};

export default NotificationCard;
