import React from 'react';
import { Experience, ExperienceDescription, ExperienceImage, ExperienceDetails,
LocalizationIcon, ExperienceLocalizationText, ExperienceName, ExperiencePrice, ExperienceFavorite
} from './styles';
import LocalizationImg from '../../assets/img/pins-hexperience.png'
import FavoriteImg from '../../assets/img/heart-icon.png'

const HorizontalCard = ({name, image, localizationText, price }) => {
  return (
    <Experience>
      <ExperienceImage source={(image)} />
      <ExperienceDescription>
        <ExperienceName>{(name)}</ExperienceName>
        <ExperienceDetails>
          <LocalizationIcon source={LocalizationImg} />
          <ExperienceLocalizationText>{(localizationText)}</ExperienceLocalizationText>
          <ExperiencePrice>{(price)}</ExperiencePrice>
          <ExperienceFavorite source={FavoriteImg} />
        </ExperienceDetails>
      </ExperienceDescription>
    </Experience>
  );
};

export default HorizontalCard;
