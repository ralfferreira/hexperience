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
  ExperienceFavorite,
  Row
} from './styles';

const HorizontalCard = ({ name, image, address, price, onPress, isFavorite }) => {
  
  return (
    <Touchable
      onPress={onPress}
    >
      <Experience>
        <ExperienceImage
          resizeMode="cover" 
          source={
            image
            ? { uri: image }
            : DefaultImg
          }
        />
        <ExperienceDescription>
          <ExperienceName>{name}</ExperienceName>
          <ExperienceDetails>
            <Row>
              <LocalizationIcon source={LocalizationImg} />
              <ExperienceLocalizationText numberOfLines={1}>
                {address ? address : 'Online'}
              </ExperienceLocalizationText>
            </Row>
            <Row>
            <ExperienceFavorite 
                source={
                  isFavorite
                  ? FavoriteImg
                  : UnfavoriteImg
                } 
              />
              <ExperiencePrice>{`R$ ${price}`}</ExperiencePrice>
            </Row>
          </ExperienceDetails>
        </ExperienceDescription>
      </Experience>
    </Touchable>
  );
};

export default HorizontalCard;
