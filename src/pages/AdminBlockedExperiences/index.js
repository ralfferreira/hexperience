import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';

const DefaultImg = require('../../assets/img/DinoGreenColor.png');

import { 
  Container, 
  Content, 
  Touchable, 
  BlockedExperiencesList, 
  BlockedExperiencesRow, 
  BlockedExperiencesItem, 
  BlockedExperiencesHeader, 
  BlockedExperiencesImage, 
  BlockedExperiencesName, 
  BlockedExperiencesAlert, 
  BlockedExperiencesDate
} from './styles';

const AdminBlockedExperiences = () => {
  const [blockedExperiences, setBlockedExperiences] = useState([]);
  const [search, setSearch] = useState(null);

  const getBlockedExperiences = useCallback(async () => {
    try {
      const response = await api.get('/admin/blocked/experiences');

      setBlockedExperiences(response.data);
    } catch (err) {
      Alert.alert(
        'Erro ao carregar experiências bloqueadas', 
        `${err.response.data.message}`
      )
    }
  }, []);

  useEffect(() => {
    getBlockedExperiences().finally(() => {});
  }, []);

  const updateSearch = useCallback((value) => {
    setSearch(value)
  }, [setSearch]);

  const handleUnblockExperience = useCallback((id) => {
    api.put('/admin/blocked/experiences', {
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
        { text: 'Desbloquear', style: 'default', onPress: () => handleUnblockExperience(id) }
      ]
    )
  }, [handleUnblockExperience]);

  const filteredBlockedExperiences = useMemo(() => {
    if (!blockedExperiences.length) {
      return [];
    }

    if (!search) {
      return blockedExperiences;
    }

    const regex = new RegExp(`.*${search.toLowerCase()}.*`)

    return blockedExperiences.filter(entry => {
      if (regex.test(entry.name.toLowerCase())) {
        return entry;
      }
    })
  }, [search, blockedExperiences]);

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
        <BlockedExperiencesList>
          <BlockedExperiencesRow>
            {
              filteredBlockedExperiences.length
              ? filteredBlockedExperiences.map((experience) => {                
                const parsedDate = parseISO(experience.updated_at);

                const formattedDate = format(parsedDate, 'dd/MM/yyyy');
                
                return (
                  <Touchable
                    key={`Touchable:${experience.id}`}
                    onPress={() => handleDecision(experience.id)}
                  >
                    <BlockedExperiencesItem key={`Item:${experience.id}`}>
                      <BlockedExperiencesHeader key={`Header:${experience.id}`}>
                        <BlockedExperiencesImage 
                          key={`Image:${experience.id}`}
                          source={
                            experience.cover_url
                            ? { uri: experience.cover_url }
                            : DefaultImg
                          }
                          resizeMode="center"
                        />
                      </BlockedExperiencesHeader>
                      <BlockedExperiencesName key={`Name:${experience.id}`}>
                        {experience.name}
                      </BlockedExperiencesName>
                      <BlockedExperiencesDate>
                        {formattedDate}
                      </BlockedExperiencesDate>
                    </BlockedExperiencesItem>
                  </Touchable>
                )
              })
              : (<></>)
            }
          </BlockedExperiencesRow>
        </BlockedExperiencesList>
      </Content>
    </Container>
  );
};

export default AdminBlockedExperiences;
