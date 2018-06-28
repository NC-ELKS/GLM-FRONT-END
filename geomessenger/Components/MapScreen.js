import React from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import MapView, { AnimatedRegion } from "react-native-maps";

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

export default class App extends React.Component {
  state = {
    initialPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    },
    currentPosition: {
      latitude: 0,
      longitude: 0
    }
  };
  watchID = 0;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position, {}) => {
        let lat = parseFloat(position.coords.latitude);
        let long = parseFloat(position.coords.longitude);

        let initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };

        this.setState({ initialPosition: initialRegion });
        this.setState({ currentPosition: initialRegion });
      },
      error => alert(JSON.stringify(error)),
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
      this.setState({ initialPosition: lastRegion });
      this.setState({ currentPosition: lastRegion });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    const messages = this.props.navigation.state.params.messages;
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={this.state.initialPosition}>
          <MapView.Marker coordinate={this.state.currentPosition}>
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
