import React, { 
  createContext, 
  useCallback, 
  useContext, 
  useEffect, 
  useState,
  useMemo
} from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

import { useAuth } from './auth';

const FavoritesContext = createContext({});

const FavoritesProvider = ({children}) => {
  const { loading, user  } = useAuth();

  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    async function loadStorage() {
      const favorites = await AsyncStorage.getItem('@Hexperience:favorites');

      if (favorites) {
        setFavorites(JSON.parse(favorites));
      }      
    }

    loadStorage().then(() => loadFavorites());
  }, []);

  const loadFavorites = useCallback(async () => {
    if (!loading) {
      return;
    }

    if (!user) {
      return;
    }

    try {
      const response = await api.get('/experiences/favorites');

      await AsyncStorage.setItem('@Hexperience:favorites', JSON.stringify(response.data));

      setFavorites(response.data);
    } catch (err) {
      Alert.alert('Erro ao carregar favoritos', `${err.response.data.message}`);
    }
  }, [loading, user]);

  const favoritesRelation = useMemo(() => {
    if (!user) {
      return [];
    }
    
    if (!favorites.length) {
      return [];
    }

    const relations = favorites.map((fav) => {
      return {
        id: fav.id,
        user_id: user.id,
        exp_id: fav.experience.id,
        folder: fav.folder
      }
    });

    return relations
  }, [favorites, user]);

  const folders = useMemo(() => {
    if (!favoritesRelation.length) {
      return [];
    }

    const listOfFolders = [...new Set(favoritesRelation.map(fav => {
      return fav.folder;
    }))];

    return listOfFolders;
  }, [favoritesRelation]);

  return (
    <FavoritesContext.Provider
      value={{ folders, favoritesRelation, loadFavorites, favorites }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within an FavoritesProvider');
  }

  return context
}

export { useFavorites, FavoritesProvider };