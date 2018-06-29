import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import moment from "moment";
import SpeechBubble from "react-native-speech-bubble";

class ReadScreen extends Component {
  state = {
    messagesInRadius: []
  };

  watchID = 0;

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

    if (this.state.messagesInRadius.length === 0)
      return <Text>Move closer to see your message!</Text>;
    return (
      <View style={styles.messageContainer}>
        <View style={styles.senderContainer}>
          <Text style={styles.sender}>{messagesInRadius[0].msgPoster}</Text>
        </View>
        <View style={styles.sentenceContainer}>
          <Text style={styles.sentence}>left a message for you</Text>
        </View>
        <View style={styles.bubbleContainer}>
          <SpeechBubble
            speeches={[messagesInRadius[0].content]}
            hideIcons={true}
          />
        </View>
        <View style={styles.dateContainer}>
          {" "}
          <Text>
            {moment(messagesInRadius[0].timestamp).format(
              "MMMM Do YYYY, h:mm a"
            )}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "whitesmoke"
  },
  senderContainer: {
    alignItems: "flex-start",
    marginLeft: "10%"
  },
  sentenceContainer: {
    alignItems: "flex-start",
    marginLeft: "10%"
  },
  dateContainer: {
    alignItems: "flex-end",
    marginRight: "10%"
  },
  sender: {
    fontSize: 25
  }
});

export default ReadScreen;
