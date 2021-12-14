import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from "@react-navigation/core";

import ExperienceCategory from '../../components/ExperienceCategory';
import ExperienceCard from '../../components/ExperienceCard';

import { useFavorites } from "../../hooks/favorites";

import api from "../../services/api";

const DefaultImg = require('../../assets/img/DinoGreenColor.png');

import { 
  Container, 
  Row, 
  Title, 
  SeeAll,
  Categories,
  Experiences,
  Hosts,
  HostPhoto,
  HostProfile 
} from './styles';

const Search = () => {
  const navigation = useNavigation();
  const { favoritesRelation } = useFavorites();

  const [search, setSearch] = useState(null);
  const [experiences, setExperiences] = useState([]);
  
  useEffect(() => {
    api.get('/experiences').then((response) => {
      setExperiences(response.data);
    }).catch((err) => {
      Alert.alert('Erro ao carregar experiências disponíveis', `${err.response.data.message}`);
    })
  }, []);

  const updateSearch = useCallback((value) => {
    setSearch(value)
  }, []);

  const navigateToExperience = useCallback((exp_id) => {
    navigation.navigate('ExperienceRoute', { 
      screen: 'Experience',
      params: {
        exp_id
      }
    })
  }, [navigation]);

  const formattedExperiences = useMemo(() => {
    if (!experiences.length) {
      return [];
    }

    const format = experiences.map(entry => {
      const { experience, available } = entry;

      let isFavorite = false;

      if (favoritesRelation.length) {
        if (favoritesRelation.find(fav => fav.exp_id === experience.id)) {
          isFavorite = true;
        }
      }

      return {
        isFavorite: isFavorite,
        experience: experience,
        available: available
      }
    });

    return format;
  }, [experiences, favoritesRelation]);

  const filteredExperiences = useMemo(() => {
    if (!formattedExperiences.length) {
      return [];
    }

    if (!search) {
      return formattedExperiences;
    }

    const regex = new RegExp(`.*${search.toLowerCase()}.*`)

    return formattedExperiences.filter(entry => {
      const { experience } = entry

      if (regex.test(experience.name.toLowerCase())) {
        return experience;
      }
    });
  }, [search, formattedExperiences]);

  return (
    <Container>
      <SearchBar
        placeholder="Digite aqui..."
        onChangeText={(value) => updateSearch(value)}
        value={search}
        containerStyle={{
          backgroundColor: '#E4E4E4',
          borderWidth:  1,
          borderColor: '#E4E4E4',
          borderRightColor: '#E4E4E4',
          borderBottomColor: '#E4E4E4',
          borderTopColor: '#E4E4E4',
          borderRadius: 40,
          marginBottom: 10,
          marginTop: 20}}
        inputContainerStyle={{
          backgroundColor: '#E4E4E4'}}
        searchIcon={{ 
          size: 24,
          color: '#000' }}
        platform="default"
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        />      
        <Row>
          <Title>Experiências</Title>
          <SeeAll>ver todas as experiências</SeeAll>
        </Row>

        <Experiences horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            filteredExperiences
            ? filteredExperiences.map(entry => {
              const { experience, isFavorite } = entry;
              
              return (
                <ExperienceCard
                  key={experience.id}
                  image={experience.cover_url}
                  name={experience.name}
                  address={experience.address}
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
  )
}

export default Search;