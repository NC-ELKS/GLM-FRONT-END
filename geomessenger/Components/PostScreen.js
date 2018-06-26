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

class PostScreen extends React.Component {
  state = {
    text: "",
    message: ""
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.postContainer} behavior="padding">
        <View style={styles.recipientContainer}>
          {/* <Text h1 style={styles.h1}>
            New Message
          </Text> */}

          {/* change this to an icon and try and use flex to get it in the input */}
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            placeholder="To: "
          />
          <Icon
            size={50}
            style={styles.friendIcon}
            name="plus"
            type="evilicon"
            onPress={this.onPressLearnMore}
          />
        </View>
        <View style={styles.center} />
        <View style={styles.messageContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={message => this.setState({ message })}
            value={this.state.message}
            placeholder="Leave a message..."
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
  onPressLearnMore = () => {
    return "";
  };
}

const styles = StyleSheet.create({
  postContainer: {
    justifyContent: "space-between"
  },
  recipientContainer: {
    height: "45%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "purple",
    flexDirection: "row"
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
