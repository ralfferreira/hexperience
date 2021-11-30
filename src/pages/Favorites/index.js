import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Alert, ScrollView } from 'react-native' ;

import FloatButton from '../../components/FloatButton'
import Header from '../../components/Header';
import HorizontalCard from '../../components/HorizontalCard';

import { useAuth } from '../../hooks/auth';
import { useFavorites } from '../../hooks/favorites';

import FolderImg from '../../assets/img/folder.png';
const ExperienceImg = require('../../assets/img/div-image-experience.png');

import { 
  Container,
  Folder,
  FolderButton,
  Folders, 
  FolderIcon, 
  FolderName, 
  Experiences 
} from './styles';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/core';

const Favorites = () => {
  const { user } = useAuth();
  const { folders } = useFavorites();
  const navigation = useNavigation();

  const [favorites, setFavorites] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    api.get('/experiences/favorites').then(response => {
      setFavorites(response.data);
    }).catch(err => {
      Alert.alert(`${err.message}`)
    });
  }, []);

  const handleNavigateToExperience = useCallback((exp_id) => {
    navigation.navigate('ExperienceRoute', {
      screen: 'Experience',
      params: {
        exp_id
      }
    })
  }, []);

  const handleFilterExperiences = useCallback((folder) => {
    setSelectedFolder(folder)
  }, [setSelectedFolder]);

  const filteredFavorites = useMemo(() => {
    if (!selectedFolder) {
      return favorites
    }

    if (!favorites.length) {
      return [];
    }

    return favorites.filter(fav => {
      if (fav.folder === selectedFolder) {
        return fav;
      }
    });
  }, [selectedFolder, favorites]);

  return (
    <Container>
      <Header>Favoritos</Header>
      <ScrollView>
        <Folders horizontal={true} showsHorizontalScrollIndicator={false}>
          <FolderButton
            onPress={() => handleFilterExperiences(null)}
          >
            <Folder>
              <FolderIcon source={FolderImg} />
              <FolderName numberOfLines={2}>Todos favoritos</FolderName>
            </Folder>
          </FolderButton>
          {
            folders
            ? folders.map(f => {
              return (
                <FolderButton 
                  key={`FolderButton:${f}`}
                  onPress={() => handleFilterExperiences(f)}
                >
                  <Folder key={`Folder:${f}`} >
                    <FolderIcon key={`FolderIcon:${f}`} source={FolderImg} />
                    <FolderName key={f} numberOfLines={2}>{f}</FolderName>
                  </Folder>
                </FolderButton>
              )
            })
            : (<></>)
          }
        </Folders>
        <Experiences horizontal={false} showsHorizontalScrollIndicator={false}>
          {
            filteredFavorites
            ? filteredFavorites.map(fav => {
              return (
                <HorizontalCard 
                  key={fav.id}
                  image={fav.cover_url}
                  name={fav.experience.name}
                  address={
                    fav.experience.address
                    ? fav.experience.address
                    : 'Online'
                  }
                  price={`${fav.experience.price}`}
                  onPress={() => handleNavigateToExperience(fav.experience.id)}
                  isFavorite={true}
                />
              )
            })
            : (<></>)
          }
        </Experiences> 
      </ScrollView>
      {user.type === 'host' ? <FloatButton /> : <></>}
    </Container>
  );
};
export default Favorites