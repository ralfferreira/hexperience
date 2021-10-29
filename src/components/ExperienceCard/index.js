import React from 'react';

import Rating from '../Rating/index';

import LocalizationImg from '../../assets/img/pins-hexperience.png';
import FavoriteImg from '../../assets/img/heart-icon.png';

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
  ratingDisabled 
}) => {
  return (
    <Experience>
      <Touchable onPress={onPress}>
        <ExperienceImage source={(image)} />
        <ExperienceDescription>
          <ExperienceName>{(name)}</ExperienceName>
          <ExperienceDetails>
            <LocalizationIcon source={LocalizationImg} />
            <ExperienceLocalizationText>{(address)}</ExperienceLocalizationText>
          </ExperienceDetails>
          <ExperiencePrice>{(price)}</ExperiencePrice>
        </ExperienceDescription>
        <ExperienceRating>
          <Rating
            rating={rating}
            disabled={ratingDisabled}
          />
          <ExperienceFavorite source={FavoriteImg} />
        </ExperienceRating>
      </Touchable>
    </Experience>
  );
};

export default ExperienceCard;