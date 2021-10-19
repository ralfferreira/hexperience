import React from 'react';
import { Experience, Touchable, ExperienceDescription, ExperienceImage, ExperienceDetails, LocalizationIcon, ExperienceLocalizationText, ExperienceName, ExperiencePrice, ExperienceFavorite } from './styles';
import LocalizationImg from '../../assets/img/pins-hexperience.png'
import FavoriteImg from '../../assets/img/heart-icon.png'
import { useNavigation } from '@react-navigation/native'; 

const HorizontalCard = ({name, image, localizationText, price }) => {
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => {
      navigation.navigate('ExperienceRoute')
      }}>
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
    </Touchable>
  );
};

export default HorizontalCard;
