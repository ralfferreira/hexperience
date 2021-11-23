import React from 'react'
import { Container, Content, ReportedExperiencesList, ReportedExperiencesRow, ReportedExperiencesItem, ReportedExperiencesHeader, ReportedExperiencesImage, ReportedExperiencesName, ReportedExperiencesAlert, ReportedExperiencesDate  } from './styles';
import { SearchBar } from 'react-native-elements';
import Luffy from '../../assets/img/luffy.jpg';
const AdminReportedExperiences = () => {
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
        <ReportedExperiencesList>
          <ReportedExperiencesRow>
            <ReportedExperiencesItem>
              <ReportedExperiencesHeader>
                <ReportedExperiencesImage source={Luffy} />
              </ReportedExperiencesHeader>
              <ReportedExperiencesName>Passeio com Monkey D. Luffy</ReportedExperiencesName>
              <ReportedExperiencesAlert>Falta de Segurança</ReportedExperiencesAlert>
              <ReportedExperiencesDate>23/11/2021</ReportedExperiencesDate>
            </ReportedExperiencesItem>

            <ReportedExperiencesItem>
              <ReportedExperiencesHeader>
                <ReportedExperiencesImage source={Luffy} />
              </ReportedExperiencesHeader>
              <ReportedExperiencesName>Passeio com Monkey D. Luffy</ReportedExperiencesName>
              <ReportedExperiencesAlert>Falta de Segurança</ReportedExperiencesAlert>
              <ReportedExperiencesDate>23/11/2021</ReportedExperiencesDate>
            </ReportedExperiencesItem>
          </ReportedExperiencesRow>

          <ReportedExperiencesRow>
            <ReportedExperiencesItem>
              <ReportedExperiencesHeader>
                <ReportedExperiencesImage source={Luffy} />
              </ReportedExperiencesHeader>
              <ReportedExperiencesName>Passeio com Monkey D. Luffy</ReportedExperiencesName>
              <ReportedExperiencesAlert>Falta de Segurança</ReportedExperiencesAlert>
              <ReportedExperiencesDate>23/11/2021</ReportedExperiencesDate>
            </ReportedExperiencesItem>

            <ReportedExperiencesItem>
              <ReportedExperiencesHeader>
                <ReportedExperiencesImage source={Luffy} />
              </ReportedExperiencesHeader>
              <ReportedExperiencesName>Passeio com Monkey D. Luffy</ReportedExperiencesName>
              <ReportedExperiencesAlert>Falta de Segurança</ReportedExperiencesAlert>
              <ReportedExperiencesDate>23/11/2021</ReportedExperiencesDate>
            </ReportedExperiencesItem>
          </ReportedExperiencesRow>
        </ReportedExperiencesList>
      </Content>
    </Container>
  );
};

export default AdminReportedExperiences;
