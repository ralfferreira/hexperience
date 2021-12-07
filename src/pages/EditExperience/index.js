import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { ScrollView, KeyboardAvoidingView, Alert, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { isAfter, parseISO, format, addMinutes, getHours } from 'date-fns';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import ptBR from 'date-fns/esm/locale/pt-BR';
import { Form } from "@unform/mobile";
import * as Yup from 'yup';

import ExperienceCategory from '../../components/ExperienceCategory';
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import ExperienceTitleInput from '../../components/ExperienceTitleInput';
import ExperienceDescriptionInput from '../../components/ExperienceDescriptionInput';
import ExperienceDetailsInput from '../../components/ExperienceDetailsInput';
import AddSchedule from '../../components/AddSchedule';
import AddCategory from '../../components/AddCategory';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import PlusIcon from '../../assets/img/plusicon.png';
import AddressIcon from '../../assets/img/address.png';
import DurationIcon from '../../assets/img/duration.png';
import AmountPeopleIcon from '../../assets/img/amountpeople.png';
import PriceIcon from '../../assets/img/price.png';
import FreeIcon from '../../assets/img/freeicon.png';
import TenYearsIcon from '../../assets/img/tenyearsicon.png';
import TwelveYearsIcon from '../../assets/img/twelveyearsicon.png';
import FourteenYearsIcon from '../../assets/img/fourteenyearsicon.png';
import SixteenYearsIcon from '../../assets/img/sixteenyearsicon.png';
import EighteenYearsIcon from '../../assets/img/eighteenyearsicon.png';

import { 
  Container, 
  Title,
  ExperienceImageView, 
  ExperienceImage, 
  AddExperienceImage, 
  ExperienceDetails, 
  ExperienceDetailsRow, 
  ParentalRating, 
  ParentalRatingOption, 
  PlusImg, 
  ImageDetails, 
  ParentalRatingImg, 
  SaveBtn, 
  SaveBtnText, 
  SaveBtnView, 
  Touchable,
  ExperienceSchedules,
  ExperienceImageCarrousel,
  Align,
  AlignCallback,
  ModalView,
  OptionTitle,
  Row,
  ExperienceDetailsRowAddress
} from './styles';

const EditExperience = () => {
  const updateFormRef = useRef()
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();

  const routeParams = route.params;

  const [experience, setExperience] = useState({ photos: [], schedules: [] });
  const [duration, setDuration] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [cover, setCover] = useState(null);

  const [address, setAddress] = useState(null);
  const [geocode, setGeocode] = useState(null);

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ name: null, id: 0 });

  const [parentalRating, setParentalRating] = useState(1);
  const [freeForAll, setFreeForAll] = useState(true);
  const [tenYears, setTenYears] = useState(false);
  const [twelveYears, setTwelveYears] = useState(false);
  const [fourteenYears, setFourteenYears] = useState(false);
  const [sixteenYears, setSixteenYears] = useState(false);
  const [eighteenYears, setEighteenYears] = useState(false);

  const [schedulesModalVisible, setSchedulesModalVisible] = useState(false);
  const [mode, setMode] = useState('date');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Precisamos de permissão para acessar a galeria.');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await Location.requestForegroundPermissionsAsync();
      if (response.status !== 'granted') {
        alert('Precisamos de permissão para acessar a localização');
      }
    })();
  }, []);

  const getExperience = useCallback(async () => {
    try {
      const response = await api.get(`/experiences/${routeParams.exp_id}/show`);

      setExperience(response.data);
    } catch (err) {
      Alert.alert('Erro ao carregar Experiência', `${err.response.data.message}`);
    }
  }, [routeParams]);

  const getCategories = useCallback(async () => {
    try {
      const response = await api.get('/experiences/categories');

      setCategories(response.data);
    } catch (err) {
      Alert.alert('Erro ao carregar categorias', `${err.response.data.message}`);
    }
  }, []);

  useEffect(() => {
    getExperience().finally(() => {});
  }, []);

  useEffect(() => {
    if (experience.duration) {
      setDuration(experience.duration)
    }

    if (experience.max_guests) {
      setMaxGuests(experience.max_guests);
    }

    if (experience.cover_url) {
      setCover(experience.cover_url)
    }

    if (experience.parental_rating) {
      handleParentalRating(experience.parental_rating);
    }

    if (experience.category) {
      setSelectedCategory(experience.category);
    }

    getCategories().finally(() => {});
  }, [experience]);

  const handleUpdateCover = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (result.cancelled) {
      return;
    }

    const coverForm = new FormData();

    coverForm.append('cover', {
      type: 'image/jpeg',
      name: `cover:${result.uri.substr(-10, 10)}.jpg`,
      uri: result.uri,
    });

    try {
      const response = await api.patch(`/experiences/${experience.id}/cover`, coverForm);

      setExperience(response.data);
    } catch (err) {
      Alert.alert('Erro ao atualizar capa da experiência', `${err.response.data.message}`);
    }
  }, [experience]);

  const handleChangeCoverEvent = useCallback(() => {
    Alert.alert(
      'Atualizar capa',
      'Tem certeza que deseja atualizar a capa da experiência?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => handleUpdateCover(),          
        }
      ]
    );
  }, [handleUpdateCover]);

  const handleUpdatePhoto = useCallback(async (photo_id) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (result.cancelled) {
      return;
    }

    const photoForm = new FormData();

    photoForm.append('photo', {
      type: 'image/jpeg',
      name: `photo:${result.uri.substr(-10, 10)}.jpg`,
      uri: result.uri,
    });

    try {
      const response = await api.patch(
        `/experiences/${experience.id}/photos/${photo_id}`, 
        photoForm
      );

      setExperience(response.data);
    } catch (err) {
      Alert.alert('Erro ao atualizar imagem da experiência', `${err.response.data.message}`);
    }
  }, [experience]);

  const handleDeletePhoto = useCallback((photo_id) => {
    api.delete(`/experiences/${experience.id}/photos/${photo_id}`).then((response) => {
      setExperience(response.data);

      Alert.alert('Sucesso', 'Foto foi excluída com sucesso');      
    }).catch((err) => {
      Alert.alert('Erro ao excluir foto', `${err.response.data.message}`);
    })
  }, [experience]);

  const handlePhotosEvent = useCallback((photo_id) => {
    Alert.alert(
      'Imagem da Experiência',
      'O que deseja fazer?',
      [
        { text: 'Fechar', onPress: () => {}, style: 'cancel' },
        { text: 'Atualizar', onPress: () => handleUpdatePhoto(photo_id) },
        { text: 'Excluir', onPress: () => handleDeletePhoto(photo_id) }
      ]
    )
  }, [handleUpdatePhoto, handleDeletePhoto]);

  const handleAddPhotosEvent = useCallback(async () => {
    if (!cover) {
      await handleUpdateCover();
      return;
    }

    if (experience.photos.length >= 4) {
      Alert.alert('Limite atingido', 'Cada experiência pode ter apenas 5 fotos');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (result.cancelled) {
      return;
    }

    const photoForm = new FormData();

    photoForm.append('photo', {
      type: 'image/jpeg',
      name: `photo:${result.uri.substr(-10, 10)}.jpg`,
      uri: result.uri,
    });

    try {
      const response = await api.post(
        `/experiences/${experience.id}/photos`, 
        photoForm
      );

      setExperience(response.data);
    } catch (err) {
      Alert.alert('Erro ao atualizar imagem da experiência', `${err.response.data.message}`);
    }
  }, [cover, experience]);

  const handleParentalRating = useCallback((age) => {
    setParentalRating(age);
    switch (age) {
      case 10:
        setFreeForAll(false);
        setTenYears(true);
        setTwelveYears(false);
        setFourteenYears(false);
        setSixteenYears(false);
        setEighteenYears(false);
        break;
      case 12:
        setFreeForAll(false);
        setTenYears(false);
        setTwelveYears(true);
        setFourteenYears(false);
        setSixteenYears(false);
        setEighteenYears(false);
        break;
      case 14:
        setFreeForAll(false);
        setTenYears(false);
        setTwelveYears(false);
        setFourteenYears(true);
        setSixteenYears(false);
        setEighteenYears(false);
        break;
      case 16:
        setFreeForAll(false);
        setTenYears(false);
        setTwelveYears(false);
        setFourteenYears(false);
        setSixteenYears(true);
        setEighteenYears(false);
        break;
      case 18:
        setFreeForAll(false);
        setTenYears(false);
        setTwelveYears(false);
        setFourteenYears(false);
        setSixteenYears(false);
        setEighteenYears(true);
        break;
      default:
        setFreeForAll(true);
        setTenYears(false);
        setTwelveYears(false);
        setFourteenYears(false);
        setSixteenYears(false);
        setEighteenYears(false);
        break;
    }
  }, []);

  const handleAddSchedule = useCallback(async () => {
    if (!isAfter(selectedTime, new Date())) {
      Alert.alert('Erro ao adicionar horário', 'Não é possível adicionar um horário que já passou');
      return;
    }

    if (getHours(selectedTime) < 5 && getHours(selectedTime) > 0) {
      Alert.alert('Erro ao adicionar horário', 'Agendamentos não podem ocorrer entre às 00h00 e 05h00');
      return;
    }

    try {
      await api.post('/experiences/schedules', {
        date: selectedTime,
        experience_id: experience.id
      }); 

      await getExperience();
      setSelectedDate(new Date());
      setSelectedTime(new Date());
      setSchedulesModalVisible(false);

      Alert.alert('Sucesso', 'Horário criado com sucesso');

      setMode('date');
      setShowDateTimePicker(false);
    } catch (err) {
      Alert.alert('Erro ao adicionar horário', `${err.response.data.message}`);
    }
  }, [experience, selectedTime]);

  const handleDeleteSchedule = useCallback(async (id) => {
    try {
      await api.delete('/experiences/schedules', {
        schedule_id: id,
        host_id: user.host.id       
      });

      await getExperience();
      Alert.alert('Sucesso', 'Horário para agendamento foi cancelado com sucesso');
    } catch (err) {
      Alert.alert('Erro ao deletar horário', `${err.response.data.message}`);
    }
  }, [user]);

  const ensureDeleteSchedule = useCallback((id) => {
    Alert.alert(
      'Deletar horário para agendamentos',
      'Tem certeza que deseja deletar este horário para agendamento',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => {} },
        { text: 'Deletar', style: 'destructive', onPress: () => handleDeleteSchedule(id) }
      ]
    )
  }, []);

  const handleShowCategoryModal = useCallback(() => {
    setCategoryModalVisible(true);
  }, []);

  const handleSelectCategory = useCallback((cat) => {
    setSelectedCategory(cat);
    setCategoryModalVisible(false);
  }, []);

  const searchForAddress = useCallback(async (address) => {
    const results = await geocodeAsync(address);

    if (!results.length) {
      Alert.alert('Erro ao procurar endereço', 'Nenhum endereço foi encontrado');
      setGeocode(null);
      return;
    }

    if (results.length > 1) {
      Alert.alert(
        'Erro ao procurar endereço', 
        'Muitos resultados foram retornados, tente ser mais específico'
      );
      setGeocode(null);
      return;
    }

    setGeocode({ 
      latitude: results[0].latitude.toFixed(5),
      longitude: results[0].longitude.toFixed(5)
    })
  }, []);

  const handleSubmit = useCallback(async (data) => {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('Título é obrigatório'),
        description: Yup.string().required('Descrição é obrigatório'),
        duration: Yup.number().max(360).required('Duração é obrigatório'),
        amount_people: Yup.number().required('Número de pessoas por horário é obrigatório'),
        price: Yup.number().min(0).required('Preço é obrigatorio'),
        requirements: Yup.string().optional()
      });

      await schema.validate(data, {
        abortEarly: true
      });

      if (selectedCategory.id === 0) {
        throw new Error("Escolha uma categoria");
      }

      const updateData = {
        name: data.title,
        duration: data.duration,
        description: data.description,
        price: data.price,
        requirements: data.requirements,
        parental_rating: parentalRating,
        max_guests: data.amount_people,
        category_id: selectedCategory.id,
        experience_id: experience.id
      }

      if (address && geocode) {
        Object.assign(updateData, {
          latitude: geocode.latitude,
          longitude: geocode.longitude,
          address: address,
          is_online: false
        });
      } else {
        Object.assign(updateData, {
          is_online: true
        });
      }

      await api.put('/experiences', updateData);

      Alert.alert('Sucesso', 'Experiência foi atualizada com sucesso');
      navigation.navigate('Profile')
    } catch (err) {
      console.log(err.response);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        updateFormRef.current?.setErrors(errors);

        Alert.alert(
          'Erro ao atualizar experiência',
          `${err.message}`
        );

        return;
      }  

      Alert.alert(
        'Erro ao atualizar experiência',
        `${err.response.data.message}`
      );
    }
  }, [experience, address, geocode, selectedCategory, parentalRating, navigation]);

  const handleSelectDate = useCallback((event, selectedValue) => {
    setShowDateTimePicker(Platform.OS === 'ios');

    if (mode === 'date') {
      const currentDate = selectedValue || new Date();
      setSelectedDate(currentDate);
      setMode('time');
      setShowDateTimePicker(Platform.OS !== 'ios')
    } else {
      const selectedTime = selectedValue || new Date();
      setSelectedTime(selectedTime);
      setMode('date');
      setShowDateTimePicker(Platform.OS === 'ios');
    }
  }, [mode])
 
  const schedules = useMemo(() => {
    if (!experience.schedules.length) {
      return [];
    }

    return experience.schedules.filter(schedule => {
      const parsedDate = parseISO(schedule.date);

      if (isAfter(parsedDate, new Date())) {
        return schedule;
      }
    });
  }, [experience]);

  const formattedDate = useMemo(() => {
    const date = format(selectedTime, "EEEE',' dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,            
    }); 

    const dateText = date.charAt(0).toUpperCase() + date.slice(1);

    return dateText
  }, [selectedTime]);

  const formattedDuration = useMemo(() => {
    const startsAt = format(selectedTime, "HH:mm", {
      locale: ptBR
    });

    const endsAt = format(addMinutes(selectedTime, duration), "HH:mm", {
      locale: ptBR
    });

    return `${startsAt} - ${endsAt}`
  }, [selectedTime, duration]);

  return (
    <Container>
      <HeaderWithoutSearch>
        Editar Experiência
      </HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        />
        <Form 
          ref={updateFormRef} 
          onSubmit={handleSubmit}
          initialData={{ 
            title: experience.name,
            description: experience.description,
            address: experience.address,
            duration: duration.toString(),
            amount_people: maxGuests.toString(),
            price: experience.price,
            requirements: experience.requirements
          }}
        >
          <ExperienceTitleInput 
            autoCapitalize="words"
            name="title"
            placeholder="Titulo da Experiência"
            placeholderTextColor="gray"
            maxLength={200}
            multiline
          />

          <Title>Imagens</Title>
          <ExperienceImageView>
            <ExperienceImageCarrousel horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                cover && 
                <Touchable onPress={handleChangeCoverEvent}> 
                  <ExperienceImage 
                    source={{ uri: cover }} 
                  />
                </Touchable>
              }
              {
                experience.photos.length
                ? experience.photos.map(photo => {
                  return (
                    <Touchable 
                      key={`TouchablePhoto:${photo.id}`}
                      onPress={() => handlePhotosEvent(photo.id)}
                    >
                      <ExperienceImage 
                        key={`Photo:${photo.id}`}
                        source={{ uri: photo.photo_url }} 
                      />
                    </Touchable>
                  )
                })
                : (<></>)
              }
              <AddExperienceImage onPress={handleAddPhotosEvent}>
                <PlusImg source={PlusIcon} />
              </AddExperienceImage>
            </ExperienceImageCarrousel>
          </ExperienceImageView>

          <Title>Categoria</Title>
          <ExperienceDetailsRow>
            <Touchable
              onPress={handleShowCategoryModal}
            >
              <ExperienceCategory name={selectedCategory.name} />
            </Touchable>
            <Align>
              <Modal
                animationType="slide"
                transparent={true}
                visible={categoryModalVisible}
                onRequestClose={() => {                  
                  setCategoryModalVisible(false);
                }}
              >
                <ModalView>
                  <AlignCallback>
                    <Title>Selecionar Categoria</Title>
                  </AlignCallback>
                  <ExperienceImageCarrousel>
                    {
                      categories.length
                      ? categories.map(cat => {
                        return (
                          <Touchable
                            key={`CatTouchable:${cat.id}`}
                            onPress={() => handleSelectCategory(cat)}
                          >
                            <AddCategory 
                              key={`Category:$:${cat.id}`}
                              name={cat.name} 
                            />
                          </Touchable>
                        )
                      })
                      : (<></>)
                    }
                  </ExperienceImageCarrousel>
                </ModalView>
              </Modal>
            </Align>
          </ExperienceDetailsRow>

          <Title>Descrição</Title>
          <ExperienceDescriptionInput 
            autoCapitalize="words"
            name="description"
            placeholder="Descreva sua experiência para o mundo!"
            placeholderTextColor="gray"
            maxLength={300}
            multiline
          />

          <Title>Detalhes</Title>
          <ExperienceDetails>
            <ExperienceDetailsRowAddress>
              <ImageDetails source={AddressIcon} />
              <ExperienceDetailsInput           
                name="address"
                placeholder="Endereço (Se nenhum for fornecido, então ela será online)"
                placeholderTextColor="gray"
                maxLength={100}
                value={address}
                onChangeText={(text) => setAddress(text)}
                onEndEditing={() => searchForAddress(address)}
                multiline              
              />
            </ExperienceDetailsRowAddress>
            <ExperienceDetailsRow>
              <ImageDetails source={DurationIcon} />
              <ExperienceDetailsInput 
                keyboardType="number-pad"                
                name="duration"
                placeholder="Duração da experiência em minutos"
                placeholderTextColor="gray"
                maxLength={100}                
              />
            </ExperienceDetailsRow>
            <ExperienceDetailsRow>
              <ImageDetails source={AmountPeopleIcon} />
              <ExperienceDetailsInput 
                keyboardType="number-pad"  
                name="amount_people"
                placeholder="Quantidade de pessoas por horário"
                placeholderTextColor="gray"
                maxLength={100}
              />
            </ExperienceDetailsRow>
            <ExperienceDetailsRow>
              <ImageDetails source={PriceIcon} />
              <ExperienceDetailsInput 
                keyboardType="number-pad"  
                name="price"
                placeholder="Preço"
                placeholderTextColor="gray"
                maxLength={100}
              />
            </ExperienceDetailsRow>
          </ExperienceDetails>

          <Title>Classificação Indicativa</Title>
          <ParentalRating>
            <ParentalRatingOption
              style={freeForAll ? styles.parentalRating : {}}
              onPress={() => handleParentalRating(1)}
            >
              <ParentalRatingImg source={FreeIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption
              style={tenYears ? styles.parentalRating : {}}
              onPress={() => handleParentalRating(10)}
            >
              <ParentalRatingImg source={TenYearsIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption
              style={twelveYears ? styles.parentalRating : {}}
              onPress={() => handleParentalRating(12)}
            >
              <ParentalRatingImg source={TwelveYearsIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption
              style={fourteenYears ? styles.parentalRating : {}}
              onPress={() => handleParentalRating(14)}
            >
              <ParentalRatingImg source={FourteenYearsIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption
              style={sixteenYears ? styles.parentalRating : {}}
              onPress={() => handleParentalRating(16)}
            >
              <ParentalRatingImg source={SixteenYearsIcon} />
            </ParentalRatingOption>

            <ParentalRatingOption
              style={eighteenYears ? styles.parentalRating : {}}
              onPress={() => handleParentalRating(18)}
            >
              <ParentalRatingImg source={EighteenYearsIcon} />
            </ParentalRatingOption>
          </ParentalRating>

          <Title>O Que Levar? (Opcional)</Title>
          <ExperienceDescriptionInput
            autoCapitalize="words"
            name="requirements"
            placeholder="O que levar na sua experiência? (Opcional)"
            placeholderTextColor="gray"
            maxLength={300}
            multiline
          />

          <Title>Horários</Title>
          <ExperienceSchedules horizontal={true} showsHorizontalScrollIndicator={false}>
            {
              schedules.length
              ? schedules.map(schedule => {
                return (
                  <AddSchedule 
                    key={`AddSchedule:${schedule.id}`}
                    datetime={schedule.date}
                    duration={experience.duration ? experience.duration : 0}
                    onPress={() => ensureDeleteSchedule(schedule.id)}             
                  />
                )
              })
              : (<></>)
            }
            <Align>
              <Modal
                animationType="slide"
                transparent={true}
                visible={schedulesModalVisible}
                onRequestClose={() => {
                  setSelectedDate(new Date())
                  setSelectedTime(new Date())
                  setSchedulesModalVisible(false);
                }}>
                <ModalView>
                  <AlignCallback>
                    <Title>Adicionar Horário</Title>
                  </AlignCallback>                  
                  <AlignCallback>
                    <Title style={styles.center}>{formattedDate}</Title>
                  </AlignCallback>
                  <AlignCallback>
                    <Title>{formattedDuration}</Title>
                  </AlignCallback>
                  {
                    showDateTimePicker 
                    && (
                      <DateTimePicker
                        value={selectedDate}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        onChange={handleSelectDate}
                      />
                    )
                  }
                  <SaveBtn>
                    <SaveBtnView 
                      onPress={() => setShowDateTimePicker(true)}
                    >
                      <SaveBtnText>Selecionar Horário</SaveBtnText>
                    </SaveBtnView>
                  </SaveBtn>
                  <AlignCallback>
                      <OptionTitle style={styles.center}>Deseja confirmar a criação do horário?</OptionTitle>
                      <Row>
                        <Touchable
                          onPress={() => {
                            setSelectedDate(new Date())
                            setSelectedTime(new Date())
                            setSchedulesModalVisible(false);
                          }}
                        >
                          <OptionTitle style={styles.red}>Não</OptionTitle>
                        </Touchable>
                        <Touchable 
                          onPress={() => handleAddSchedule()}
                        >
                          <OptionTitle style={styles.green}>Sim</OptionTitle>
                        </Touchable>
                      </Row>
                    </AlignCallback>  
                </ModalView>
              </Modal>
            </Align>
            <AddExperienceImage onPress={() => setSchedulesModalVisible(true)}>              
              <PlusImg source={PlusIcon} />
            </AddExperienceImage>
          </ExperienceSchedules>

          <SaveBtn>
            <SaveBtnView 
              onPress={() => { 
                updateFormRef.current?.submitForm();
              }}
            >
              <SaveBtnText>Salvar Alterações</SaveBtnText>
            </SaveBtnView>
          </SaveBtn>
        </Form>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  parentalRating: {
    borderColor: '#ff07f0',
    borderWidth: 4,
    borderRadius: 8,
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

export default EditExperience;
