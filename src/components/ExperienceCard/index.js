import React from 'react';

import Rating from '../Rating/index';

import LocalizationImg from '../../assets/img/pins-hexperience.png';
import UnfavoriteImg from '../../assets/img/heart-icon.png';
import FavoriteImg from '../../assets/img/heart-full.png';
const DefaultImg = require('../../assets/img/DinoGreenColor.png');

import { 
  Touchable,
  Experience,
  ExperienceImage,
  ExperienceDescription,
  ExperienceName,
  ExperienceDetails,
  LocalizationIcon,
  ExperienceLocalizationText,
  ExperiencePrice,
  ExperienceRating,
  ExperienceFavorite
} from './styles';

const ExperienceCard = ({ 
  name, 
  image, 
  address, 
  price, 
  onPress, 
  rating, 
  ratingDisabled,
  isFavorite
}) => {
  return (
    <Experience>
      <Touchable onPress={onPress}>
        <ExperienceImage 
          resizeMode="center" 
          source={
            image
            ? { uri: image }
            : DefaultImg
          } 
        />
        <ExperienceDescription>
          <ExperienceName numberOfLines={1}>{name}</ExperienceName>
          <ExperienceDetails>
            <LocalizationIcon source={LocalizationImg} />
            <ExperienceLocalizationText numberOfLines={1}>
              {address ? address : 'Online'}
            </ExperienceLocalizationText>
          </ExperienceDetails>
          <ExperiencePrice>
            {price ? `R$ ${price}` : 'Indeterminado'}
          </ExperiencePrice>
        </ExperienceDescription>
        <ExperienceRating>
          <Rating
            rating={rating}
            disabled={ratingDisabled}
          />
          <ExperienceFavorite 
            source={
              isFavorite
              ? FavoriteImg
              : UnfavoriteImg
            }
          />
        </ExperienceRating>
      </Touchable>
    </Experience>
  );
};

export default ExperienceCard;