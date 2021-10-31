import React from 'react';
import { useNavigation } from '@react-navigation/native'; 

import LocalizationImg from '../../assets/img/pins-hexperience.png'
import FavoriteImg from '../../assets/img/heart-icon.png'

import { 
  Experience,
  Touchable,
  ExperienceDescription,
  ExperienceImage,
  ExperienceDetails,
  LocalizationIcon,
  ExperienceLocalizationText,
  ExperienceName,
  ExperiencePrice,
  ExperienceFavorite 
} from './styles';

const HorizontalCard = ({ name, image, address, price, onPress }) => {
  
  return (
    <Touchable
      onPress={onPress}
    >
      <Experience>
        <ExperienceImage source={(image)} />
        <ExperienceDescription>
          <ExperienceName>{(name)}</ExperienceName>
          <ExperienceDetails>
            <LocalizationIcon source={LocalizationImg} />
            <ExperienceLocalizationText>{address}</ExperienceLocalizationText>
            <ExperiencePrice>{`R$ ${price}`}</ExperiencePrice>
            <ExperienceFavorite source={FavoriteImg} />
          </ExperienceDetails>
        </ExperienceDescription>
      </Experience>
    </Touchable>
  );
};

export default HorizontalCard;
