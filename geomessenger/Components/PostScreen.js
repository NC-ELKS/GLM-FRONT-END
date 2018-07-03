import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { Icon } from "react-native-elements";
import * as api from "../api";
import ModalDropdown from "react-native-modal-dropdown";

class PostScreen extends React.Component {
  state = {
    message: "",
    recipient: "",
    currentPosition: {
      latitude: 0,
      longitude: 0
    }
  };

  watchID = 0;

  render() {
    const friends = this.props.navigation.state.params.user.Items[0].friends;
    return (
      <KeyboardAvoidingView
        style={styles.postContainer}
        behavior="padding"
        keyboardShouldPersistTaps={"never"}
      >
        <View style={styles.dropdownContainer}>
          <ModalDropdown
            dropdownStyle={{ borderRadius: 10 }}
            dropdownTextStyle={{ fontSize: 15 }}
            showsVerticalScrollIndicator={true}
            style={{
              borderRadius: 10,
              margin: "5%",
              padding: "1%",
              backgroundColor: "white",
              height: "25%",
              marginBottom: 30
            }}
            textStyle={{ fontSize: 15, fontFamily: "Times New Roman" }}
            animated={true}
            defaultValue={"Choose your friend..."}
            onSelect={(idx, recipient) => {
              this.setState({ recipient });
            }}
            options={friends.map(friend => friend)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            multiline={true}
            maxLength={140}
            style={styles.textInput}
            onChangeText={message => this.setState({ message })}
            value={this.state.message}
            placeholder="Leave a message..."
          />
          <Icon
            size={50}
            color="whitesmoke"
            name="plus"
            type="evilicon"
            onPress={this.submitMessage}
          />
        </View>
        <Image style={styles.image} source={require("../data/elk.png")} />
      </KeyboardAvoidingView>
    );
  }
  componentDidMount = async () => {
    console.log("post mounting");

    this.watchID = navigator.geolocation.getCurrentPosition(position => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      let newPosition = {
        latitude: lat,
        longitude: long
      };
      this.setState({ currentPosition: newPosition });
    });
    try {
      const user = await api.getUser("KKDavidson");
      const { Items } = await api.fetchMessages("Seth20");
      this.setState({ messages: Items, user });
    } catch (err) {
      console.log(err);
    }
  };
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  submitMessage = async () => {
    const latitude = this.state.currentPosition.latitude;
    const longitude = this.state.currentPosition.longitude;
    try {
      const data = await api.postMessage(
        this.state.message,
        this.state.recipient,
        "KKDavidson",
        latitude,
        longitude
      );
      this.setState({
        message: "",
        recipient: ""
      });
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({
  image: {
    height: "20%",
    width: "30%",
    marginRight: "auto",
    marginLeft: "auto"
  },
  postContainer: {
    flex: 1,
    backgroundColor: "rgb(137, 87, 188)"
  },
  textInputContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  dropdownContainer: {
    marginBottom: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  textInput: {
    color: "purple",
    backgroundColor: "whitesmoke",
    padding: "2%",
    width: "80%",
    height: 100,
    fontSize: 20,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10
  }
});

export default PostScreen;
