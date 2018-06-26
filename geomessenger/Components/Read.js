import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Read = () => {
  return (
    <View style={styles.message}>
      <Text>Read message here</Text>
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

export default Read;
