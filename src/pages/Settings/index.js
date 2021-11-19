import React, { useCallback } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'; 

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'
import SwitchComponent from '../../components/Switch';

import { useAuth } from '../../hooks/auth';

import { 
  Container, 
  SettingsBody, 
  SettingsThemeSwitcher, 
  OptionTitle, 
  Touchable 
} from './styles';

const Settings = () => {
  const navigation = useNavigation();
  const { signOut, user } = useAuth();

  const handleSignOut = useCallback(() => {
    Alert.alert('Tchauzinho', 'Nos vemos em breve!');

    signOut();
  }, [signOut]);

  const ensureSignOut = useCallback(() => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Sair',
          onPress: () => handleSignOut(),
        }
      ]
    )
  }, [handleSignOut]);

  return (
    <Container>
      <HeaderWithoutSearch>Configurações</HeaderWithoutSearch>

      <SettingsBody>
        <SettingsThemeSwitcher>
          <OptionTitle>Tema Escuro</OptionTitle>
          <SwitchComponent />
        </SettingsThemeSwitcher>
        
        {
          user.type === 'host' 
          ? <></> 
          : (
            <Touchable onPress={() => { navigation.navigate('RequestHost') }}>
              <OptionTitle style={styles.orange} >Torne-se um anfitrião</OptionTitle>
            </Touchable>
          ) 
        }        

        <Touchable onPress={() => { navigation.navigate('ReportBug') }}>
          <OptionTitle>Reportar Problema</OptionTitle>
        </Touchable>
        <Touchable onPress={ensureSignOut}>
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
