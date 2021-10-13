import React from 'react'
import { SearchBar, Search, Title, Logo, Touchable } from './styles';
import LogoImg from '../../assets/img/dinoDaleGreen.png'
import SearchImg from '../../assets/img/search.png'
import { useNavigation } from '@react-navigation/native'; 
const Header = ({ children, ...rest }) => {
  const navigation = useNavigation();
  return (
    <SearchBar {...rest}>
      <Touchable onPress={() => {
        navigation.navigate('SearchRoute')
        }}>
        <Search source={SearchImg} />
      </Touchable>
      <Title>{(children)}</Title>
      <Logo source={LogoImg} />
    </SearchBar>
  );
};

export default Header;
