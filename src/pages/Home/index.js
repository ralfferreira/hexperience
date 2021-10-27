import React, { useEffect, useState } from 'react'
import { Alert, ScrollView } from 'react-native'

import ExperienceCard from '../../components/ExperienceCard'
import Header from '../../components/Header'
import FloatButton from '../../components/FloatButton'

import { useAuth } from '../../hooks/auth';

import api from '../../services/api'

import BlueGradientIcon from '../../assets/img/topic-title-section-index.png'
import RoseGradientIcon from '../../assets/img/topic-title-section-index-rose.png'
import BlueGradientChromaLine from '../../assets/img/gradient-title-section-index-blue.png'
import RoseGradientChromaLine from '../../assets/img/gradient-title-section-index-rose.png'

const ExperienceImg = require('../../assets/img/div-image-experience.png');
const Experience2Img = require('../../assets/img/onepice.gif');

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
import { useLocation } from '../../hooks/location'

const Home = () => {
  const { user } = useAuth();
  const { updateLocation, currentLocation } = useLocation();

  const [recommendedExperiences, setRecommendedExperiences] = useState([]);
  const [nearExperiences, setNearExperiences] = useState([]);

  useEffect(() => {
    api.get('/experiences').then((response) => {
      setRecommendedExperiences(response.data);
    }).catch((err) => Alert.alert(`${err.message}`));
  }, []);

  return (
    <Container>
      <Header>
        Hexperience
      </Header>
      <ScrollView>
        <Content>
          <NearToYou>
            <ContentHeader>
              <ContentHeaderIcon source={BlueGradientIcon} />
              <ContentTitle>Perto de Você</ContentTitle>
              <ChromaLine source={BlueGradientChromaLine} />
            </ContentHeader>

            <ContentBody horizontal={true} showsHorizontalScrollIndicator={false}>
              <ExperienceCard
                image= {ExperienceImg}
                name="Pescaria com Caio Castro"
                localizationText="Fortaleza - CE"
                price="R$ 800,00" 
              />
              <ExperienceCard 
                image= {Experience2Img}
                name="Tarde com o Luffy"
                localizationText="Tokyo - JP"
                price="R$ 3500,00"
              />
              <ExperienceCard
                image= {ExperienceImg}
                name="Pescaria com Caio Castro"
                localizationText="Fortaleza - CE"
                price="R$ 800,00" 
              />
              <ExperienceCard
                image= {ExperienceImg}
                name="Pescaria com Caio Castro"
                localizationText="Fortaleza - CE"
                price="R$ 800,00" 
              />
              <ExperienceCard
                image= {ExperienceImg}
                name="Pescaria com Caio Castro"
                localizationText="Fortaleza - CE"
                price="R$ 800,00" 
              />
              <ExperienceCard
                image= {ExperienceImg}
                name="Pescaria com Caio Castro"
                localizationText="Fortaleza - CE"
                price="R$ 800,00" 
              />
            </ContentBody>
          </NearToYou>

          <Recommended>
            <ContentHeader>
              <ContentHeaderIcon source={RoseGradientIcon} />
              <ContentTitle>Recomendados</ContentTitle>
              <ChromaLine source={RoseGradientChromaLine} />
            </ContentHeader>

            <ContentBody horizontal={true} showsHorizontalScrollIndicator={false}>
              {recommendedExperiences.map((entry) => {
                const { experience } = entry;

                return (
                  <ExperienceCard
                    key={experience.id}
                    image={Experience2Img}
                    name={experience.name}
                    localizationText={experience.addresss ? experience.addresss : 'Online'}
                    price={`R$ ${experience.price}`}                                      
                  />
                )
              })}              
            </ContentBody>
          </Recommended>
        </Content>
      </ScrollView>
      {user.type === 'host' ? <FloatButton /> : <></>}
    </Container>
  );
};

export default Home;
