import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import Nav from "./Nav";
import { Icon } from "react-native-elements";
class Friends extends React.Component {
  state = {
    text: ""
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.friendsContainer}>
        <View style={styles.top}>
          <Text h1>Friends</Text>
          <View style={styles.listContainer} />
        </View>
        <View style={styles.middle} />
        <View style={styles.bottom}>
          <TextInput
            style={styles.friendInput}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            placeholder="Add Friend"
          />
          <Icon
            size={50}
            style={styles.friendIcon}
            name="plus"
            type="evilicon"
            onPress={this.onPressLearnMore}
          />
        </View>
        <Nav />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  friendsContainer: {
    flex: 1
  },
  friendInput: {
    height: "10%",
    padding: "5%",
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: "2%"
  },
  listContainer: {
    borderWidth: 1,
    borderRadius: 10,
    height: "70%",
    width: "80%",
    marginTop: "3%"
  },
  top: {
    flex: 1,
    height: "60%",
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center"
  },
  middle: {
    height: "10%",
    backgroundColor: "pink"
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    backgroundColor: "lightblue"
  }
});
export default Friends;
