import React from 'react';
import HeaderText from '../../components/HeaderText';
import { useNavigation } from '@react-navigation/native';
import { 
  Container,
  AdminContainer,
  AdminHeader,
  AdminContent,
  AdminHeaderTitle,
  OptionTitle, 
  Touchable 
} from './styles';

const Admin = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <HeaderText>Menu Principal</HeaderText>

      <AdminContainer>
        <AdminHeader>
          <AdminHeaderTitle>Usuários</AdminHeaderTitle>
        </AdminHeader>
          <AdminContent>
            <Touchable onPress={() => { navigation.navigate('AdminHostRequests') }}>
              <OptionTitle>Solicitações de Anfitrião</OptionTitle>
            </Touchable>
            <Touchable onPress={() => { navigation.navigate('AdminComplaintUsers') }}>
              <OptionTitle>Usuários Denunciados</OptionTitle>
            </Touchable>
            <Touchable onPress={() => { navigation.navigate('AdminBlockedUsers') }}>
              <OptionTitle>Usuários Bloqueados</OptionTitle>
            </Touchable>
          </AdminContent>

        <AdminHeader>
          <AdminHeaderTitle>Experiências</AdminHeaderTitle>
        </AdminHeader>
          <AdminContent>
            <Touchable onPress={() => { navigation.navigate('AdminReportedExperiences') }}>
              <OptionTitle>Experiências Reportadas</OptionTitle>
            </Touchable>
            <Touchable onPress={() => { navigation.navigate('AdminBlockedExperiences') }}>
              <OptionTitle>Experiências Bloqueadas</OptionTitle>
            </Touchable>
          </AdminContent>

        <AdminHeader>
          <AdminHeaderTitle>Aplicativo</AdminHeaderTitle>
        </AdminHeader>
          <AdminContent>
            <Touchable onPress={() => { navigation.navigate('AdminReportedBugs') }}>
              <OptionTitle>Problemas Relatados</OptionTitle>
            </Touchable>
          </AdminContent>

      </AdminContainer>
    </Container>
  );
};

export default Admin;
