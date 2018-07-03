import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, Permissions, Expo } from "expo";
import SpeechBubble from 'react-native-speech-bubble';
import dayjs from 'dayjs';
// import ExpoTHREE, {THREE} from 'expo-three';
// import ExpoGraphics from 'expo-graphics'

export default class CameraExample extends React.Component {
  state = {
    messagesInRadius: [{
      "content": "Yo man\n",
      "recipient": "Seth20",
      "read": false,
      "messageid": "3a5efb9c-70ce-4bc0-af04-07bdc5ba1134",
      "msgPoster": "KKDavidson",
      "longitude": -2.239760072768463,
      "timestamp": 1530290891206,
      "latitude": 53.48588570018217
    }],
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          {/* <View style={styles.messageContainer}>
            <View style={styles.senderContainer}>
            </View>
            
            <View style={styles.dateContainer}>
             
            </View>
          </View> */}
          <Camera style={{ flex: 1 }} type={this.state.type}>
          <View style={styles.sentenceContainer}>
          <Text style={styles.sender}>{this.state.messagesInRadius[0].msgPoster}</Text>

              <Text style={styles.sentence}>left a message for you</Text>
            </View>
            <View style={styles.bubbleContainer}>
              <SpeechBubble
                speeches={[this.state.messagesInRadius[0].content]}
                hideIcons={true}
              />
            </View>
             <Text>
                {dayjs(this.state.messagesInRadius[0].timestamp).format(
                  "D MMM YYYY - h:m a"
                )}
              </Text>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  },
  senderContainer: {
    alignItems: 'flex-start',
    marginLeft: '10%',
  },
  sentenceContainer: {
    alignItems: 'flex-start',
    marginLeft: '10%'
  },
  dateContainer: {
    alignItems: 'flex-end',
    marginRight: '10%'
  },
  sender: {
    fontSize: 25
  }
});
