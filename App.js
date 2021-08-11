import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IndexScreen from './src/index'
import LoginScreen from './src/pages/Login'
import SignUpScreen from './src/pages/SignUp'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    // <NavigationContainer>
    // <Stack.Navigator>
    //   <Stack.Screen name="Index" component={IndexScreen} />
    // </Stack.Navigator>
    // </NavigationContainer>

    <SignUpScreen />
  );
}

export default App