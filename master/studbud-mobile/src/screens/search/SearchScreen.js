import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

class SearchScreen extends Component {
  static navigationOptions = {
    tabBarButtonComponent: TouchableOpacity,
    tabBarIcon: ({ tintColor }) => (
         <Feather name="search" size={30} color={ tintColor } />
       ),
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        <Text>Search</Text>
      </View>
    );
  }
}

export default SearchScreen;
