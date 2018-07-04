import React from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import MapView, { AnimatedRegion } from "react-native-maps";

export default class MapScreen extends React.Component {
  state = {
    initialPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0043,
      longitudeDelta: 0.0034
    },
    currentPosition: { latitude: 0, longitude: 0 }
  };

  watchID = 0;

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  componentDidMount = async () => {
    console.log("mounting");
    navigator.geolocation.getCurrentPosition(
      (position, {}) => {
        let lat = parseFloat(position.coords.latitude);
        let long = parseFloat(position.coords.longitude);

        let initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034
        };
        this.setState({
          initialPosition: initialRegion,
          currentPosition: initialRegion
        });
      },

      error => console.log(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.watchID = navigator.geolocation.watchPosition(position => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      let lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.092,
        longitudeDelta: 0
      };
      this.setState({
        initialPosition: lastRegion,
        currentPosition: lastRegion
      });
    });
  };

  render() {
    const messages = this.props.navigation.state.params.messages;
    const initialPosition = this.state.initialPosition;
    const currentPosition = this.state.currentPosition;
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
            if (message.readstatus) {
              return (
                <MapView.Marker key={i} coordinate={messageCoord}>
                  <Animated.View style={styles.messageAnimation}>
                    <Animated.View style={styles.readRing} />
                    <View style={styles.readMessageMarker} />
                  </Animated.View>
                </MapView.Marker>
              );
            } else {
              return (
                <MapView.Marker key={i} coordinate={messageCoord}>
                  <Animated.View style={styles.messageAnimation}>
                    <Animated.View style={styles.unreadRing} />
                    <View style={styles.unreadMessageMarker} />
                  </Animated.View>
                </MapView.Marker>
              );
            }
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
  unreadMessageMarker: {
    height: 8,
    width: 8,
    backgroundColor: "rgba(130,4,150, 0.3)",
    borderRadius: 4
  },

  readMessageMarker: {
    height: 7,
    width: 7,
    backgroundColor: "rgba(255, 128, 0, 0.3)",
    borderRadius: 4
  },

  messageAnimation: {
    alignItems: "center",
    justifyContent: "center"
  },

  unreadRing: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  },

  readRing: {
    width: 16,
    height: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 128, 0, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255, 128, 0, 0.5)"
  }
});
