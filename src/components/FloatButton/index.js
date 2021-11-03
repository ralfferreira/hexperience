import React from 'react';
import { FAB } from 'react-native-paper';
import { Container } from './styles';
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet } from 'react-native';

const FloatButton = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <FAB
        icon="plus"
        style={styles.fab}
        color="#000"
        onPress={() => {navigation.navigate('CreateExperienceRoute')}}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#00FF01"
  },
});

export default FloatButton;
