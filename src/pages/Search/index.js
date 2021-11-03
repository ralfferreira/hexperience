import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';

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
  const { favoritesRelation } = useFavorites();

  const [search, setSearch] = useState(null);
  const [categories, setCategories] = useState(null);
  const [experiences, setExperiences] = useState(null);
  const [hosts, setHosts] = useState(null);

  useEffect(() => {
    api.get('/experiences/categories').then((response) => {
      setCategories(response.data);
    }).catch((err) => {
      Alert.alert(`${err.message}`);
    })
  }, [setCategories]);
  
  useEffect(() => {
    api.get('/experiences').then((response) => {
      setExperiences(response.data);
    }).catch((err) => {
      Alert.alert(`${err.message}`);
    })
  }, [setExperiences]);

  useEffect(() => {
    api.get('/hosts/search').then((response) => {
      setHosts(response.data);
    }).catch((err) => {
      Alert.alert(`${err.message}`);
    })
  }, [setHosts]);

  const updateSearch = useCallback((value) => {
    setSearch(value)
  }, []);

  const filteredCategories = useMemo(() => {
    if (!categories) {
      return [];
    }

    if (!search) {
      return categories;
    }

    const regex = new RegExp(`.*${search.toLowerCase()}.*`)

    return categories.filter(c => {
      if (regex.test(c.name.toLowerCase())) {
        return c;
      }
    });
  }, [search, categories]);

  const filteredExperiences = useMemo(() => {
    if (!experiences) {
      return [];
    }

    if (!search) {
      return experiences;
    }

    const regex = new RegExp(`.*${search.toLowerCase()}.*`)

    return experiences.filter(entry => {
      const { experience } = entry

      if (regex.test(experience.name.toLowerCase())) {
        return experience;
      }
    });
  }, [search, experiences]);

  const filteredHosts = useMemo(() => {
    if (!hosts) {
      return [];
    }

    if (!search) {
      return hosts;
    }

    const regex = new RegExp(`.*${search.toLowerCase()}.*`)

    return hosts.filter(h => {
     if (regex.test(h.nickname.toLowerCase())) {
        return h;
      }
    });
  }, [search, hosts]);

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
          <Title>Categorias</Title>
          <SeeAll>ver todas as categorias</SeeAll>
        </Row>
        <Categories horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            filteredCategories
            ? filteredCategories.map(c => {
              return (
                <ExperienceCategory 
                  key={`Category:${c.id}:${c.name}`}
                  name={c.name}
                />
              )
            })
            : (<></>)
          }
        </Categories>
      
        <Row>
          <Title>Experiências</Title>
          <SeeAll>ver todas as experiências</SeeAll>
        </Row>

        <Experiences horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            filteredExperiences
            ? filteredExperiences.map(entry => {
              const { experience } = entry;

              let isFavorite = false;                      

              if (favoritesRelation.find(e => e.exp_id === experience.id)) {
                isFavorite = true;
              }
              
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

        <Row>
          <Title>Anfitriões</Title>
          <SeeAll>ver todos os anfitriões</SeeAll>
        </Row>
      
        <Hosts>
          {
            filteredHosts
            ? filteredHosts.map(h => {
              return (
                <HostProfile key={`HostProfile:${h.id}`} >
                  <HostPhoto 
                    key={`HostPhoto:${h.id}`} 
                    source={
                      h.user.avatar_url
                      ? { uri: h.user.avatar_url }
                      : DefaultImg
                    }
                    resizeMode="contain"
                  />
                </HostProfile>
              )
            })
            : (<></>)
          }
        </Hosts>
      </ScrollView>
    </Container>
  )
}

export default Search;