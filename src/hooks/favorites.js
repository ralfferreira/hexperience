import React, { 
  createContext, 
  useCallback, 
  useContext, 
  useEffect, 
  useState,
  useMemo
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

import { useAuth } from './auth';

const FavoritesContext = createContext({});

const FavoritesProvider = ({children}) => {
  const { loading, user  } = useAuth();

  const [favoritesRelation, setFavoritesRelation] = useState(null);
  
  useEffect(() => {
    async function loadFavoritesRelation() {
      const storagedFavorites = await AsyncStorage.getItem('@Hexperience:favorites');    

      if (storagedFavorites) {
        const parsedFavorites = JSON.parse(storagedFavorites);

        setFavoritesRelation(parsedFavorites);
      }
    }

    loadFavoritesRelation().then(() => {
      if (loading && !user) {
        return;
      }

      loadFavorites()
    });
  }, [loading, user]);

  const loadFavorites = useCallback(async () => {    
    const { data } = await api.get('/experiences/favorites');

    const favs = data.map(fav => {
      return {
        id: fav.id,
        exp_id: fav.experience.id,
        folder: fav.folder
      }
    });

    await handleSetFavoritesRelation(favs);
  }, [handleSetFavoritesRelation]);

  const handleSetFavoritesRelation = useCallback(async (array) => {
    if (favoritesRelation) {
      array.push(...favoritesRelation);
    }

    const favs = [...new Set(array)];
    
    await AsyncStorage.setItem('@Hexperience:favorites', JSON.stringify(favs));

    setFavoritesRelation(favs);
  }, [favoritesRelation, setFavoritesRelation]);

  const folders = useMemo(() => {
    if (!favoritesRelation) {
      return null;
    }

    return [...new Set(favoritesRelation.map(fav => {
      return fav.folder;
    }))];
  }, [favoritesRelation]);

  return (
    <FavoritesContext.Provider
      value={{ handleSetFavoritesRelation, folders, favoritesRelation }}
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