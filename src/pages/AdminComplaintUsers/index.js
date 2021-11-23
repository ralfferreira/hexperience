import React from 'react'
import { Container, Content, Touchable, RequestList, RequestItem, RequestItemProfile, RequestItemHeader, RequestItemName, RequestItemNickname, RequestItemID, RequestItemDate, RequestListRow } from './styles';
import { SearchBar } from 'react-native-elements';
import Luffy from '../../assets/img/luffy.jpg';
const AdminComplaintUsers = () => {
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
        <RequestList>
          <RequestListRow>
            <Touchable>
            <RequestItem>
              <RequestItemHeader>
                <RequestItemProfile source={Luffy} />
              </RequestItemHeader>
              <RequestItemName>Monkey D. Luffy</RequestItemName>
              <RequestItemNickname>Luffy</RequestItemNickname>
              <RequestItemID>113.857.956-11</RequestItemID>
              <RequestItemDate>23/11/2021</RequestItemDate>
            </RequestItem>
            </Touchable>

            <Touchable>
            <RequestItem>
              <RequestItemHeader>
                <RequestItemProfile source={Luffy} />
              </RequestItemHeader>
              <RequestItemName>Monkey D. Luffy</RequestItemName>
              <RequestItemNickname>Luffy</RequestItemNickname>
              <RequestItemID>113.857.956-11</RequestItemID>
              <RequestItemDate>23/11/2021</RequestItemDate>
            </RequestItem>
            </Touchable>
          </RequestListRow>
        </RequestList>
      </Content>
    </Container>
  );
};

export default AdminComplaintUsers;
