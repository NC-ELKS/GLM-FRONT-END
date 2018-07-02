import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FriendsScreen from './Components/FriendsScreen';
import ReadScreen from './Components/ReadScreen';
import PostScreen from './Components/PostScreen';
import MapScreen from './Components/MapScreen';
import HomeScreen from './Components/HomeScreen';
import LoginScreen from './Components/LoginScreen';

const NavigationApp = createStackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Friends: { screen: FriendsScreen },
  Read: { screen: ReadScreen },
  Post: { screen: PostScreen },
  Map: { screen: MapScreen }
});

export default class App extends React.Component {
  render() {
    return <NavigationApp />;
  }
}
