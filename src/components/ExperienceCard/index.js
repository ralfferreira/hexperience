import React from 'react'
import Rating from '../Rating'
import { useNavigation } from '@react-navigation/native'; 
import LocalizationImg from '../../assets/img/pins-hexperience.png'
import FavoriteImg from '../../assets/img/heart-icon.png'
import { Touchable, Experience, ExperienceImage, ExperienceDescription, ExperienceName, ExperienceDetails, LocalizationIcon, ExperienceLocalizationText, ExperiencePrice, ExperienceRating, ExperienceFavorite} from './styles';

const ExperienceCard = ({name, image, localizationText, price }) => {
  const navigation = useNavigation();
  return (
    <Experience>
      <Touchable 
      onPress={() => {
      navigation.navigate('ExperienceRoute')
      }}>
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
    </Touchable>
    </Experience>
  );
};

export default ExperienceCard;