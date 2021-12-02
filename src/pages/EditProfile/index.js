import React, { useCallback, useRef, useState } from 'react'
import { ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import formatStringByPattern from 'format-string-by-pattern';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Form } from "@unform/mobile";
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import FormInput from '../../components/FormInput';
import MultilineDetailsInput from '../../components/MultilineDetailsInput';

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
  ChangePassword, 
  ChangePasswordText,
  SaveBtn, 
  SaveBtnText, 
  SaveBtnView 
} from './styles';

const EditProfile = () => {
  const formRef = useRef();
  const navigation = useNavigation();
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [phone, setPhone] = useState(user.phone_number);

  const handlePhoneTextChange = useCallback((value) => {
    const formatted = formatStringByPattern('+99 (99) 99999-9999', value);

    setPhone(formatted);
  }, []);

  const handleUpdateAvatar = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    });

    if (result.cancelled) {
      return;
    }

    const avatarForm = new FormData();

    avatarForm.append('avatar', {
      type: 'image/jpeg',
      name: `avatar:${result.uri.substr(-10, 10)}.jpg`,
      uri: result.uri,
    });

    try {
      const response = await api.patch('/users/avatar', avatarForm);

      updateUser(response.data);

      Alert.alert('Sucesso', 'Avatar atualizado com sucesso');
    } catch (err) {
      Alert.alert('Erro na atualização do perfil', `${err.response.data.message}`);
    }
  }, []);

  const handleSubmit = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        phone: Yup.string()
          .optional()
          .matches(
            /^\+[0-9]+\s\([0-9]+\)\s\d\d\d\d\d-\d\d\d\d$/i, 
            "Telefone deve estar no formato: '+XX (XX) XXXXX-XXXX'"
          ),
        bio: Yup.string(),
        old_password: Yup.string().min(8).optional(),
        password: Yup.string().min(8).when('old_password', {
          is: (val) => !!val,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        confirm_password: Yup.string()
          .when('password', {
            is: (val) => !!val,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf(
            [Yup.ref('password'), null],
            'Confirmação de senha está incorreta',
          ),
      });

      await schema.validate(data, {
        abortEarly: true
      })

      const dataForm = {
        name: data.name,
        email: data.email,
        phone_number: data.phone,
        bio: data.bio 
      }

      if (data.old_password) {
        Object.assign(dataForm, {
          old_password: data.old_password,
          password: data.password,
          password_confirmation: data.confirm_password
        });
      }

      const response = await api.put('/profile/me', dataForm);

      updateUser(response.data);

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        Alert.alert(
          'Erro ao atualizar perfil',
          `${err.message}`
        );

        return;
      }  

      Alert.alert(
        'Erro ao atualizar perfil',
        `${err.response.data.message}`
      );
    }
  }, []);

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
          <EditProfilePhoto
            onPress={handleUpdateAvatar}
          >
            <EditProfilePhotoImage 
              source={
                user.avatar_url
                ? { uri: user.avatar_url }
                : DefaultImg
              }
              resizeMode="center"
            />
            <EditProfileChangePhoto source={ChangePhotoIcon} />
          </EditProfilePhoto>
          <Form 
            initialData={{ name: name, email: email, phone: phone, bio: bio }}
            ref={formRef} 
            onSubmit={handleSubmit} 
          >
            <EditProfileForm>
              <InputTitle>Nome</InputTitle>
              <FormInput 
                autoCapitalize="words"
                name="name"
                placeholder="Nome"
                value={name}
                placeholderTextColor="gray"
                maxLength={100}
                onChangeText={(text) => setName(text)}
              />
              <InputTitle>Email</InputTitle>
              <FormInput 
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                value={email}
                placeholderTextColor="gray"
                maxLength={100}
                onChangeText={(text) => setEmail(text)}
              />
              <InputTitle>Telefone</InputTitle>
              <FormInput 
                keyboardType="number-pad"
                name="phone"
                placeholder="Telefone"
                value={phone}
                placeholderTextColor="gray"
                maxLength={19}
                onChangeText={(text) => handlePhoneTextChange(text)}
              />
              <InputTitle>Biografia</InputTitle>
              <MultilineDetailsInput
                name="bio"
                value={bio}
                placeholder="Um texto legal sobre você"
                placeholderTextColor="gray"
                maxLength={350}
                multiline={true}
                onChangeText={(text) => setBio(text)}
              />
            </EditProfileForm>
            <ChangePassword>
              <ChangePasswordText>Alterar senha</ChangePasswordText>
              <FormInput
                name="old_password"
                placeholder="Senha Atual"
                textContentType="password"
                returnKeyType="send"
                secureTextEntry
              />
              <FormInput 
                name="password"
                placeholder="Nova Senha"
                textContentType="newPassword"
                returnKeyType="send"
                secureTextEntry
              />
              <FormInput 
                name="confirm_password"
                placeholder="Confirmação da Nova Senha"
                textContentType="newPassword"
                returnKeyType="send"
                secureTextEntry
              />
            </ChangePassword>
            <SaveBtn>
              <SaveBtnView  
                onPress={() => {
                  formRef.current.submitForm()
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
