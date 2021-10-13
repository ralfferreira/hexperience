import React from 'react'
import { SearchBar } from 'react-native-elements';
import { Container } from './styles'

export default class App extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <Container>
        <SearchBar
          placeholder="Digite aqui..."
          onChangeText={this.updateSearch}
          value={search}
          containerStyle={{
            backgroundColor: '#E4E4E4',
            borderWidth:  1,
            borderColor: '#E4E4E4',
            borderRightColor: '#E4E4E4',
            borderBottomColor: '#E4E4E4',
            borderTopColor: '#E4E4E4',
            borderRadius: 40}}
          inputContainerStyle={{
            backgroundColor: '#E4E4E4'}}
          searchIcon={{ 
            size: 24,
            color: '#000' }}
          platform="default"
        />
      </Container>
    );
  }
}