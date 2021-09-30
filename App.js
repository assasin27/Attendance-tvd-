import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import SummaryScreen from './screens/SummaryScreen';

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

var AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  SummaryScreen: SummaryScreen,
});

const AppContainer = createAppContainer(AppNavigator);
