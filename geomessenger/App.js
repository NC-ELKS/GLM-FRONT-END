import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigator } from "react-navigation";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text onPress={() => navigate("Friends")}>Navigate to Friendsssss</Text>
      </View>
    );
  }
}

class FriendsScreen extends React.Component {
  static navigationOptions = {
    title: "Friends"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text onPress={() => navigate("Home")}>Navigate to Home</Text>
      </View>
    );
  }
}

const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen },
  Friends: { screen: FriendsScreen }
});

export default class App extends React.Component {
  render() {
    return <NavigationApp />;
  }
}

const styles = StyleSheet.create({
  container: {}
});
