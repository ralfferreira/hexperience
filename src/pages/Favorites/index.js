import React from 'react';
import OrderByImg from '../../assets/img/arrow-down.png'
import CreateFolderImg from '../../assets/img/create-folder.png'
import FolderImg from '../../assets/img/folder.png'
// import ExperienceImg from '../../assets/img/div-image-experience.png'
import { 
Container, ListAndCreate, OrderBy, OrderByText, OrderByArrow, CreateFolder, Folder,
Folders, FolderIcon, FolderName, Experiences } from './styles';
import Header from '../../components/Header'
import { ScrollView } from 'react-native' 
import HorizontalCard from '../../components/HorizontalCard';

const ExperienceImg = require('../../assets/img/div-image-experience.png')

const Favorites = () => {
  return (
    <Container>
      <Header>Favoritos</Header>
      <ListAndCreate>
        <OrderBy>
          <OrderByText>Ordenar por </OrderByText>
          <OrderByArrow source={OrderByImg} />
        </OrderBy>
        <CreateFolder source={CreateFolderImg} />
      </ListAndCreate>

      <ScrollView>
      <Folders horizontal={true} showsHorizontalScrollIndicator={false}>
        <Folder>
          <FolderIcon source={FolderImg} />
          <FolderName numberOfLines={2}>Experiência para as criançasExperiência para as crianças</FolderName>
        </Folder>
        <Folder>
          <FolderIcon source={FolderImg} />
          <FolderName numberOfLines={2}>Experiência para as crianças</FolderName>
        </Folder>
        <Folder>
          <FolderIcon source={FolderImg} />
          <FolderName numberOfLines={2}>Experiência para as crianças</FolderName>
        </Folder>
      </Folders>

      <Experiences horizontal={false} showsHorizontalScrollIndicator={false}>
        <HorizontalCard 
        image= {ExperienceImg}
        name="Pescaria com Caio Castro"
        localizationText="Fortaleza - CE"
        price="R$ 800,00" />
      </Experiences>
      </ScrollView>
    </Container>
  );
};
export default Favorites