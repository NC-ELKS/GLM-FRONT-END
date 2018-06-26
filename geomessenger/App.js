import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createStackNavigator } from "react-navigation";
import FriendsScreen from "./Components/FriendsScreen";
import ReadScreen from "./Components/ReadScreen";
import PostScreen from "./Components/PostScreen";
import { Icon } from "react-native-elements";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Image style={styles.image} source={require("./data/elk.png")} />
        <View style={styles.bottomNav}>
          <Icon
            style={styles.navIcon}
            onPress={() => navigate("Read")}
            type="material-icons"
            name="markunread"
            color="whitesmoke"
            accessibilityLabel="Read your messages"
          />
          <Icon
            style={styles.navIcon}
            onPress={() => navigate("Post")}
            name="pencil"
            type="entypo"
            color="whitesmoke"
            accessibilityLabel="Post a message"
          />
          <Icon
            style={styles.navIcon}
            onPress={() => navigate("Friends")}
            name="users"
            type="font-awesome"
            color="whitesmoke"
            accessibilityLabel="See your friends"
          />
        </View>
      </View>
    );
  }
}

const NavigationApp = createStackNavigator({
  Home: { screen: HomeScreen },
  Friends: { screen: FriendsScreen },
  Read: { screen: ReadScreen },
  Post: { screen: PostScreen }
});

export default class App extends React.Component {
  render() {
    return <NavigationApp />;
  }
}

const styles = StyleSheet.create({
  bottomNav: {
    width: "100%",
    height: 50,
    backgroundColor: "purple",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    bottom: 0
  },
  image: {
    height: "100%"
  }
});
