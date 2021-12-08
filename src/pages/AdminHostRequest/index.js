import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import formatStringByPattern from 'format-string-by-pattern';
import { Alert, Modal, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { format, parseISO } from 'date-fns';
import * as Yup from 'yup';

import ExperienceDescriptionInput from '../../components/ExperienceDescriptionInput';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import DefaultImg from '../../assets/img/DinoGreenColor.png'

import { 
  Container, 
  Content, 
  Touchable, 
  RequestList, 
  RequestItem, 
  RequestItemProfile, 
  RequestItemHeader, 
  RequestItemName, 
  RequestItemNickname, 
  RequestItemID, 
  RequestItemDate,
  Align,
  ModalView,
  AlignCallback,
  Title,
  Row,
  OptionTitle
} from './styles';
import { Form } from '@unform/core';

const AdminHostRequest = () => {
  const denyFormRef = useRef();

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getHostsRequests = useCallback(async () => {
    try {
      const response = await api.get('/admin/host-requests');

      setRequests(response.data);
    } catch (err) {
      Alert.alert('Erro ao listar as solicitações', `${err.response.data.message}`);
    }
  }, []);

  useEffect(() => {
    getHostsRequests().finally(() => {});
  }, []);

  const updateSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const handleDecision = useCallback((user) => {
    Alert.alert(
      'Solicitação de privilégio anfitrião',
      'O que deseja fazer em relação à esta solicitação',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => {} },
        {
          text: 'Aprovar',
          style: 'default',
          onPress: () => handleApproveRequest(user.user.id)
        },
        {
          text: 'Negar',
          style: 'destructive',
          onPress: () => handleShowModal(user)
        }
      ]
    )
  }, []);

  const handleApproveRequest = useCallback(async (id) => {
    try {
      const response = await api.post('/admin/host-requests', {
        user_id: id
      });

      Alert.alert('Sucesso', `Anfitrião @${response.data.nickname} foi aprovado com sucesso`);

      await getHostsRequests();
      setSelectedUser(null);
      setModalVisible(false);
    } catch (err) {
      Alert.alert('Erro ao aprovar anfitrião', `${err.response.data.message}`);
    }
  }, [])

  const handleShowModal = useCallback((user) => {
    setSelectedUser(user);
    setModalVisible(true);
  }, [modalVisible])

  const handleDenyRequest = useCallback(async (formData) => {
    try {
      const schema = Yup.object().shape({
        reason: Yup.string().required('É obrigatório informar a razão')
      })

      await schema.validate(formData, {
        abortEarly: true
      });

      await api.delete('/admin/host-requests', {
        data: {
          user_id: selectedUser.user.id,
          reason: formData.reason
        }
      });

      await getHostsRequests();

      Alert.alert('Sucesso', 'Solicitação foi negada com sucesso!');
      setSelectedUser(null);
      setModalVisible(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        denyFormRef.current?.setErrors(errors);

        Alert.alert(
          'Erro negar privilégio de anfitrião',
          `${err.message}`
        );

        return;
      }  

      Alert.alert(
        'Erro negar privilégio de anfitrião',
        `${err.response.data.message}`
      );
    }
  }, [selectedUser])

  const filteredRequests = useMemo(() => {
    if (!requests.length) {
      return [];
    }

    if (!search) {
      return requests;
    }

    const regex = new RegExp(`.*${search.toLowerCase()}.*`)

    return requests.filter(entry => {
      const { request } = entry;

      if (regex.test(request.nickname.toLowerCase())) {
        return entry;
      }
    })
  }, [search, requests]);

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
        <RequestList>
          {
            filteredRequests.length
            ? filteredRequests.map(entry => {
              const { request, user } = entry;

              const parsedDate = parseISO(request.createdAt);

              const formattedDate = format(parsedDate, 'dd/MM/yyyy');

              let formattedID = '';

              if (request.cpf) {
                formattedID = formatStringByPattern('999.999.999-99', request.cpf);
              } else {
                formattedID = formatStringByPattern('99.999.999/9999-99', request.cnpj);
              }

              return (
                <Touchable
                  key={`Touchable:${request._id}`}
                  onPress={() => handleDecision({
                    request: entry.request,
                    user: entry.user,
                    formattedID: formattedID,
                    formattedDate: formattedDate
                  })}
                >
                  <RequestItem key={`Item:${request._id}`}>
                    <RequestItemHeader key={`ItemHeader:${request._id}`}>
                      <RequestItemProfile
                        key={`ItemProfile:${request._id}`}
                        source={
                          user.avatar_url
                          ? user.avatar_url
                          : DefaultImg
                        }
                        resizeMode="center"
                      />
                    </RequestItemHeader>
                    <RequestItemName key={`ItemName:${request._id}`}>
                      {user.name}
                    </RequestItemName>
                    <RequestItemNickname key={`ItemNickname:${request._id}`}>
                      {request.nickname}
                    </RequestItemNickname>
                    <RequestItemID key={`ItemID:${request._id}`}>
                      {formattedID}
                    </RequestItemID>
                    <RequestItemDate key={`ItemDate:${request._id}`}>
                      {formattedDate}
                    </RequestItemDate>
                  </RequestItem>
                </Touchable>
              )
            })
            : (<></>)
          }
          <Align>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setSelectedUser(null);
              setModalVisible(false);
            }}
          >
            <ModalView>
              <AlignCallback>
                <Title>Negar solicitação de anfitrião</Title>
              </AlignCallback>
              {
                selectedUser
                ? (
                  <Form ref={denyFormRef} onSubmit={handleDenyRequest}>
                    <AlignCallback>
                    <RequestItem style={styles.card} >
                      <RequestItemHeader>
                        <RequestItemProfile                          
                          source={
                            selectedUser.user.avatar_url
                            ? selectedUser.user.avatar_url
                            : DefaultImg
                          }
                          resizeMode="center"
                        />
                        <RequestItemName >
                          {selectedUser.user.name}
                        </RequestItemName>
                        
                      <RequestItemNickname >
                        {selectedUser.request.nickname}
                      </RequestItemNickname>
                      
                      <RequestItemID>
                        {selectedUser.formattedID}
                      </RequestItemID>
                      <RequestItemDate>
                        {selectedUser.formattedDate}
                      </RequestItemDate>
                      </RequestItemHeader>
                    </RequestItem>
                  </AlignCallback>
                    <OptionTitle style={styles.center} >Justificativa</OptionTitle> 
                    <ExperienceDescriptionInput 
                      autoCapitalize="words"
                      name="reason"
                      placeholder="Justificativa para negar privilégio de anfitrião. Ex: CPF inválido"
                      style={{fontSize:18, textAlign: 'left', marginTop: 7,}} 
                      maxLength={100}
                      multiline
                    />
                    <AlignCallback>
                      <OptionTitle style={styles.center}>Deseja mesmo recusar o usuário?</OptionTitle>
                      <Row>
                        <Touchable
                          onPress={() => {
                            setSelectedUser(null);
                            setModalVisible(false);
                          }}
                        >
                          <OptionTitle style={styles.red}>Não</OptionTitle>
                        </Touchable>
                        <Touchable 
                          onPress={() => {
                            denyFormRef.current.submitForm()
                          }}
                        >
                          <OptionTitle style={styles.green}>Sim</OptionTitle>
                        </Touchable>
                      </Row>
                    </AlignCallback>               
                  </Form>
                )
                : (<></>)
              }                      
            </ModalView>
          </Modal>
        </Align>
        </RequestList>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  green: {
    color: '#32cd32',
  },
  red: {
    color: '#910101',
  },
  center: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  card: {
    width: '90%',
  },
});

export default AdminHostRequest;
