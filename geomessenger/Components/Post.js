import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

class Post extends React.Component {
  state = {
    text: "Message Recipient"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text h1 style={styles.h1}>
          New Message
        </Text>
        <View style={styles.recipientContainer}>
          <Text style={styles.messageTo}>To:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <View>
          <TextInput style={styles.messageInput} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    top: 40,
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "pink"
  },
  textInput: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    width: 320,
    borderRadius: 10,
    padding: 5
  },
  recipientContainer: {
    top: 70,
    marginRight: 10,
    marginLeft: 10,
    padding: 5,
    flexWrap: "wrap",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row"
  },
  messageTo: {
    marginTop: 10,
    marginRight: 5
  }
});

export default Post;
