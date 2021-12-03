import React, { useCallback, useEffect, useMemo, useState } from 'react'
import formatStringByPattern from 'format-string-by-pattern';
import { SearchBar } from 'react-native-elements';
import { format, parseISO } from 'date-fns';
import { Alert } from 'react-native';
import * as Yup from 'yup';

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
  RequestListRow 
} from './styles';

const AdminHostRequest = () => {
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
          onPress: () => handleApproveRequest(user.id)
        },
        {
          text: 'Negar',
          style: 'destructive',
          onPress: () => handleShowModal(user)
        }
      ]
    )
  }, [handleApproveRequest, handleShowModal]);

  const handleApproveRequest = useCallback((id) => {
    api.post('/admin/approve-host', {
      user_id: id
    }).then(response => {
      Alert.alert('Sucesso', `Anfitrião @${response.data.nickname} foi aprovado com sucesso`);

      getHostsRequests().finally(() => {});
    }).catch((err) => {
      Alert.alert('Erro ao aprovar anfitrião', `${err.response.data.message}`);
    });
  }, [])

  const handleShowModal = useCallback((user) => {
    setSelectedUser(user);
    setModalVisible(true);
  }, [modalVisible])

  const handleDenyRequest = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        reason: Yup.string().required('É obrigatório informar a razão')
      })

      await schema.validate(data, {
        abortEarly: true
      });

      await api.delete('admin/deny-host', {
        data: {
          user_id: selectedUser.id,
          reason: data.reason
        }
      });

      Alert.alert('Sucesso', 'Solicitação foi negada com sucesso!');
      setSelectedUser(null);
      setModalVisible(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        Alert.alert(
          'Erro ao realizar comentário',
          `${err.message}`
        );

        return;
      }  

      Alert.alert(
        'Erro ao realizar comentário',
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
                  onPress={() => handleDecision(user)}
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
        </RequestList>
      </Content>
    </Container>
  );
};

export default AdminHostRequest;
