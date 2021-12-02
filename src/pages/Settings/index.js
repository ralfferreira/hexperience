import React, { useCallback, useState } from 'react'
import { Alert, StyleSheet, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'; 

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'
import SwitchComponent from '../../components/Switch';

import { useAuth } from '../../hooks/auth';

import { 
  Container, 
  SettingsBody, 
  SettingsThemeSwitcher, 
  OptionTitle, 
  Touchable,
  ModalView,
  Row,
  Align
} from './styles';

const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { signOut, user } = useAuth();

  const handleSignOut = useCallback(() => {
    Alert.alert('Tchauzinho', 'Nos vemos em breve!');

    signOut();
  }, [signOut]);

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
        <Align>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          >
            <ModalView>
              <OptionTitle>Tem certeza que deseja sair?</OptionTitle>
              <Row>
                <Touchable onPress={handleSignOut}>
                  <OptionTitle style={styles.orange}>Sim</OptionTitle>
                </Touchable>
                <Touchable onPress={() => setModalVisible(!modalVisible)}>
                  <OptionTitle style={styles.red}>Não</OptionTitle>
                </Touchable>
              </Row>
            </ModalView>
          </Modal>
        </Align>
        <Touchable onPress={() => setModalVisible(true)}>
        <OptionTitle style={styles.red}>Sair</OptionTitle>
        </Touchable>
      </SettingsBody>
    </Container>
  );
};

const styles = StyleSheet.create({
  orange: {
    color: '#CA8C00',
    marginRight: 30,
  },
  red: {
    color: '#FD0303',
  },
});

export default Settings;
