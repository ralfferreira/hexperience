import React from 'react'
import StarRating from 'react-native-star-rating';
import { Component } from 'react';

class Rating extends Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 5
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    return (
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'gold'}
        starSize={20}
      />
    );
  }
}

export default Rating;