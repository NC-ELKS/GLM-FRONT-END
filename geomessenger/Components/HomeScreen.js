import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import * as api from "../api";

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  state = {
    messages: [],
    user: {},
    initialPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    },
    currentPosition: {
      latitude: 0,
      longitude: 0
    }
  };
  watchID = 0;

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Image style={styles.image} source={require("../data/elk.png")} />
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
            onPress={() =>
              navigate("Post", {
                user: this.state.user
                // currentPosition: this.state.currentPosition
              })
            }
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
            onPress={() =>
              navigate("Map", {
                messages: this.state.messages,
                initialPosition: this.state.initialPosition,
                currentPosition: this.state.currentPosition
              })
            }
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
    navigator.geolocation.getCurrentPosition(
      (position, {}) => {
        let lat = parseFloat(position.coords.latitude);
        let long = parseFloat(position.coords.longitude);

        let initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.setState({ initialPosition: initialRegion });
        this.setState({ currentPosition: initialRegion });
      },
      error => console.log(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.watchID = navigator.geolocation.watchPosition(position => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      let lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.092,
        longitudeDelta: 0
      };
      this.setState({ initialPosition: lastRegion });
      this.setState({ currentPosition: lastRegion });
    });
    try {
      const user = await api.getUser("Seth20");
      const { Items } = await api.fetchMessages("Seth20");
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
      const { user } = await api.getUser("Seth20");

      this.setState({
        user
      });
    } catch (err) {
      console.log(err);
    }
  };
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

export default HomeScreen;
