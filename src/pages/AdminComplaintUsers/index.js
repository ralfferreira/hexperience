import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { format, parseISO } from 'date-fns';
import formatStringByPattern from 'format-string-by-pattern';

import api from '../../services/api'

const DefaultImg = require('../../assets/img/DinoGreenColor.png');

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
} from './styles';

const AdminComplaintUsers = () => {
  const [reportedUsers, setReportedUsers] = useState([]);
  const [search, setSearch] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [ok, setOk] = useState(false);
  const [analyzing, setAnalyzing] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('analyzing');

  const getReportedUsers = useCallback(async () => {
    try {
      const response = await api.get('/admin/reported/hosts');

      setReportedUsers(response.data);
    } catch (err) {
      Alert.alert('Erro ao carregar usuários reportados', `${err.response.data.message}`);
    }
  }, [setReportedUsers]);

  useEffect(() => {
    getReportedUsers().finally(() => {})
  }, [getReportedUsers]);

  const updateSearch = useCallback((value) => {
    setSearch(value)
  }, [setSearch]);

  const handleDecision = useCallback((user) => {
    const status = user.status === 'blocked' ? 'bloqueado' : 'em análise';

    Alert.alert(
      'Usuário ' + status,
      'Deseja mudar o status desse usuário?',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => {} },
        { text: 'Mudar status', style: 'default', onPress: () => handleShowUpdateModal(user) }
      ]
    )
  }, [handleShowUpdateModal]);

  const handleShowUpdateModal = useCallback((user) => {
    setSelectedUser(user);
    handleChangeStatusOption(user.status);
    setModalVisible(true);
  }, [setSelectedUser, handleChangeStatusOption, setModalVisible]);

  const handleHideUpdateModal = useCallback(() => {
    setModalVisible(false);
    handleChangeStatusOption('analyzing');
    setSelectedUser(null);
  }, [setSelectedUser, handleChangeStatusOption, setModalVisible]);

  const handleChangeStatusOption = useCallback((option) => {
    setSelectedStatus(option);
    switch (option) {
      case 'ok':
        setOk(true)
        setAnalyzing(false)
        setBlocked(false)
        break;
      case 'analyzing':
        setOk(false)
        setAnalyzing(true)
        setBlocked(false)
        break;
      case 'blocked':
        setOk(false)
        setAnalyzing(false)
        setBlocked(true)
        break;
    }
  }, [setSelectedStatus, setOk, setAnalyzing, setBlocked])

  const handleUpdateStatus = useCallback(async () => {
    if (!selectedUser) {
      Alert.alert('Erro', 'Nenhum usuário foi escolhido');
      return;
    }

    if (!selectedStatus) {
      Alert.alert('Erro', 'Nenhum status foi escolhido');
      return;
    }
    
    try {
      const response = await api.put('/admin/reported/hosts', {
        user_id: selectedUser.id,
        status: selectedStatus
      })

      Alert.alert('Sucesso', 'Status do usuário foi atualizado com sucesso!');
      getReportedUsers().finally(() => handleHideUpdateModal());
    } catch (err) {
      Alert.alert('Erro ao atualizar status do usuário', `${err.response.data.message}`);
    }
  }, [getReportedUsers, handleHideUpdateModal]);

  const filteredReportedUsers = useMemo(() => {
    if (!reportedUsers.length) {
      return [];
    }

    if (!search) {
      return reportedUsers;
    }

    const regex = new RegExp(`.*${search.toLowerCase()}.*`)

    return reportedUsers.filter(user => {
      if (regex.test(user.host.nickname.toLowerCase())) {
        return user;
      }
    })
  }, [search, reportedUsers]);

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
            filteredReportedUsers.length
            ? filteredReportedUsers.map(host => {
              const parsedDate = parseISO(host.user.updated_at);

              const formattedDate = format(parsedDate, 'dd/MM/yyyy');

              let formattedID = '';

              if (host.cpf) {
                formattedID = formatStringByPattern('999.999.999-99', host.cpf);
              } else {
                formattedID = formatStringByPattern('99.999.999/9999-99', host.cnpj);
              }

              console.log(host);

              return (
                <Touchable
                  key={`Touchable:${host.id}`}
                  onPress={() => handleDecision(host.user)}
                >
                  <RequestItem key={`Item:${host.id}`}>
                    <RequestItemHeader key={`Header:${host.id}`}>
                      <RequestItemProfile 
                        key={`Profile:${host.id}`}
                        source={
                          host.user.avatar_url
                          ? { uri: host.user.avatar_url }
                          : DefaultImg
                        }
                        resizeMode="center"
                      />
                    </RequestItemHeader>
                    <RequestItemName key={`Name:${host.id}`}>
                      {host.user.name}
                    </RequestItemName>
                    <RequestItemNickname key={`Touchable:${host.id}`}>
                      {host.nickname}
                    </RequestItemNickname>
                    <RequestItemID>
                      {formattedID}
                    </RequestItemID>
                    <RequestItemDate>
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

export default AdminComplaintUsers;
