import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Icon } from "react-native-elements";
import * as api from "../api";
import ModalDropdown from "react-native-modal-dropdown";

class PostScreen extends React.Component {
  state = {
    message: "",
    recipient: "",
    currentPosition: {
      latitude: 0,
      longitude: 0
    }
  };

  watchID = 0;

  render() {
    const friends = this.props.navigation.state.params.user.Items[0].friends;
    return (
      <KeyboardAvoidingView style={styles.postContainer} behavior="padding">
        <View style={styles.dropdownContainer}>
          <ModalDropdown
            dropdownTextStyle={{ fontSize: 15, fontFamily: "Times New Roman" }}
            dropdownTextHighlightStyle={{
              color: "white",
              backgroundColor: "purple"
            }}
            showsVerticalScrollIndicator={true}
            style={{ padding: "1%", backgroundColor: "lightblue" }}
            textStyle={{ fontSize: 15, fontFamily: "Times New Roman" }}
            animated={true}
            defaultValue={"Choose your friend..."}
            onSelect={(idx, recipient) => {
              this.setState({ recipient });
            }}
            options={friends.map(friend => friend)}
          />
        </View>

        <View style={styles.recipientContainer} />
        <View style={styles.center} />
        <View style={styles.messageContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={message => this.setState({ message })}
            value={this.state.message}
            placeholder="Leave a message..."
          />
          <Icon
            size={50}
            style={styles.friendIcon}
            name="plus"
            type="evilicon"
            onPress={this.submitMessage}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
  componentDidMount = async () => {
    console.log("post mounting");

    this.watchID = navigator.geolocation.getCurrentPosition(position => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      let newPosition = {
        latitude: lat,
        longitude: long
      };
      this.setState({ currentPosition: newPosition });
    });
    try {
      const user = await api.getUser("KKDavidson");
      const { Items } = await api.fetchMessages("Seth20");
      this.setState({ messages: Items, user });
    } catch (err) {
      console.log(err);
    }
  };
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  submitMessage = async () => {
    const latitude = this.state.currentPosition.latitude;
    const longitude = this.state.currentPosition.longitude;
    try {
      const data = await api.postMessage(
        this.state.message,
        this.state.recipient,
        "KKDavidson",
        latitude,
        longitude
      );
      this.setState({
        message: "",
        recipient: ""
      });
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({
  postContainer: {
    justifyContent: "space-between"
  },
  recipientContainer: {
    height: "45%",
    backgroundColor: "purple"
  },
  center: {
    height: "10%",
    backgroundColor: "violet"
  },
  messageContainer: {
    height: "45%",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center"
  },
  h1: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textInput: {
    color: "white",
    backgroundColor: "purple",
    padding: "5%",
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: "2%"
  },
  friendIcon: {}
});

export default PostScreen;
