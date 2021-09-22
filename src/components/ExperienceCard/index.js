import React from 'react'
import Rating from '../Rating'
import LocalizationImg from '../../assets/img/pins-hexperience.png'
import FavoriteImg from '../../assets/img/heart-icon.png'
import { Experience, ExperienceImage, ExperienceDescription, ExperienceName, ExperienceDetails, LocalizationIcon, ExperienceLocalizationText, ExperiencePrice, ExperienceRating, ExperienceFavorite} from './styles';

const ExperienceCard = ({name, image, localizationText, price }) => {
  return (
    <Experience>
      <ExperienceImage source={(image)} />
      <ExperienceDescription>
        <ExperienceName>{(name)}</ExperienceName>
        <ExperienceDetails>
          <LocalizationIcon source={LocalizationImg} />
          <ExperienceLocalizationText>{(localizationText)}</ExperienceLocalizationText>
        </ExperienceDetails>
        <ExperiencePrice>{(price)}</ExperiencePrice>
      </ExperienceDescription>
      <ExperienceRating>
        <Rating />
        <ExperienceFavorite source={FavoriteImg} />
      </ExperienceRating>
    </Experience>
  );
};

export default ExperienceCard;