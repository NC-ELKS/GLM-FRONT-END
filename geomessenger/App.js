import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createStackNavigator } from "react-navigation";
import FriendsScreen from "./Components/FriendsScreen";
import ReadScreen from "./Components/ReadScreen";
import PostScreen from "./Components/PostScreen";
import MapScreen from "./Components/MapScreen";
import { Icon } from "react-native-elements";
import * as api from "./api";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  state = {
    messages: [],
    user: {}
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Image style={styles.image} source={require("./data/elk.png")} />
        <View style={styles.bottomNav}>
          <Icon
            style={styles.navIcon}
            onPress={() => navigate("Read", { messages: this.state.messages })}
            type="material-icons"
            name="markunread"
            color="whitesmoke"
            accessibilityLabel="Read your messages"
          />
          <Icon
            style={styles.navIcon}
            onPress={() => navigate("Post", { user: this.state.user })}
            name="pencil"
            type="entypo"
            color="whitesmoke"
            accessibilityLabel="Post a message"
          />
          <Icon
            style={styles.navIcon}
            onPress={() => navigate("Friends", { user: this.state.user })}
            name="users"
            type="font-awesome"
            color="whitesmoke"
            accessibilityLabel="See your friends"
          />
          <Icon
            style={styles.navIcon}
            onPress={() => navigate("Map", { messages: this.state.messages })}
            name="map-marker"
            type="font-awesome"
            color="whitesmoke"
            accessibilityLabel="Go to the map"
          />
        </View>
      </View>
    );
  }

  componentDidMount = async () => {
    console.log("mounting");
    try {
      const user = await api.getUser("LFreeman1");
      const { Items } = await api.fetchMessages("LFreeman1");
      this.setState({ messages: Items, user });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidUpdate = async prevProps => {
    if (prevProps !== this.props) {
      try {
        const { messages } = await api.fetchMessages();
        this.setState({ messages });
      } catch (err) {
        console.log(err);
      }
    }
  };

  getUser = async () => {
    try {
      const { user } = await api.getUser("LFreeman1");

      this.setState({
        user
      });
    } catch (err) {
      console.log(err);
    }
  };
}

const NavigationApp = createStackNavigator({
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
