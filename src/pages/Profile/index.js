import React from 'react';
import Header from '../../components/Header'
import FloatButton from '../../components/FloatButton'
import ExperienceCard from '../../components/ExperienceCard'
import { ScrollView } from 'react-native' 
import { Container, Leafs, Leaf, ProfileContent, ProfileHeader, EditProfile, ProfileImage, Settings, ProfileBody, ProfileInfo, ProfileName, ProfileDescription, Experiences, Title } from './styles';
const ProfileImg = require('../../assets/img/luffy.jpg');
const ExperienceImg = require('../../assets/img/div-image-experience.png');
const Experience2Img = require('../../assets/img/onepice.gif');
const LeafLeft = require('../../assets/img/Leafleft.png');
const LeafRight = require('../../assets/img/Leafright.png');
const EditProfileImg = require('../../assets/img/editprofile.png');
const SettingsImg = require('../../assets/img/settings.png');

const Profile = () => {
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
          <EditProfile source={EditProfileImg} />
          <ProfileImage source={ProfileImg} />
          <Settings source={SettingsImg} />
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
          <ExperienceCard 
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
          <ExperienceCard 
          image= {Experience2Img}
          name="Tarde com o Luffy"
          localizationText="Tokyo - JP"
          price="R$ 3500,00" />
          <ExperienceCard 
          image= {Experience2Img}
          name="Tarde com o Luffy"
          localizationText="Tokyo - JP"
          price="R$ 3500,00" />
          <ExperienceCard 
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
