import React, { useRef, useCallback, useEffect, useState, useMemo } from 'react'
import { ScrollView, KeyboardAvoidingView, Alert, StyleSheet, Modal } from 'react-native';
import { geocodeAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { isAfter, parseISO, format, addMinutes, getHours } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native'; 
import * as ImagePicker from 'expo-image-picker';
import ptBR from 'date-fns/esm/locale/pt-BR';
import { Form } from "@unform/mobile";
import * as Yup from 'yup'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import ExperienceTitleInput from '../../components/ExperienceTitleInput';
import ExperienceDescriptionInput from '../../components/ExperienceDescriptionInput';
import ExperienceDetailsInput from '../../components/ExperienceDetailsInput';
import ExperienceCategory from '../../components/ExperienceCategory'
import AddCategory from '../../components/AddCategory';
import ExperienceSchedule from '../../components/ExperienceSchedule';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

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
  ExperienceDetailsRowAddress,
  ParentalRating, 
  ParentalRatingOption, 
  PlusImg, 
  ImageDetails, 
  ParentalRatingImg, 
  SaveBtn, 
  SaveBtnText, 
  SaveBtnView,
  ExperienceImageCarrousel,
  Touchable,
  Align,
  ModalView,
  AlignCallback,
  ExperienceSchedules,
  OptionTitle,
  Row
} from './styles';

const CreateExperience = () => {
  const navigation = useNavigation();
  const formRef = useRef(null);

  const [cover, setCover] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [duration, setDuration] = useState(null);
  
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

  const [address, setAddress] = useState(null);
  const [geocode, setGeocode] = useState(null);

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
      const response = await requestForegroundPermissionsAsync();
      if (response.status !== 'granted') {
        alert('Precisamos de permissão para acessar a localização');
      }
    })();
  }, []);

  useEffect(() => {
    api.get('/experiences/categories').then((response) => {
      setCategories(response.data);
    }).catch((err) => {
      Alert.alert('Erro ao carregar as categorias', `${err.response.data.message}`);
    })
  }, []);

  useEffect(() => {
    if (categories.length) {
      setSelectedCategory(categories[0]); 
    }    
  }, [categories]);

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

      if (!cover) {
        throw new Error('No minimo uma imagem deve ser enviada');
      }

      if (selectedCategory.id === 0) {
        throw new Error("Escolha uma categoria");
      }

      const createData = {
        name: data.title,
        duration: data.duration,
        description: data.description,
        price: data.price,
        requirements: data.requirements,
        parental_rating: parentalRating,
        max_guests: data.amount_people,
        category_id: selectedCategory.id
      }

      if (address && geocode) {
        Object.assign(createData, {
          latitude: geocode.latitude,
          longitude: geocode.longitude,
          address: address,
          is_online: false
        });
      } else {
        Object.assign(createData, {
          is_online: true
        });
      }

      const result = await api.post('/experiences', createData);

      const coverData = new FormData();

      coverData.append('cover', {
        type: 'image/jpeg',
        name: `cover:${cover.substr(-10, 10)}.jpg`,
        uri: cover,
      })

      const coverUpdate = setTimeout(() => { 
        api.patch(`/experiences/${result.data.id}/cover`, coverData)
      }, 500)

      Promise.resolve(coverUpdate);

      const addPhotos = photos.map(uri => {
        const photoData = new FormData();

        photoData.append('photo', {
          type: 'image/jpeg',
          name: `photo:${uri.substr(-10, 10)}.jpg`,
          uri: uri,
        });

        const requests = setTimeout(() => {
          api.post(`/experiences/${result.data.id}/photos`, photoData)
        }, 500);

        return requests
      });

      Promise.all(addPhotos);

      await api.post('/experiences/schedules', {
        date: selectedTime,
        experience_id: result.data.id
      }); 

      Alert.alert('Sucesso', 'Experiência criada com sucesso!');

      navigation.navigate('Profile');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        Alert.alert(
          'Erro ao criar experiência',
          `${err.message}`
        );

        return;
      }

      Alert.alert(
        'Erro ao criar experiência',
        `${err.response.data.message}`
      );
    }
  }, [parentalRating, cover, photos, navigation, geocode, address, selectedCategory, selectedTime]);  

  const handlePickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (!cover) {
      setCover(result.uri);
      return;
    }

    if (photos.length >= 4) {
      Alert.alert('Limite atingido', 'Só é possível subir 5 imagens por experiência');
      
      return;
    }

    setPhotos([...photos, result.uri]);
  }, [cover, photos]);

  const handleCoverDecision = useCallback(() => {
    Alert.alert(
      'Capa da experiência',
      'O que deseja fazer com a capa da experiência?',
      [
        { text: 'Fechar', style: 'cancel', onPress: () => {} },
        { text: 'Alterar', style: 'default', onPress: () => handleChangeCover().finally(() => {}) },

      ]
    )
  }, [handleChangeCover]);

  const handleChangeCover = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    setCover(result.uri);
  }, [cover]);

  const handlePhotoDecision = useCallback(async (i) => {
    Alert.alert(
      'Foto da experiência',
      'O que deseja fazer com esta foto da experiência?',
      [
        { text: 'Fechar', style: 'cancel', onPress: () => {} },
        { text: 'Alterar', style: 'default', onPress: () => handleChangePhoto(i).finally(() => {}) },
        { text: 'Remover', style: 'destructive', onPress: () => handleRemovePhoto(i) }
      ]
    )
  }, []);

  const handleChangePhoto = useCallback(async (i) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    const uris = photos;
    uris.splice(i, 1, result.uri);
    setPhotos([...uris]);
  }, [photos]);

  const handleRemovePhoto = useCallback((i) => {
    const uris = photos;
    uris.splice(i, 1);

    setPhotos([...uris]);
  }, [photos]);

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

  const handleShowCategoryModal = useCallback(() => {
    setCategoryModalVisible(true);
  }, []);

  const handleSelectCategory = useCallback((cat) => {
    setSelectedCategory(cat);
    setCategoryModalVisible(false);
  }, []);

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
  }, [mode]);

  const handleAddSchedule = useCallback(async () => {
    if (!isAfter(selectedTime, new Date())) {
      Alert.alert('Erro ao adicionar horário', 'Não é possível adicionar um horário que já passou');
      return;
    }

    if (getHours(selectedTime) < 5 && getHours(selectedTime) > 0) {
      Alert.alert('Erro ao adicionar horário', 'Agendamentos não podem ocorrer entre às 00h00 e 05h00');
      return;
    }

    setSchedulesModalVisible(false);

    setMode('date');
    setShowDateTimePicker(false);
  }, [selectedTime]);

  const formattedDate = useMemo(() => {
    const date = format(selectedTime, "EEEE',' dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,            
    }); 

    const dateText = date.charAt(0).toUpperCase() + date.slice(1);

    return dateText
  }, [selectedTime]);

  const formattedDuration = useMemo(() => {
    if (duration === null) {
      return '';
    }

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
        Nova Experiência
      </HeaderWithoutSearch>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        />        
        <Form ref={formRef} onSubmit={handleSubmit} >          
          <ExperienceTitleInput 
            name="title"
            placeholder="Título da Experiência"
            placeholderTextColor="gray"
            maxLength={100}
            multiline
          />

          <Title>Imagens</Title>
          <ExperienceImageView>
            <ExperienceImageCarrousel horizontal={true} showsHorizontalScrollIndicator={false}>
              {
                cover && 
                <Touchable onPress={handleCoverDecision}>
                  <ExperienceImage 
                    source={{ uri: cover }}
                  /> 
                </Touchable>
              }
              {
                photos.length >= 1
                ? photos.map((photo, i) => {
                  return (
                    <Touchable 
                      key={`Touchable:${photo}:${i}`}
                      onPress={() => handlePhotoDecision(i)}
                    >
                      <ExperienceImage key={`Photo:${photo}:${i}`} source={{uri: photo}} />
                    </Touchable>
                  )
                })
                : (<></>)
              }
              <AddExperienceImage onPress={handlePickImage}>
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
                value={duration}
                onChangeText={(value) => setDuration(value)}
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

          <Title>Horários</Title>
          <ExperienceSchedules horizontal={true} showsHorizontalScrollIndicator={false}>
            <ExperienceSchedule
              date={formattedDate}
              time={formattedDuration}
              buttonText='Editar'
              onPress={() => {
                if (!duration) {
                  Alert.alert('Adicionar horário', 'Não é possível adicionar horários, sem antes mencionar a duração')
                  return;
                }
  
                setSchedulesModalVisible(true);
              }}
            />
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
            {
              selectedTime === false &&
              (
                <AddExperienceImage onPress={() => {
                  if (!duration) {
                    Alert.alert('Adicionar horário', 'Não é possível adicionar horários, sem antes mencionar a duração')
                    return;
                  }
    
                  setSchedulesModalVisible(true);
                }}>              
                  <PlusImg source={PlusIcon} />
                </AddExperienceImage>
              )
            }            
          </ExperienceSchedules>

          <Title>O Que Levar? (Opcional)</Title>
          <ExperienceDescriptionInput
            autoCapitalize="words"
            name="requirements"
            placeholder="O que levar na sua experiência? (Opcional)"
            placeholderTextColor="gray"
            maxLength={300}
            multiline
          />
          <SaveBtn>
            <SaveBtnView 
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              <SaveBtnText>Criar Experiência</SaveBtnText>
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

export default CreateExperience;
