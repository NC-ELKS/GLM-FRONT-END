import React from "react";
import { Image, Dimensions, TouchableOpacity } from "react-native";

import * as api from "../api";
import {
  Text,
  Container,
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
      <Container
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "whitesmoke"
        }}
      >
        <Image
          style={{ marginTop: "20%" }}
          source={require("../data/footprints(4).png")}
        />
        <Content />
        <Footer>
          <FooterTab>
            <Button>
              <Icon
                style={{ color: "rgb(137, 87, 188)" }}
                onPress={() =>
                  navigate("Read", { messages: this.state.messages })
                }
                type="MaterialIcons"
                name="markunread"
                accessibilityLabel="Read your messages"
              />
              <Text>Read</Text>
            </Button>
            <Button>
              <Icon
                style={{ color: "rgb(137, 87, 188)" }}
                onPress={() =>
                  navigate("Post", {
                    user: this.state.user
                  })
                }
                name="pencil"
                type="Entypo"
                accessibilityLabel="Post a message"
              />
              <Text>Post</Text>
            </Button>
            <Button>
              <Icon
                style={{ color: "rgb(137, 87, 188)" }}
                onPress={() =>
                  navigate("Map", {
                    messages: this.state.messages
                  })
                }
                name="map-marker"
                type="FontAwesome"
                accessibilityLabel="Go to the map"
              />
              <Text>Map</Text>
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

export default HomeScreen;
