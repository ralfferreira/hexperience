import React from 'react';
import { ScrollView } from 'react-native' ;

import FloatButton from '../../components/FloatButton'
import Header from '../../components/Header';
import HorizontalCard from '../../components/HorizontalCard';

import { useAuth } from '../../hooks/auth';

import CreateFolderImg from '../../assets/img/create-folder.png';
import FolderImg from '../../assets/img/folder.png';
// import ExperienceImg from '../../assets/img/div-image-experience.png'
import OrderByImg from '../../assets/img/arrow-down.png';
const ExperienceImg = require('../../assets/img/div-image-experience.png');

import { 
  Container, 
  ListAndCreate, 
  OrderBy, 
  OrderByText, 
  OrderByArrow, 
  CreateFolder, 
  Folder, 
  Folders, 
  FolderIcon, 
  FolderName, 
  Experiences 
} from './styles';

const Favorites = () => {
  const { user } = useAuth()

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
            <FolderName numberOfLines={2}>Experiência de Férias</FolderName>
          </Folder>
          <Folder>
            <FolderIcon source={FolderImg} />
            <FolderName numberOfLines={2}>Experiência para as crianças</FolderName>
          </Folder>
          <Folder>
            <FolderIcon source={FolderImg} />
            <FolderName numberOfLines={2}>Experiência com os amigos</FolderName>
          </Folder>
        </Folders>

        <Experiences horizontal={false} showsHorizontalScrollIndicator={false}>
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Andar à cavalo"
            localizationText="São Paulo - SP"
            price="R$ 600,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
          <HorizontalCard 
            image= {ExperienceImg}
            name="Pescaria com Caio Castro"
            localizationText="Fortaleza - CE"
            price="R$ 800,00" 
          />
        </Experiences> 
      </ScrollView>
      {user.type === 'host' ? <FloatButton /> : <></>}
    </Container>
  );
};
export default Favorites