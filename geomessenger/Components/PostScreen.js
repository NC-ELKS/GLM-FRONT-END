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
    language: "English"
  };

  render() {
    console.log(this.state);
    const friends = this.props.navigation.state.params.user.Items[0].friends;
    return (
      <KeyboardAvoidingView style={styles.postContainer} behavior="padding">
        <ModalDropdown
          onSelect={(idx, recipient) => {
            this.setState({ recipient });
          }}
          options={friends.map(friend => friend)}
        />
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

  submitMessage = async () => {
    try {
      const data = await api.postMessage(
        this.state.message,
        this.state.recipient,
        "KKDavidson",
        -2.238917,
        53.486495
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
  dropdown: {
    height: 50,
    width: 100
  },
  postContainer: {
    justifyContent: "space-between"
  },
  recipientContainer: {
    height: "45%",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "purple"
    // flexDirection: "row"
  },
  center: {
    height: "10%",
    backgroundColor: "violet"
  },
  messageContainer: {
    height: "45%",
    alignItems: "center",
    backgroundColor: "gray",
    justifyContent: "center"
  },
  h1: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  textInput: {
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
