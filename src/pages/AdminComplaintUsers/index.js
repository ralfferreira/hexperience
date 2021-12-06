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
  ModalView,
  AlignCallback,
  Title,
  Row,
  OptionTitle
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
  }, []);

  useEffect(() => {
    getReportedUsers().finally(() => {})
  }, [getReportedUsers]);

  const updateSearch = useCallback((value) => {
    setSearch(value)
  }, []);

  const handleDecision = useCallback((user) => {
    const status = user.user.status === 'blocked' ? 'bloqueado' : 'em análise';

    Alert.alert(
      'Usuário ' + status,
      'Deseja mudar o status desse usuário?',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => {} },
        { text: 'Mudar status', style: 'default', onPress: () => handleShowUpdateModal(user) }
      ]
    )
  }, []);

  const handleShowUpdateModal = useCallback((user) => {
    setSelectedUser(user.user);
    handleChangeStatusOption(user.user.status);
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

  const handleUpdateStatus = useCallback(() => {
    if (!selectedUser) {
      Alert.alert('Erro ao atualizar status', 'Nenhum usuário foi escolhido');
      return;
    }
    
    try {
      const request = api.put('/admin/reported/hosts', {
        user_id: selectedUser.id,
        status: selectedStatus
      })

      Promise.resolve(request);

      Alert.alert('Sucesso', 'Status do usuário foi atualizado com sucesso!');
      handleHideUpdateModal();
      getReportedUsers().finally(() => {});
    } catch (err) {
      Alert.alert('Erro ao atualizar status do usuário', `${err.response.data.message}`);
    }
  }, [selectedUser, selectedStatus]);

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

              return (
                <Touchable
                  key={`Touchable:${host.id}`}
                  onPress={() => handleDecision({
                    formattedDate: formattedDate,
                    formattedID: formattedID,
                    user: host.user
                  })}
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

export default AdminComplaintUsers;
