import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Nav from "./Components/Nav";
import Read from "./Components/Read";
import Post from "./Components/Post";
import Friends from "./Components/Friends";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Nav />
        <Friends />
        {/* <Read />
        <Post /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
