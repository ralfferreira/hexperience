import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Index from './src/index';

const App = () => {
  return(
    <NavigationContainer>
      <StatusBar
      barStyle="dark-content"
      backgroundColor="transparent"
      translucent
      />
      <Index />
    </NavigationContainer>
  );
}

export default App