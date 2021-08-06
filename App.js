import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IndexScreen from './src/index'
// import LoginScreen from './src/pages/Login'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
    <Stack.Navigator>
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      <Stack.Screen name="Index" component={IndexScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App