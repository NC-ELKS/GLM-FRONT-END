import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const Home = ({ history }) => {
  return (
    <View>
      <Icon
        style={styles.navIcon}
        name="map"
        type="entypo"
        color="whitesmoke"
        accessibilityLabel="Open a map displaying your messages by location"
      />
      <Icon
        style={styles.navIcon}
        onPress={() => history.push("/Read")}
        type="material-icons"
        name="markunread"
        color="whitesmoke"
        accessibilityLabel="Read your messages"
      />
      <Icon
        style={styles.navIcon}
        onPress={() => history.push("/Post")}
        name="pencil"
        type="entypo"
        color="whitesmoke"
        accessibilityLabel="Post a message"
      />
    </View>
  );
};

export default Home;
