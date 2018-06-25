import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Nav from "./Components/Nav";
import Read from "./Components/Read";
import Post from "./Components/Post";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>APP GOES HERE</Text>
        <Nav /> */}
        {/* <Read /> */}
        <Post />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
