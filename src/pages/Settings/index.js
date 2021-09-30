import React from 'react'
import { StyleSheet } from 'react-native'
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'
import { Container, SettingsBody, SettingsThemeSwitcher, OptionTitle } from './styles';
import SwitchComponent from '../../components/Switch';

const Settings = () => {
  return (
    <Container>
      <HeaderWithoutSearch>Configurações</HeaderWithoutSearch>

      <SettingsBody>
        <SettingsThemeSwitcher>
          <OptionTitle>Tema Escuro</OptionTitle>
          <SwitchComponent />
        </SettingsThemeSwitcher>
        <OptionTitle style={styles.orange} >Torne-se um anfitrião</OptionTitle>
        <OptionTitle>Reportar Problema</OptionTitle>
        <OptionTitle style={styles.red}>Excluir Perfil</OptionTitle>
        <OptionTitle style={styles.red}>Sair</OptionTitle>
      </SettingsBody>
    </Container>
  );
};

const styles = StyleSheet.create({
  orange: {
    color: '#CA8C00',
  },
  red: {
    color: '#FD0303',
  },
});

export default Settings;
