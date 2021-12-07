import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';

import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

import { ExperienceImage } from './styles'
import { scrollInterpolator, animatedStyles } from '../../utils/animations';

import DefaultImg from '../../assets/img/DinoGreenColor.png'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export default class ExperienceCarousel extends Component {
  
  state = {
    index: 0,
    data: [] 
  }

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this)
    this.state.data = this.props.photos
  }

  _renderItem({ item }) {
    return (      
      <View style={styles.itemContainer}>
        <ExperienceImage 
          resizeMode="center" 
          source={
            item
            ? { uri: item }
            : DefaultImg
          } 
        />
      </View>
    );
  }
  
  render() {
    return (
      <View>
        <Carousel
          ref={(c) => this.carousel = c}
          data={this.state.data}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({ index })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}          
        />
        {/* <Text style={styles.counter}
        >
          {this.state.index}
        </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 10
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
});
