import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

import * as api from "../api";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from "native-base";

const LATITUDE_DELTA = 0.00043;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

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
      <Container style={{ flex: 1 }}>
        <Content />
        <Footer>
          <FooterTab>
            <Button>
              <Icon
                style={{ color: "purple" }}
                onPress={() =>
                  navigate("Read", { messages: this.state.messages })
                }
                type="MaterialIcons"
                name="markunread"
                accessibilityLabel="Read your messages"
              />
            </Button>
            <Button>
              <Icon
                style={{ color: "purple" }}
                onPress={() =>
                  navigate("Post", {
                    user: this.state.user
                  })
                }
                name="pencil"
                type="Entypo"
                accessibilityLabel="Post a message"
              />
            </Button>
            <Button>
              <Icon
                style={{ color: "purple" }}
                onPress={() =>
                  navigate("Map", {
                    messages: this.state.messages
                  })
                }
                name="map-marker"
                type="FontAwesome"
                accessibilityLabel="Go to the map"
              />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  componentDidMount = async () => {
    console.log("mounting");
    try {
      const user = await api.getUser("KKDavidson");
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
      const { user } = await api.getUser("KKDavidson");

      this.setState({
        user
      });
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({
  homeContainer: { backgroundColor: "whitesmoke" },
  bottomNav: {
    width: "100%",
    height: 100,
    backgroundColor: "rgb(137, 87, 188)",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    bottom: 0
  },
  image: {
    height: "100%",
    width: "180%"
  }
});

export default HomeScreen;
