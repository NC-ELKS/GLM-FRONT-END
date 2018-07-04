import React from "react";
import { StyleSheet } from "react-native";
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
          <Form>
            <Item picker />
            <Picker
              mode="dropdown"
              style={{ width: undefined }}
              placeholder="Select friend"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.recipient}
              onValueChange={recipient => {
                this.setState({ recipient });
              }}
            >
              {friends.map((friend, i) => {
                return <Picker.Item label={friend} value={friend} key={i} />;
              })}
            </Picker>
          </Form>
          <Item floatingLabel>
            <Label>Enter your message here!</Label>
            <InputGroup borderType="regular">
              <Input
                onChangeText={message => this.setState({ message })}
                value={this.state.message}
              />
            </InputGroup>
          </Item>
          <Button
            block
            style={{ backgroundColor: "rgb(137, 87, 188)" }}
            onPress={this.submitMessage}
          >
            <Text>Send!</Text>
          </Button>
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
