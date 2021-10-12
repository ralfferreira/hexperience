import React from 'react';
import Header from '../../components/Header'
import FloatButton from '../../components/FloatButton'
import HostExperienceCard from '../../components/HostExperienceCard'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'; 
import { Container, Leafs, Leaf, ProfileContent, ProfileHeader, EditProfileBtn, ProfileImage, SettingsView, EditProfileView, Settings, ProfileBody, ProfileInfo, ProfileName, ProfileDescription, Experiences, Title } from './styles';
const ProfileImg = require('../../assets/img/luffy.jpg');
const ExperienceImg = require('../../assets/img/div-image-experience.png');
const Experience2Img = require('../../assets/img/onepice.gif');
const LeafLeft = require('../../assets/img/Leafleft.png');
const LeafRight = require('../../assets/img/Leafright.png');
const EditProfileImg = require('../../assets/img/editprofile.png');
const SettingsImg = require('../../assets/img/settings.png');

const Profile = () => {
  const navigation = useNavigation();
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
          <EditProfileView onPress={() => {navigation.navigate('EditProfileRoute')}}>
            <EditProfileBtn source={EditProfileImg} />
          </EditProfileView>
          <ProfileImage source={ProfileImg} />
          <SettingsView onPress={() => {navigation.navigate('SettingsRoute')}} >
            <Settings source={SettingsImg} />
          </SettingsView>
        </ProfileHeader>
        <ProfileBody>
          <ProfileInfo>
            <ProfileName>Monkey D. Luffy</ProfileName>
            <ProfileDescription>O futuro Rei dos Piratas! O Luffy eh mt daora pprt, q cara bom.</ProfileDescription>
          </ProfileInfo>
        </ProfileBody>
      </ProfileContent>


      <Title>Experiências Que Participei</Title>
      <Experiences horizontal={true} showsHorizontalScrollIndicator={false}>
          <HostExperienceCard 
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
          <HostExperienceCard 
          image= {Experience2Img}
          name="Tarde com o Luffy"
          localizationText="Tokyo - JP"
          price="R$ 3500,00" />
          <HostExperienceCard 
          image= {Experience2Img}
          name="Tarde com o Luffy"
          localizationText="Tokyo - JP"
          price="R$ 3500,00" />
          <HostExperienceCard 
          image= {Experience2Img}
          name="Tarde com o Luffy"
          localizationText="Tokyo - JP"
          price="R$ 3500,00" />
      </Experiences>
      </ScrollView>
      <FloatButton />
    </Container>
  );
};

export default Profile;
