import React from 'react'
import Card from '../../components/Card'
import Header from '../../components/Header'
import { ScrollView } from 'react-native' 
import BlueGradientIcon from '../../assets/img/topic-title-section-index.png'
import RoseGradientIcon from '../../assets/img/topic-title-section-index-rose.png'
import BlueGradientChromaLine from '../../assets/img/gradient-title-section-index-blue.png'
import RoseGradientChromaLine from '../../assets/img/gradient-title-section-index-rose.png'
import 
{ Container, ContentBody, ContentHeader, NearToYou, ContentTitle,
  Recommended, ChromaLine, Content, ContentHeaderIcon 
} from './styles';

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
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ContentBody>
      </NearToYou>

      <Recommended>
        <ContentHeader>
          <ContentHeaderIcon source={RoseGradientIcon} />
          <ContentTitle>Recomendados</ContentTitle>
          <ChromaLine source={RoseGradientChromaLine} />
        </ContentHeader>

        <ContentBody horizontal={true} showsHorizontalScrollIndicator={false}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ContentBody>
      </Recommended>
      </Content>
      </ScrollView>
    </Container>
  );
};

export default Home;
