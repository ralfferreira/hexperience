import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { Alert } from 'react-native';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';

import DefaultImg from '../../assets/img/DinoGreenColor.png'

import { 
  Container, 
  Content, 
  Touchable, 
  ReportedExperiencesList, 
  ReportedExperiencesRow, 
  ReportedExperiencesItem, 
  ReportedExperiencesHeader,
  ReportedExperiencesImage, 
  ReportedExperiencesName, 
  ReportedExperiencesDate  
} from './styles';

const AdminReportedExperiences = () => {
  const [reportedExperiences, setReportedExperiences] = useState([]);
  const [search, setSearch] = useState(null);

  const getReportedExperiences = useCallback(async () => {
    try {
      const response = await api.get('/admin/reported/experiences');

      setReportedExperiences(response.data);
    } catch (err) {
      Alert.alert('Erro ao listar as solicitações', `${err.response.data.message}`);
    }
  }, []);

  useEffect(() => {
    getReportedExperiences().finally(() => {});
  }, []);

  const updateSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const handleBlockExperince = useCallback((id) => {
    api.put('/admin/reported/experiences', {
      exp_id: id
    }).then(() => {
      Alert.alert('Sucesso', 'Experiência foi desbloqueada com sucesso!');
      
      getBlockedExperiences().finally(() => {});
    }).catch((err) => {
      Alert.alert('Erro ao desbloquear experiência', `${err.response.data.message}`);
    })
  }, []);

  const handleDecision = useCallback((id) => {
    Alert.alert(
      'Experiência bloqueada',
      'Deseja desbloquear essa experiência?',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => {} },
        { text: 'Bloquear', style: 'default', onPress: () => handleBlockExperince(id) }
      ]
    )
  }, [handleBlockExperince]);

  const filteredReportedExperiences = useMemo(() => {
    if (!reportedExperiences.length) {
      return [];
    }

    if (!search) {
      return reportedExperiences;
    }

    const regex = new RegExp(`.*${search.toLowerCase()}.*`)

    return reportedExperiences.filter(entry => {
      if (regex.test(entry.name.toLowerCase())) {
        return entry;
      }
    })
  }, [search, reportedExperiences]);

  return (
    <Container>
      <SearchBar
        placeholder="Digite aqui..."
        onChangeText={(text) => updateSearch(text)}
        value={search}
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
          {
            filteredReportedExperiences.length
            ? filteredReportedExperiences.map(experience => {
              const parsedDate = parseISO(experience.updated_at);

              const formattedDate = format(parsedDate, 'dd/MM/yyyy');
              
              return (
                <Touchable
                  key={`Touchable:${experience.id}`}
                  onPress={() => handleDecision(experience.id)}
                >
                  <ReportedExperiencesItem key={`Item:${experience.id}`}>
                    <ReportedExperiencesHeader key={`Header:${experience.id}`}>
                      <ReportedExperiencesImage 
                        key={`Image:${experience.id}`}
                        source={
                          experience.cover_url
                          ? { uri: experience.cover_url }
                          : DefaultImg
                        }
                        resizeMode="center"
                      />
                    </ReportedExperiencesHeader>
                    <ReportedExperiencesName key={`Name:${experience.id}`}>
                      {experience.name}
                    </ReportedExperiencesName>
                    <ReportedExperiencesDate>
                      {formattedDate}
                    </ReportedExperiencesDate>
                  </ReportedExperiencesItem>
                </Touchable>
              )
            })
            : (<></>)
          }
        </ReportedExperiencesList>
      </Content>
    </Container>
  );
};

export default AdminReportedExperiences;
