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
  RequestListRow 
} from './styles';

const AdminBlockedUsers = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [search, setSearch] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [ok, setOk] = useState(false);
  const [analyzing, setAnalyzing] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('analyzing');

  const getBlockedUsers = useCallback(async () => {
    try {
      const response = await api.get('/admin/blocked/hosts');

      setBlockedUsers(response.data);
    } catch (err) {
      Alert.alert('Erro ao carregar usuários bloqueados', `${err.response.data.message}`);
    }
  }, [setBlockedUsers]);

  useEffect(() => {
    getBlockedUsers().finally(() => {})
  }, [getBlockedUsers]);

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
      await api.put('/admin/reported/hosts', {
        user_id: selectedUser.id,
        status: selectedStatus
      })

      Alert.alert('Sucesso', 'Status do usuário foi atualizado com sucesso!');
      getBlockedUsers().finally(() => handleHideUpdateModal());
    } catch (err) {
      Alert.alert('Erro ao atualizar status do usuário', `${err.response.data.message}`);
    }
  }, [getBlockedUsers, handleHideUpdateModal]);

  const filteredBlockedUsers = useMemo(() => {
    if (!blockedUsers.length) {
      return [];
    }

    if (!search) {
      return blockedUsers;
    }

    const regex = new RegExp(`.*${search.toLowerCase()}.*`)

    return blockedUsers.filter(user => {
      if (regex.test(user.host.nickname.toLowerCase())) {
        return user;
      }
    })
  }, [search, blockedUsers]);

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
          <RequestListRow>
            {
              filteredBlockedUsers.length
              ? filteredBlockedUsers.map(user => {
                const parsedDate = parseISO(user.updated_at);

                const formattedDate = format(parsedDate, 'dd/MM/yyyy');

                let formattedID = '';

                if (user.host.cpf) {
                  formattedID = formatStringByPattern('999.999.999-99', user.host.cpf);
                } else {
                  formattedID = formatStringByPattern('99.999.999/9999-99', user.host.cnpj);
                }

                return (
                  <Touchable
                    key={`Touchable:${user.id}`}
                    onPress={() => handleDecision(user)}
                  >
                    <RequestItem key={`Item:${user.id}`}>
                      <RequestItemHeader key={`Header:${user.id}`}>
                        <RequestItemProfile 
                          key={`Profile:${user.id}`}
                          source={
                            user.avatar_url
                            ? { uri: user.avatar_url }
                            : DefaultImg
                          }
                          resizeMode="center"
                        />
                      </RequestItemHeader>
                      <RequestItemName key={`Name:${user.id}`}>
                        {user.name}
                      </RequestItemName>
                      <RequestItemNickname key={`Touchable:${user.id}`}>
                        {user.host.nickname}
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
          </RequestListRow>
        </RequestList>
      </Content>
    </Container>
  );
};

export default AdminBlockedUsers;
