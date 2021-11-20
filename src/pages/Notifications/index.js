import React from 'react'
import { Container, NotificationList } from './styles';
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'
import NotificationCard from '../../components/NotificationCard';
import { ScrollView } from 'react-native';
import check from '../../assets/img/check.jpg';
import light from '../../assets/img/light.png';

const Notifications = () => {
  return (
    <Container>
      <HeaderWithoutSearch>Notificações</HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <NotificationList>
          <NotificationCard
          image={check}
          title={"Experiência marcada!"}
          text={"Sua experiência com o anfitrião Franky foi marcada com sucesso, a data marcada foi dia 20/11/2021, às 19h"}
          />
          <NotificationCard
          image={light}
          title={"Sugestão de Experiência"}
          text={"Sua experiência com o anfitrião Franky foi marcada com sucesso, a data marcada foi dia 20/11/2021, às 19h. TeTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteste Teste Teste TesteTeste"}
          />
        </NotificationList>
      </ScrollView>
    </Container>
  );
};

export default Notifications;
