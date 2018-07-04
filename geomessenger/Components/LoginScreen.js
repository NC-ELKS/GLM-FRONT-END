import React from "react";
import Amplify, { Auth } from "aws-amplify";
import configAWS from "../configAWS";
import { StyleSheet, Image } from "react-native";
import {
  Body,
  Title,
  Text,
  Button,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label
} from "native-base";

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
      <Container style={{ backgroundColor: "whitesmoke" }}>
        <Content>
          <Form style={{ paddingBottom: "10%" }}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                keyboardType="email-address"
                onChangeText={email =>
                  this.setState({
                    email
                  })
                }
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={password =>
                  this.setState({
                    password
                  })
                }
                value={this.state.password}
              />
            </Item>
          </Form>

          <Container
            style={{
              paddingRight: "10%",
              paddingLeft: "10%",
              alignItems: "center"
            }}
          >
            <Button
              block
              style={{ backgroundColor: "rgb(137, 87, 188)" }}
              onPress={this.handleSubmit}
            >
              <Text>Login</Text>
            </Button>
            <Text />
            <Text />
            <Text />
            <Image source={require("../data/footprints(1).png")} />
          </Container>
        </Content>
      </Container>
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

export default LoginScreen;
