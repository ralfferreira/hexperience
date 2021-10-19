import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'; 
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'
import { Container, SettingsBody, SettingsThemeSwitcher, OptionTitle, Touchable } from './styles';
import SwitchComponent from '../../components/Switch';

const Settings = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <HeaderWithoutSearch>Configurações</HeaderWithoutSearch>

      <SettingsBody>
        <SettingsThemeSwitcher>
          <OptionTitle>Tema Escuro</OptionTitle>
          <SwitchComponent />
        </SettingsThemeSwitcher>
        <Touchable 
        onPress={() => {
        navigation.navigate('RequestHost')
        }}>
          <OptionTitle style={styles.orange} >Torne-se um anfitrião</OptionTitle>
        </Touchable>
        <Touchable 
        onPress={() => {
        navigation.navigate('Home')
        }}>
          <OptionTitle>Reportar Problema</OptionTitle>
        </Touchable>
        <Touchable 
        onPress={() => {
        navigation.navigate('Login')
        }}>
          <OptionTitle style={styles.red}>Excluir Perfil</OptionTitle>
        </Touchable>
        <Touchable 
        onPress={() => {
        navigation.navigate('Login')
        }}>
          <OptionTitle style={styles.red}>Sair</OptionTitle>
        </Touchable>
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
