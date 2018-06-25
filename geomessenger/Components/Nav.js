import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

class Nav extends Component {
  render() {
    return (
      <View style={styles.bottomView}>
        <View style={styles.navBar}>
          <Button
            onPress={this.onPressLearnMore}
            title="MAP"
            color="whitesmoke"
            accessibilityLabel="Learn more about this button"
          />
          <Button
            style={{ borderLeftColor: "white", borderLeftWidth: 2 }}
            onPress={this.onPressLearnMore}
            title="READ"
            color="whitesmoke"
            accessibilityLabel="Learn more about this button"
          />
          <Button
            onPress={this.onPressLearnMore}
            title="POST"
            color="whitesmoke"
            accessibilityLabel="Learn more about this button"
          />
        </View>
      </View>
    );
  }

  onPressLearnMore = () => {
    return "";
  };
}

const styles = StyleSheet.create({
  bottomView: {
    width: "100%",
    height: 50,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    bottom: 0
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default Nav;
