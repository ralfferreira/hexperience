import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import ExperienceCard from '../../components/ExperienceCard'
import Header from '../../components/Header'
import FloatButton from '../../components/FloatButton'

import { useAuth } from '../../hooks/auth';
import { useLocation } from '../../hooks/location'
import { useFavorites } from '../../hooks/favorites';

import api from '../../services/api'

import BlueGradientIcon from '../../assets/img/topic-title-section-index.png'
import RoseGradientIcon from '../../assets/img/topic-title-section-index-rose.png'
import BlueGradientChromaLine from '../../assets/img/gradient-title-section-index-blue.png'
import RoseGradientChromaLine from '../../assets/img/gradient-title-section-index-rose.png'

import { 
  Container, 
  ContentBody, 
  ContentHeader, 
  NearToYou, 
  ContentTitle,
  Recommended, 
  ChromaLine, 
  Content, 
  ContentHeaderIcon 
} from './styles';

const Home = () => {
  const { user } = useAuth();
  const { favoritesRelation } = useFavorites();
  const { updateLocation, currentLocation } = useLocation();
  const navigation = useNavigation();

  const [recommendedExperiences, setRecommendedExperiences] = useState([]);
  const [nearExperiences, setNearExperiences] = useState([]);

  useEffect(() => {
    api.get('/experiences').then((response) => {
      setRecommendedExperiences(response.data);
    }).catch((err) => { 
      Alert.alert(`${err.response.data.message}`)
    });
  }, []);

  useEffect(() => {
    updateLocation()
      .then(() => {
        if (!currentLocation) {
          return;
        }

        api.get('/experiences/near', {
          data: {
            lat: currentLocation.latitude,
            lon: currentLocation.longitude
          }
        }).then ((response) => {
          setNearExperiences(response.data);
        }).catch((err) => {
          Alert.alert(`${err.response.data.message}`)
        });
      })
      .catch((err) => {
        Alert.alert(`${err.message}`)
      })
  }, [])

  const navigateToExperience = useCallback((exp_id) => {
    navigation.navigate('ExperienceRoute', { 
      screen: 'Experience',
      params: {
        exp_id
      }
    })
  }, [navigation]);

  const formattedNear = useMemo(() => {
    if (!nearExperiences.length) {
      return [];
    }

    const format = nearExperiences.map((entry) => {
      const { experience } = entry

      let isFavorite = false;

      if (favoritesRelation.length) {
        if (favoritesRelation.find(fav => fav.exp_id === experience.id)) {
          isFavorite = true;
        }
      }

      return {
        available: entry.available,
        experience: experience,
        isFavorite: isFavorite
      }
    });

    return format;
  }, [favoritesRelation, nearExperiences]);

  const formattedRecommended = useMemo(() => {
    if (!recommendedExperiences.length) {
      return [];
    }

    const format = recommendedExperiences.map((entry) => {
      const { experience } = entry

      let isFavorite = false;

      if (favoritesRelation.length) {
        if (favoritesRelation.find(fav => fav.exp_id === experience.id)) {
          isFavorite = true;
        }
      }

      return {
        available: entry.available,
        experience: experience,
        isFavorite: isFavorite
      }
    });

    return format;
  }, [favoritesRelation, recommendedExperiences]);

  return (
    <Container>
      <Header>
        Hexperience
      </Header>
      <ScrollView>
        <Content>
          { 
            formattedNear.length 
            ? (
              <NearToYou>
                <ContentHeader>
                  <ContentHeaderIcon source={BlueGradientIcon} />
                  <ContentTitle>Perto de Você</ContentTitle>
                  <ChromaLine source={BlueGradientChromaLine} />
                </ContentHeader>            
                <ContentBody horizontal={true} showsHorizontalScrollIndicator={false}>
                  {
                    formattedNear.map((entry) => {
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
                  }
                </ContentBody>
              </NearToYou>
            ) 
            : (<></>)
          }
          {
            formattedRecommended.length
            ? (
              <Recommended>
                <ContentHeader>
                  <ContentHeaderIcon source={RoseGradientIcon} />
                  <ContentTitle>Recomendados</ContentTitle>
                  <ChromaLine source={RoseGradientChromaLine} />
                </ContentHeader>

                <ContentBody horizontal={true} showsHorizontalScrollIndicator={false}>
                  {
                    formattedRecommended.map((entry) => {
                      const { experience, isFavorite } = entry;

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
                  }              
                </ContentBody>
              </Recommended>
            )
            : (<></>)
          }          
        </Content>
      </ScrollView>
      {user.type === 'host' ? <FloatButton /> : <></>}
    </Container>
  );
};

export default Home;
