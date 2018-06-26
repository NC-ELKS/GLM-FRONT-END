import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
// native-elements work! yay

class Nav extends Component {
  state = {
    printText: false
  };
  render() {
    return (
      <View style={styles.bottomNav}>
        {/* somehow get these icons spaced... */}
        <Icon
          style={styles.navIcon}
          onPress={this.onPressLearnMore}
          name="map"
          type="entypo"
          color="whitesmoke"
          accessibilityLabel="Open a map displaying your messages by location"
        />
        <Icon
          style={styles.navIcon}
          onPress={this.onPressLearnMore}
          type="material-icons"
          name="markunread"
          color="whitesmoke"
          accessibilityLabel="Read your messages"
        />
        <Icon
          style={styles.navIcon}
          onPress={this.onPressLearnMore}
          name="pencil"
          type="entypo"
          color="whitesmoke"
          accessibilityLabel="Post a message"
        />
      </View>
    );
  }

  onPressLearnMore = () => {
    return "";
  };
}

const styles = StyleSheet.create({
  bottomNav: {
    width: "100%",
    height: 50,
    backgroundColor: "purple",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    bottom: 0
  }
});

export default Nav;
