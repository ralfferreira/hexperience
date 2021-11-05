import React from 'react'
import LocalizationImg from '../../assets/img/pins-hexperience.png'
// import DeleteExperienceImg from '../../assets/img/delete-experience.png'
import { useNavigation } from '@react-navigation/native'; 
import { EditExperience, DeleteExperience, Experience, Touchable, ExperienceImage, ExperienceDescription, ExperienceName, ExperienceDetails, LocalizationIcon, ExperienceLocalizationText, ExperiencePrice, ExperienceCommands, ExperienceFavorite} from './styles';
const EditProfileImg = require('../../assets/img/editprofile.png');

const HostExperienceCard = ({name, image, localizationText, price }) => {
  const navigation = useNavigation();
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
      <ExperienceCommands>
        <Touchable
        onPress={() => {
        navigation.navigate('EditExperienceRoute')
        }}>
          <EditExperience source={EditProfileImg} />
        </Touchable>
        {/* <Touchable>
          <DeleteExperience source={DeleteExperienceImg} />
        </Touchable> */}
      </ExperienceCommands>
    </Experience>
  );
};

export default HostExperienceCard;