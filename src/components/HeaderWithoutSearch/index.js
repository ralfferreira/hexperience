import React from 'react'
import { HeaderContent, Back, BackIcon, Title, Logo, Touchable } from './styles';
import { useNavigation } from '@react-navigation/native';
import BackImg from '../../assets/img/back.png'
import LogoImg from '../../assets/img/dinoDaleGreen.png'

const HeaderWithoutSearch = ({ children, ...rest }) => {
  const navigation = useNavigation();
  return (
    <HeaderContent {...rest}>
      <Back onPress={() => navigation.goBack()} >
        <BackIcon source={BackImg}/>
      </Back>
      <Title>{(children)}</Title>
      <Touchable onPress={() => navigation.navigate('NotificationsRoute')}>
        <Logo source={LogoImg} />
      </Touchable>
    </HeaderContent>
  );
};

export default HeaderWithoutSearch;
