import React from 'react'
import { SearchBar, Search, Title, Logo } from './styles';
import LogoImg from '../../assets/img/dinoDaleGreen.png'
import SearchImg from '../../assets/img/search.png'

const Header = ({ children, ...rest }) => {
  return (
    <SearchBar {...rest}>
      <Search source={SearchImg} />
      <Title>{(children)}</Title>
      <Logo source={LogoImg} />
    </SearchBar>
  );
};

export default Header;
