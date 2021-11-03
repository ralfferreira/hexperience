import React from 'react';
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header'
import FloatButton from '../../components/FloatButton'
import HostExperienceCard from '../../components/HostExperienceCard'

import { useAuth } from '../../hooks/auth';

const ExperienceImg = require('../../assets/img/div-image-experience.png');
const Experience2Img = require('../../assets/img/onepice.gif');
const LeafLeft = require('../../assets/img/Leafleft.png');
const LeafRight = require('../../assets/img/Leafright.png');
const EditProfileImg = require('../../assets/img/editprofile.png');
const SettingsImg = require('../../assets/img/settings.png');
const DefaultImg = require('../../assets/img/DinoGreenColor.png');

import { 
  Container, 
  Leafs, 
  Leaf, 
  ProfileContent, 
  ProfileHeader, 
  EditProfileBtn, 
  ProfileImage, 
  SettingsView, 
  EditProfileView, 
  Settings, 
  ProfileBody, 
  ProfileInfo, 
  ProfileName, 
  ProfileDescription, 
  Experiences, 
  Title 
} from './styles';

const Profile = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <Container>
      <Header>Meu Perfil</Header>
      <ScrollView>
        <Leafs>
          <Leaf source={LeafLeft} />
          <Leaf source={LeafRight} />
        </Leafs>

        <ProfileContent>
          <ProfileHeader>
            <EditProfileView onPress={() => { navigation.navigate('EditProfileRoute') }}>
              <EditProfileBtn source={EditProfileImg} />
            </EditProfileView>
            <ProfileImage 
              source={
                user.avatar_url
                ? { uri: user.avatar_url }
                : DefaultImg
              }
              resizeMode="center"
            />
            <SettingsView onPress={() => { navigation.navigate('SettingsRoute') }} >
              <Settings source={SettingsImg} />
            </SettingsView>
          </ProfileHeader>
          <ProfileBody>
            <ProfileInfo>
              <ProfileName>{user.name}</ProfileName>
              <ProfileDescription>{user.bio}</ProfileDescription>
            </ProfileInfo>
          </ProfileBody>
        </ProfileContent>


        <Title>
          {
            user.type === 'user'
            ? 'Experiências Que Participei'
            : 'Experiências Que Ofereço'
          }
        </Title>
        <Experiences horizontal={true} showsHorizontalScrollIndicator={false}>
          <HostExperienceCard 
            image={ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00"
          />
          <HostExperienceCard 
            image={Experience2Img}
            name="Tarde com o Luffy"
            localizationText="Tokyo - JP"
            price="R$ 3500,00" 
          />
          <HostExperienceCard 
            image={Experience2Img}
            name="Tarde com o Luffy"
            localizationText="Tokyo - JP"
            price="R$ 3500,00" 
          />
          <HostExperienceCard 
            image={Experience2Img}
            name="Tarde com o Luffy"
            localizationText="Tokyo - JP"
            price="R$ 3500,00" 
          />
        </Experiences>
      </ScrollView>
      {user.type === 'host' ? <FloatButton /> : <></>}
    </Container>
  );
};

export default Profile;
