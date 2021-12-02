import React, {useRef, useState} from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import like from '../../assets/lottie/like.json';

const Like = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const [hasLiked, setHasLiked] = useState(false);

  const handleLikeAnimation = () => {
    const newValue = hasLiked ? 0 : 1;

    Animated.timing(progress, {
      toValue: newValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setHasLiked(!hasLiked);
  };

  return (
      <TouchableOpacity onPress={handleLikeAnimation}>
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