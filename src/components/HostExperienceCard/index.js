import React from 'react';

import LocalizationImg from '../../assets/img/pins-hexperience.png'
import DeleteExperienceImg from '../../assets/img/delete-experience.png'
const EditProfileImg = require('../../assets/img/editprofile.png');
const DefaultImg = require('../../assets/img/DinoGreenColor.png');

import { 
  EditExperience, 
  DeleteExperience, 
  Experience, 
  Touchable, 
  ExperienceImage, 
  ExperienceDescription, 
  ExperienceName, 
  ExperienceDetails, 
  LocalizationIcon, 
  ExperienceLocalizationText, 
  ExperiencePrice, 
  ExperienceCommands
} from './styles';

const HostExperienceCard = ({name, image, address, price, onEditPress, onDeletePress }) => {
  return (
    <Experience>
      <ExperienceImage 
        source={
          image
          ? { uri: image }
          : DefaultImg
        }
        resizeMode="cover"
      />
      <ExperienceDescription>
        <ExperienceName numberOfLines={1}>{name}</ExperienceName>
        <ExperienceDetails>
          <LocalizationIcon source={LocalizationImg} />
          <ExperienceLocalizationText numberOfLines={1}>
            {address ? address : 'Online'}
          </ExperienceLocalizationText>
        </ExperienceDetails>
        <ExperiencePrice>{price > 0 ? `R$ ${price}` : 'Gratuito'}</ExperiencePrice>
      </ExperienceDescription>
      <ExperienceCommands>
        <Touchable onPress={onEditPress} >
          <EditExperience source={EditProfileImg} />
        </Touchable>
        <Touchable onPress={onDeletePress} >
          <DeleteExperience source={DeleteExperienceImg} />
        </Touchable>
      </ExperienceCommands>
    </Experience>
  );
};

export default HostExperienceCard;