import React from 'react'
import { Container, Content, BlockedExperiencesList, BlockedExperiencesRow, BlockedExperiencesItem, BlockedExperiencesHeader, BlockedExperiencesImage, BlockedExperiencesName, BlockedExperiencesAlert, BlockedExperiencesDate  } from './styles';
import { SearchBar } from 'react-native-elements';
import Luffy from '../../assets/img/luffy.jpg';
const AdminBlockedExperiences = () => {
  return (
    <Container>
      <SearchBar
        placeholder="Digite aqui..."
        containerStyle={{
          backgroundColor: '#fff',
          borderWidth:  1,
          borderColor: '#fff',
          borderRightColor: '#fff',
          borderBottomColor: '#ddd',
          borderTopColor: '#fff',
        }}
        inputContainerStyle={{
          backgroundColor: '#fff'}}
        searchIcon={{ 
          size: 24,
          color: '#000' }}
        platform="default"
      />
      <Content>
        <BlockedExperiencesList>
          <BlockedExperiencesRow>
            <BlockedExperiencesItem>
              <BlockedExperiencesHeader>
                <BlockedExperiencesImage source={Luffy} />
              </BlockedExperiencesHeader>
              <BlockedExperiencesName>Passeio com Monkey D. Luffy</BlockedExperiencesName>
              <BlockedExperiencesAlert>Falta de Segurança</BlockedExperiencesAlert>
              <BlockedExperiencesDate>23/11/2021</BlockedExperiencesDate>
            </BlockedExperiencesItem>

            <BlockedExperiencesItem>
              <BlockedExperiencesHeader>
                <BlockedExperiencesImage source={Luffy} />
              </BlockedExperiencesHeader>
              <BlockedExperiencesName>Passeio com Monkey D. Luffy</BlockedExperiencesName>
              <BlockedExperiencesAlert>Falta de Segurança</BlockedExperiencesAlert>
              <BlockedExperiencesDate>23/11/2021</BlockedExperiencesDate>
            </BlockedExperiencesItem>
          </BlockedExperiencesRow>

          <BlockedExperiencesRow>
            <BlockedExperiencesItem>
              <BlockedExperiencesHeader>
                <BlockedExperiencesImage source={Luffy} />
              </BlockedExperiencesHeader>
              <BlockedExperiencesName>Passeio com Monkey D. Luffy</BlockedExperiencesName>
              <BlockedExperiencesAlert>Falta de Segurança</BlockedExperiencesAlert>
              <BlockedExperiencesDate>23/11/2021</BlockedExperiencesDate>
            </BlockedExperiencesItem>

            <BlockedExperiencesItem>
              <BlockedExperiencesHeader>
                <BlockedExperiencesImage source={Luffy} />
              </BlockedExperiencesHeader>
              <BlockedExperiencesName>Passeio com Monkey D. Luffy</BlockedExperiencesName>
              <BlockedExperiencesAlert>Falta de Segurança</BlockedExperiencesAlert>
              <BlockedExperiencesDate>23/11/2021</BlockedExperiencesDate>
            </BlockedExperiencesItem>
          </BlockedExperiencesRow>
        </BlockedExperiencesList>
      </Content>
    </Container>
  );
};

export default AdminBlockedExperiences;
