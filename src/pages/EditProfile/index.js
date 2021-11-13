import React, { useCallback, useRef } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from "@unform/mobile";

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch'

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

const LeafLeft = require('../../assets/img/Leafleft.png');
const LeafRight = require('../../assets/img/Leafright.png');
const DefaultImg = require('../../assets/img/DinoGreenColor.png');
const ChangePhotoIcon = require('../../assets/img/changephotoicon.png');

import { 
  Container, 
  Leafs, 
  Leaf, 
  EditProfileContent, 
  EditProfilePhoto, 
  EditProfilePhotoImage, 
  EditProfileChangePhoto, 
  EditProfileForm, 
  InputTitle, 
  EditProfileInputName, 
  EditProfileInputBio, 
  ChangePassword, 
  ChangePasswordText, 
  ChangePasswordInput, 
  SaveBtn, 
  SaveBtnText, 
  SaveBtnView 
} from './styles';

const EditProfile = () => {
  const formRef = useRef();
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleSubmit = useCallback(() => {}, [])

  return (
    <Container>
      <HeaderWithoutSearch>Editar Perfil</HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
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
            <EditProfilePhotoImage 
              source={
                user.avatar_url
                ? { uri: user.avatar_url }
                : DefaultImg
              }
            />
            <EditProfileChangePhoto source={ChangePhotoIcon} />
          </EditProfilePhoto>
          <Form ref={formRef} onSubmit={handleSubmit} >
            <EditProfileForm>
              <InputTitle>Nome</InputTitle>
              <EditProfileInputName 
                autoCapitalize="words"
                name="name"
                placeholder="Nome"
                value={user.name}
                placeholderTextColor="black"
                maxLength={100}
              />
              <InputTitle>Biografia</InputTitle>
              <EditProfileInputBio 
                autoCapitalize="words"
                name="Biografia"
                value={user.bio}
                placeholderTextColor="black"
                maxLength={350}
              />
            </EditProfileForm>
            <ChangePassword>
              <ChangePasswordText>Alterar senha</ChangePasswordText>
              <ChangePasswordInput
                name="password"
                placeholder="Senha Atual"
                textContentType="password"
                returnKeyType="send"
              />
              <ChangePasswordInput 
                name="new_password"
                placeholder="Nova Senha"
                textContentType="newPassword"
                returnKeyType="send"
              />
            </ChangePassword>
            <SaveBtn>
              <SaveBtnView  
                onPress={() => {
                navigation.navigate('Profile')
                }}
              >
                <SaveBtnText>Salvar Alterações</SaveBtnText>
              </SaveBtnView>
            </SaveBtn>
          </Form>
        </EditProfileContent>
      </ScrollView>
    </Container>
  );
};

export default EditProfile;
