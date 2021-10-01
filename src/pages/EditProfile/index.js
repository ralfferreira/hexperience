import React from 'react'
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'
import { Container, Leafs, Leaf, EditProfileContent, EditProfilePhoto, EditProfilePhotoImage, EditProfileChangePhoto, EditProfileForm, InputTitle, EditProfileInputName, EditProfileInputBio, ChangePassword, ChangePasswordText, ChangePasswordInput, SaveBtn, SaveBtnText, SaveBtnView } from './styles';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
const LeafLeft = require('../../assets/img/Leafleft.png');
const LeafRight = require('../../assets/img/Leafright.png');
const ProfileImg = require('../../assets/img/luffy.jpg');
const ChangePhotoIcon = require('../../assets/img/changephotoicon.png');

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
          <EditProfileInputName 
          autoCapitalize="words"
          name="name"
          placeholder="Monkey D. Luffy"
          placeholderTextColor="black"
          maxLength={100}
          />
          <InputTitle>Biografia</InputTitle>
          <EditProfileInputBio 
          autoCapitalize="words"
          name="Biografia"
          placeholder="O futuro Rei dos Piratas! O Luffy eh mt daora pprt, q cara bom."
          placeholderTextColor="black"
          maxLength={350}
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
        <SaveBtn 
          onPress={() => {
          navigation.navigate('ProfileRoute')
          }}>
          <SaveBtnView>
            <SaveBtnText>
            Salvar Alterações
            </SaveBtnText>
          </SaveBtnView>
        </SaveBtn>
      </EditProfileContent>
      </ScrollView>
    </Container>
  );
};

export default EditProfile;
