import React from 'react';

import LocalizationImg from '../../assets/img/pins-hexperience.png'
import UnfavoriteImg from '../../assets/img/heart-icon.png';
import FavoriteImg from '../../assets/img/heart-full.png';
const DefaultImg = require('../../assets/img/DinoGreenColor.png');

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

const HorizontalCard = ({ name, image, address, price, onPress, isFavorite }) => {
  
  return (
    <Touchable
      onPress={onPress}
    >
      <Experience>
        <ExperienceImage
          resizeMode="center" 
          source={
            image
            ? { uri: image }
            : DefaultImg
          }
        />
        <ExperienceDescription>
          <ExperienceName>{name}</ExperienceName>
          <ExperienceDetails>
            <LocalizationIcon source={LocalizationImg} />
            <ExperienceLocalizationText>
              {address ? address : 'Online'}
            </ExperienceLocalizationText>
            <ExperiencePrice>{`R$ ${price}`}</ExperiencePrice>
            <ExperienceFavorite 
              source={
                isFavorite
                ? FavoriteImg
                : UnfavoriteImg
              } 
            />
          </ExperienceDetails>
        </ExperienceDescription>
      </Experience>
    </Touchable>
  );
};

export default HorizontalCard;
