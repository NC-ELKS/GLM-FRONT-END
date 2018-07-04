import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import * as api from "../api";
import {
  Text,
  Button,
  Label,
  Input,
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
  Body,
  Title,
  InputGroup
} from "native-base";

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
      <Container>
        <Header>
          <Body style={{ alignItems: "center" }}>
            <Title>Post</Title>
          </Body>
        </Header>
        <Content>
          <Item picker />
          <Picker
            mode="dropdown"
            style={{ width: undefined }}
            placeholder="Select friend"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.recipient}
            onValueChange={value => {
              this.setState({
                recipient: value
              });
            }}
          >
            {friends.map((friend, i) => {
              return <Picker.Item label={friend} value={friend} key={i} />;
            })}
          </Picker>

          <Item floatingLabel>
            <Label>Enter your message here!</Label>
            <Input
              onChangeText={message =>
                this.setState({
                  message
                })
              }
              value={this.state.message}
            />
          </Item>

          <Container>
            <Button
              block
              style={{ backgroundColor: "rgb(137, 87, 188)" }}
              onPress={this.submitMessage}
            >
              <Text>Send!</Text>
            </Button>
          </Container>
        </Content>
      </Container>
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
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  submitMessage = async () => {
    console.log("HERE");
    console.log(this.state.recipient, "***");
    console.log(this.state.message, "MESSAGE");

    const latitude = this.state.currentPosition.latitude;
    const longitude = this.state.currentPosition.longitude;
    try {
      await api.postMessage(
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
      alert(err);
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
