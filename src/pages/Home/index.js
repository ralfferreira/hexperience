import React from 'react'
import ExperienceCard from '../../components/ExperienceCard'
import Header from '../../components/Header'
import { ScrollView } from 'react-native' 
import FloatButton from '../../components/FloatButton'
import BlueGradientIcon from '../../assets/img/topic-title-section-index.png'
import RoseGradientIcon from '../../assets/img/topic-title-section-index-rose.png'
import BlueGradientChromaLine from '../../assets/img/gradient-title-section-index-blue.png'
import RoseGradientChromaLine from '../../assets/img/gradient-title-section-index-rose.png'
import 
{ Container, ContentBody, ContentHeader, NearToYou, ContentTitle,
  Recommended, ChromaLine, Content, ContentHeaderIcon 
} from './styles';
const ExperienceImg = require('../../assets/img/div-image-experience.png');
const Experience2Img = require('../../assets/img/onepice.gif');

const Home = () => {
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
          price="R$ 800,00" />
          <ExperienceCard 
          image= {Experience2Img}
          name="Tarde com o Luffy"
          localizationText="Tokyo - JP"
          price="R$ 3500,00" />
          <ExperienceCard 
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
          <ExperienceCard 
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
          <ExperienceCard 
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
          <ExperienceCard 
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
        </ContentBody>
      </NearToYou>

      <Recommended>
        <ContentHeader>
          <ContentHeaderIcon source={RoseGradientIcon} />
          <ContentTitle>Recomendados</ContentTitle>
          <ChromaLine source={RoseGradientChromaLine} />
        </ContentHeader>

        <ContentBody horizontal={true} showsHorizontalScrollIndicator={false}>
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
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
          <ExperienceCard 
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
          <ExperienceCard 
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
          <ExperienceCard 
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
          <ExperienceCard 
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
          <ExperienceCard 
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
          <ExperienceCard 
          image= {ExperienceImg}
          name="Pescaria com Caio Castro"
          localizationText="Fortaleza - CE"
          price="R$ 800,00" />
        </ContentBody>
      </Recommended>
      </Content>
      </ScrollView>
      <FloatButton />
    </Container>
  );
};

export default Home;
