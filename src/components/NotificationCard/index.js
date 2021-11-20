import React from 'react'
import { Container, Notification, NotificationHeader, NotificationIcon, NotificationTitle, NotificationBody, NotificationText } from './styles';

const NotificationCard = ({image, title, text}) => {
  return (
    <Container>
      <Notification>
        <NotificationHeader>
          <NotificationIcon source={(image)} />
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
