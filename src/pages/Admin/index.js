import React from 'react';
import HeaderText from '../../components/HeaderText';
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
  return (
    <Container>
      <HeaderText>Menu Principal</HeaderText>

      <AdminContainer>
        <AdminHeader>
          <AdminHeaderTitle>Usuários</AdminHeaderTitle>
        </AdminHeader>
          <AdminContent>
            <Touchable onPress={() => { navigation.navigate('ReportBug') }}>
              <OptionTitle>Solicitações de Anfitrião</OptionTitle>
            </Touchable>
            <Touchable onPress={() => { navigation.navigate('ReportBug') }}>
              <OptionTitle>Usuários Denunciados</OptionTitle>
            </Touchable>
            <Touchable onPress={() => { navigation.navigate('ReportBug') }}>
              <OptionTitle>Usuários Bloqueados</OptionTitle>
            </Touchable>
          </AdminContent>

        <AdminHeader>
          <AdminHeaderTitle>Experiências</AdminHeaderTitle>
        </AdminHeader>
          <AdminContent>
            <Touchable onPress={() => { navigation.navigate('ReportBug') }}>
              <OptionTitle>Experiências Reportadas</OptionTitle>
            </Touchable>
            <Touchable onPress={() => { navigation.navigate('ReportBug') }}>
              <OptionTitle>Experiências Bloqueadas</OptionTitle>
            </Touchable>
          </AdminContent>

        <AdminHeader>
          <AdminHeaderTitle>Aplicativo</AdminHeaderTitle>
        </AdminHeader>
          <AdminContent>
            <Touchable onPress={() => { navigation.navigate('ReportBug') }}>
              <OptionTitle>Problemas Relatados</OptionTitle>
            </Touchable>
          </AdminContent>

      </AdminContainer>
    </Container>
  );
};

export default Admin;
