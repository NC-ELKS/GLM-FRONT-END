import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import SpeechBubble from "react-native-speech-bubble";
import dayjs from "dayjs";
import { Camera, Permissions, Expo } from "expo";
import * as api from "../api";
import { Badge } from "react-native-elements";

class ReadScreen extends Component {
  state = {
    messagesInRadius: [],
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  watchID = 0;
  //new
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  //new
  componentDidMount = async () => {
    console.log("ReadScreen mounting");

    this.watchID = navigator.geolocation.getCurrentPosition(position => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      const messages = this.props.navigation.state.params.messages;

      const measureDistance = (lat1, lon1, lat2, lon2) => {
        let R = 6378.137;
        let dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
        let dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
        let a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        return d * 1000;
      };

      const messagesInRadius = messages.filter(message => {
        return (
          measureDistance(lat, long, message.latitude, message.longitude) <= 25
        );
      });

      this.setState({ messagesInRadius });
    });
  };

  componentWillUnmount() {
    this.setState({ messagesInRadius: [] });
  }

  render() {
    const { messagesInRadius } = this.state;
    const { hasCameraPermission } = this.state;

    if (this.state.messagesInRadius.length === 0)
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image source={require("../data/footprints(5).png")} />
        </View>
      );

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      try {
        api.confirmRead(
          messagesInRadius[0].recipient,
          messagesInRadius[0].messageid
        );
      } catch (err) {
        console.log(err);
      }

      return (
        <Camera
          style={{ flex: 1, flexDirection: "column" }}
          type={this.state.type}
        >
          <View style={styles.sentenceContainer}>
            <Badge containerStyle={{ opacity: 0.5 }}>
              <View style={styles.bubbleContainer}>
                <SpeechBubble
                  speechBubbleActiveOpacity={0.5}
                  speeches={[this.state.messagesInRadius[0].content]}
                  hideIcons={true}
                />
              </View>
              <Text style={{ color: "white" }}>
                {this.state.messagesInRadius[0].msgPoster} -{" "}
                {dayjs(this.state.messagesInRadius[0].timestamp).format(
                  "D MMM YYYY ( h:m a )"
                )}
              </Text>
            </Badge>
          </View>

          <Text />
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center"
              }}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                });
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                Flip
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      );
    }
  }
}

const styles = StyleSheet.create({
  senderContainer: {
    alignItems: "flex-start",
    marginLeft: "10%",
    paddingBottom: "60%",
    backgroundColor: "red"
  },

  sender: {
    fontSize: 25,
    backgroundColor: "red"
  }
});

export default ReadScreen;
