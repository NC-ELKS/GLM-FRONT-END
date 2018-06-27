import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ReadScreen = props => {
  const messages = props.navigation.state.params.messages;
  return (
    <View style={styles.message}>
      <Text>Read message here:</Text>
      <View>
        {messages.map(message => (
          <Text key={message.messageid}>{message.content}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ReadScreen;
