import React from 'react'
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'
import { Container } from './styles';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
const LeafLeft = require('../../assets/img/Leafleft.png');
const LeafRight = require('../../assets/img/Leafright.png');
const ProfileImg = require('../../assets/img/luffy.jpg');

const EditProfile = () => {
  return (
    <Container>
      <HeaderWithoutSearch>Editar Perfil</HeaderWithoutSearch>
      <ScrollView
        keyboardShouldPersistTaps="handled">
      <Leafs>
        <Leaf source={LeafLeft} />
        <Leaf source={LeafRight} />
      </Leafs>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      />
      <EditProfileContent>
        <EditProfilePhoto>
          <EditProfilePhotoImage source={ProfileImg} />
          <EditProfileChangePhoto source={ChangePhotoIcon} />
        </EditProfilePhoto>
        <EditProfileForm>
          <InputTitle>Nome</InputTitle>
          <EditProfileInput 
          autoCapitalize="words"
          name="name"
          placeholder="Nome"
          />
          <InputTitle>Biografia</InputTitle>
          <EditProfileInput 
          autoCapitalize="words"
          name="Biografia"
          placeholder="Biografia"
          />
        </EditProfileForm>
        <ChangePassword>
          <ChangePasswordText>Alterar senha</ChangePasswordText>
          <ChangePasswordInput
          name="password"
          placeholder="Senha Atual"
          textContentType="actualPassword"
          returnKeyType="send"
          />
          <ChangePasswordInput 
          name="password"
          placeholder="Nova Senha"
          textContentType="newPassword"
          returnKeyType="send"
          />
        </ChangePassword>
        <SaveBtn>
          <SaveBtnText>Salvar Alterações</SaveBtnText>
        </SaveBtn>
      </EditProfileContent>
      </ScrollView>
    </Container>
  );
};

export default EditProfile;
