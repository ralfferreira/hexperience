import React from 'react'
import StarRating from 'react-native-star-rating';
import { Component } from 'react';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: props.rating,
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
        disabled={this.props.disabled}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rate) => this.onStarRatingPress(rate)}
        fullStarColor={'gold'}
        starSize={20}
      />
    );
  }
}

export default Rating;