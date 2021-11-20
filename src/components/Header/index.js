import React from 'react'
import { useNavigation } from '@react-navigation/core';

import LogoImg from '../../assets/img/dinoDaleGreen.png'
import SearchImg from '../../assets/img/search.png'

import { SearchBar, Search, Title, Logo, Touchable } from './styles';

const Header = ({ children, ...rest }) => {
  const navigation = useNavigation();

  return (
    <SearchBar {...rest}>
      <Touchable 
        onPress={() => navigation.navigate('AdminRoute')}
      >
        <Search source={SearchImg} />
      </Touchable>
      <Title>{children}</Title>
      <Touchable onPress={() => navigation.navigate('NotificationsRoute')}>
        <Logo source={LogoImg} />
      </Touchable>
    </SearchBar>
  );
};

export default Header;
