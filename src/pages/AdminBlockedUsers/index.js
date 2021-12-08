import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Alert, Modal, StyleSheet } from 'react-native';
import { CheckBox, SearchBar } from 'react-native-elements';
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
  Align,
  AlignCallback,
  ModalView,
  OptionTitle,
  Row,
  Title
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
  }, []);

  useEffect(() => {
    getBlockedUsers().finally(() => {})
  }, []);

  const updateSearch = useCallback((value) => {
    setSearch(value)
  }, []);

  const handleDecision = useCallback((user) => {
    Alert.alert(
      'Usuário bloqueado',
      'Deseja mudar o status desse usuário?',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => {} },
        { text: 'Mudar status', style: 'default', onPress: () => handleShowUpdateModal(user) }
      ]
    )
  }, []);

  const handleShowUpdateModal = useCallback((user) => {
    setSelectedUser(user);
    handleChangeStatusOption(user.status);
    setModalVisible(true);
  }, []);

  const handleHideUpdateModal = useCallback(() => {
    setModalVisible(false);
    handleChangeStatusOption('analyzing');
    setSelectedUser(null);
  }, []);

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
  }, [])

  const handleUpdateStatus = useCallback(async () => {
    if (!selectedUser) {
      Alert.alert('Erro', 'Nenhum usuário foi escolhido');
      return;
    }
    
    try {
      await api.put('/admin/reported/hosts', {
        user_id: selectedUser.id,
        status: selectedStatus
      });

      await getBlockedUsers();

      Alert.alert('Sucesso', 'Status do usuário foi atualizado com sucesso!');
      handleHideUpdateModal();
    } catch (err) {
      Alert.alert('Erro ao atualizar status do usuário', `${err.response.data.message}`);
    }
  }, [selectedUser, selectedStatus]);

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
          <Align>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => handleHideUpdateModal()}
            >
              <ModalView>
                <AlignCallback>
                  <Title>Atualizar status do usuário</Title>
                </AlignCallback>

                <CheckBox
                  title='Ok'
                  containerStyle={styles.checkbox}
                  checkedColor="green"
                  checked={ok}
                  onPress={() => handleChangeStatusOption('ok')}
                />
                <CheckBox
                  title='Em análise'
                  containerStyle={styles.checkbox}
                  checkedColor="green"
                  checked={analyzing}
                  onPress={() => handleChangeStatusOption('analyzing')}
                />
                <CheckBox
                  title='Bloqueado'
                  containerStyle={styles.checkbox}
                  checkedColor="green"
                  checked={blocked}
                  onPress={() => handleChangeStatusOption('blocked')}
                />

                <AlignCallback>
                  <OptionTitle style={styles.center}>Deseja mesmo recusar o usuário?</OptionTitle>
                  <Row>
                    <Touchable
                      onPress={() => handleHideUpdateModal()}
                    >
                      <OptionTitle style={styles.red}>Não</OptionTitle>
                    </Touchable>
                    <Touchable 
                      onPress={() => handleUpdateStatus()}
                    >
                      <OptionTitle style={styles.green}>Sim</OptionTitle>
                    </Touchable>
                  </Row>
                </AlignCallback>
              </ModalView>
            </Modal>
          </Align>
        </RequestList>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    paddingLeft: 0,
  },
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
});

export default AdminBlockedUsers;
