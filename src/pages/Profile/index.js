import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header'
import HostExperienceCard from '../../components/HostExperienceCard'
import ExperienceCard from '../../components/ExperienceCard';

import { useAuth } from '../../hooks/auth';
import { useFavorites } from '../../hooks/favorites';

import api from '../../services/api';

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
  const { favoritesRelation } = useFavorites();

  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    if (user.type === 'host') {
      api.get(`/experiences/host/${user.host.id}`).then((response) => {
        setExperiences(response.data);
      }).catch((err) => {
        Alert.alert(
          'Erro ao carregar experiências', 
          `${err.response.data.message}`
        );
      })
    } else if (user.type === 'user') {
      api.get(`/experiences/user/${user.id}`).then((response) => {
        setExperiences(response.data);
      }).catch((err) => {
        Alert.alert(
          'Erro ao carregar experiências', 
          `${err.response.data.message}`
        );
      })
    }
  }, [user]);

  const navigateToExperience = useCallback((exp_id) => {
    navigation.navigate('ExperienceRoute', { 
      screen: 'Experience',
      params: {
        exp_id
      }
    })
  }, [navigation]);

  const navigateToEditExperience = useCallback((exp_id) => {
    navigation.navigate('EditExperienceRoute', { 
      screen: 'EditExperience',
      params: {
        exp_id
      }
    })
  }, [navigation]);

  const handleDeleteExperience = useCallback(async (exp_id) => {
    api.delete(`/experiences/${exp_id}`).then((response) => {
      Alert.alert('Sucesso', 'Experiência apagada com sucesso')
    }).catch((err) => {
      Alert.alert('Erro ao deletar experiência', `${err.response.data.message}`);
    })
  }, []);

  const ensureDeleteExperience = useCallback((exp_id, name) => {
    Alert.alert(
      'Excluir experiência',
      `Tem certeza que deseja excluir a experiência "${name}"?`,
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteExperience(exp_id)
        }
      ]
    )
  }, [handleDeleteExperience]);

  const formattedExperiences = useMemo(() => {
    if (!experiences.length) {
      return [];
    }

    if (user.type === 'host') {
      return experiences;
    }

    const format = experiences.map(experience => {
      let isFavorite = false;

      if (favoritesRelation.length) {
        if (favoritesRelation.find(fav => fav.exp_id === experience.id)) {
          isFavorite = true;
        }
      }

      return {
        experience: experience,
        isFavorite: isFavorite
      }
    });

    return format;
  }, [experiences, favoritesRelation, user]);

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
          {
            formattedExperiences.length
            ? formattedExperiences.map(entry => {
              if (user.type === 'host') {
                return (
                  <HostExperienceCard 
                    key={entry.id}
                    address={entry.address}
                    image={entry.cover_url}
                    name={entry.name}
                    price={entry.price}
                    onEditPress={() => navigateToEditExperience(entry.id)}
                    onDeletePress={
                      () => ensureDeleteExperience(entry.id, entry.name)
                    }
                  />
                )
              }

              const { isFavorite, experience } = entry;

              return (
                <ExperienceCard
                  key={experience.id}
                  image={experience.cover_url}
                  name={experience.name}
                  address={experience.addresss}
                  price={experience.price}
                  onPress={() => navigateToExperience(experience.id)}
                  rating={experience.rating}
                  ratingDisabled={true}
                  isFavorite={isFavorite}
                />
              )
            })
            : (<></>)
          }
        </Experiences>
      </ScrollView>
    </Container>
  );
};

export default Profile;
