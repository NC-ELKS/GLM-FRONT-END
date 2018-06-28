import React from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import MapView, { AnimatedRegion } from "react-native-maps";

export default class MapScreen extends React.Component {
  render() {
    const messages = this.props.navigation.state.params.messages;
    const initialPosition = this.props.navigation.state.params.initialPosition;
    console.log(this.props.navigation.state.params.initialPosition);
    const currentPosition = this.props.navigation.state.params.currentPosition;
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={initialPosition}>
          <MapView.Marker coordinate={currentPosition}>
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
          </MapView.Marker>

          {messages.map((message, i) => {
            const messageCoord = {
              latitude: message.latitude,
              longitude: message.longitude
            };

            return (
              <MapView.Marker key={i} coordinate={messageCoord}>
                <Animated.View style={styles.messageAnimation}>
                  <Animated.View style={styles.ring} />
                  <View style={styles.messageMarker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
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
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 122, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 20 / 2,
    overflow: "hidden",
    backgroundColor: "#007AFF"
  },
  messageMarker: {
    height: 8,
    width: 8,
    backgroundColor: "rgba(130,4,150, 0.3)",
    borderRadius: 4
  },

  messageAnimation: {
    alignItems: "center",
    justifyContent: "center"
  },

  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  }
});
