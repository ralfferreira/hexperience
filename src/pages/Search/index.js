import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { SearchBar } from 'react-native-elements';

import ExperienceCategory from '../../components/ExperienceCategory';
import ExperienceCard from '../../components/ExperienceCard';

import UserProfile from '../../assets/img/luffy.jpg';
const ExperienceImg = require('../../assets/img/div-image-experience.png');

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

export default class App extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <Container>
        <SearchBar
          placeholder="Digite aqui..."
          onChangeText={this.updateSearch}
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
            <ExperienceCategory name="Alimentação"></ExperienceCategory>
            <ExperienceCategory name="Pesca"></ExperienceCategory>
            <ExperienceCategory name="Aventura"></ExperienceCategory>
            <ExperienceCategory name="Aventura"></ExperienceCategory>
            <ExperienceCategory name="Aventura"></ExperienceCategory>
            <ExperienceCategory name="Aventura"></ExperienceCategory>
            <ExperienceCategory name="Aventura"></ExperienceCategory>
            <ExperienceCategory name="Aventura"></ExperienceCategory>
          </Categories>
        
          <Row>
            <Title>Experiências</Title>
            <SeeAll>ver todas as experiências</SeeAll>
          </Row>

          <Experiences horizontal={true} showsHorizontalScrollIndicator={false}>
            <ExperienceCard
              image= {ExperienceImg}
              name="Pescaria com Caio Castro"
              localizationText="Fortaleza - CE"
              price="R$ 800,00" 
            />
            <ExperienceCard 
              image= {ExperienceImg}
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
          </Experiences>

          <Row>
            <Title>Anfitriões</Title>
            <SeeAll>ver todos os anfitriões</SeeAll>
          </Row>
        
          <Hosts>
            <HostProfile>
              <HostPhoto source={UserProfile} />
            </HostProfile>
            <HostProfile>
              <HostPhoto source={UserProfile} />
            </HostProfile>
            <HostProfile>
              <HostPhoto source={UserProfile} />
            </HostProfile>
            <HostProfile>
              <HostPhoto source={UserProfile} />
            </HostProfile>
          </Hosts>
        </ScrollView>
      </Container>
    );
  }
}