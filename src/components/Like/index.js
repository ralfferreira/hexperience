import React, {useCallback, useMemo, useRef, useState} from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import like from '../../assets/lottie/like.json';

const Like = ({onPress, isFavorite, ...rest}) => {
  const progress = useRef(new Animated.Value(isFavorite ? 1 : 0)).current;
  const [hasLiked, setHasLiked] = useState(isFavorite);

  const handleLikeAnimation = useCallback(() => {
    const newValue = hasLiked ? 0 : 1;

    Animated.timing(progress, {
      toValue: newValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setHasLiked(!hasLiked);
  }, [hasLiked]);

  return (
      <TouchableOpacity onPress={() => { 
        handleLikeAnimation()
        onPress()
      }}>
        <LottieView progress={progress} style={styles.heart} source={like} />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heart: {
    width: 40,
    height: 40,
  },
})

export default Like;