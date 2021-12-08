import React from 'react'
import { HeaderContent, Title } from './styles';
import { useNavigation } from '@react-navigation/native';
const HeaderText = ({ children, ...rest }) => {
  const navigation = useNavigation();
  return (
    <HeaderContent {...rest}>
      <Title>{(children)}</Title>
    </HeaderContent>
  );
};

export default HeaderText;
