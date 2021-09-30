import React from 'react'
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'
import { Container, SettingsBody, SettingsThemeSwitcher } from './styles';
import SettingsOptions from '../../components/SettingsOptions';
import SwitchComponent from '../../components/Switch';

const Settings = () => {
  return (
    <Container>
      <HeaderWithoutSearch>Configurações</HeaderWithoutSearch>

      <SettingsBody>
        <SettingsThemeSwitcher>
          <SettingsOptions name="Tema Escuro" />
          <SwitchComponent />
        </SettingsThemeSwitcher>
      </SettingsBody>
    </Container>
  );
};

export default Settings;
