import React from "react";
import Amplify, { Auth } from "aws-amplify";
import configAWS from "../configAWS";
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

class LoginScreen extends React.Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: configAWS.cognito.REGION,
        userPoolId: configAWS.cognito.USER_POOL_ID,
        identityPoolId: configAWS.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: configAWS.cognito.APP_CLIENT_ID
      }
    });
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.postContainer}
        behavior="padding"
        keyboardShouldPersistTaps={"never"}
      >
        <View style={styles.dropdownContainer} />
        <View style={styles.textInputContainer}>
          <Icon
            size={50}
            color="whitesmoke"
            name="plus"
            type="evilicon"
            onPress={this.handleSubmit}
          />
          <TextInput
            maxLength={140}
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholder="EMAIL"
          />
          <TextInput
            maxLength={140}
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder="PASSWORD"
          />
        </View>
        <Image style={styles.image} source={require("../data/elk.png")} />
      </KeyboardAvoidingView>
    );
  }

  handleSubmit = async event => {
    event.preventDefault();

    try {
      await Auth.signIn(this.state.email, this.state.password);
      const { navigate } = this.props.navigation;
      navigate("Home");
    } catch (e) {
      alert("Details incorrect - please try again");
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

export default LoginScreen;
