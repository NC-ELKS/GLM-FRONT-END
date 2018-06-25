import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
// import {
//   responsiveHeight,
//   responsiveWidth,
//   responsiveFontSize
// } from "react-native-responsive-dimensions";

class Post extends React.Component {
  state = {
    text: "Message Recipient",
    message: "Enter your message here..."
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.postContainer} behavior="padding">
        <View style={styles.recipientContainer}>
          <Text h1 style={styles.h1}>
            New Message
          </Text>
          <Text style={styles.messageTo}>To:</Text>

          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <Button title="+" onPress={this.onPressLearnMore} />
        </View>
        <View style={styles.messageContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={message => this.setState({ message })}
            value={this.state.message}
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  h1: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  textInput: {
    padding: "5%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10
  }
});

export default Post;
