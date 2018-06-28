import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { Icon } from "react-native-elements";
import * as api from "../api";

class FriendsScreen extends React.Component {
  static navigationOptions = {
    title: "Friends"
  };
  state = {
    text: "",
    friends: []
  };
  render() {
    const friends = this.props.navigation.state.params.user.Items[0].friends;
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.friendsContainer}>
        <View style={styles.top}>
          <Text h1>Friends</Text>
          <View style={styles.listContainer}>
            {friends.map((friend, i) => <Text key={i}>{friend}</Text>)}
          </View>
        </View>
        <View style={styles.middle} />
        <View style={styles.bottom}>
          <TextInput
            style={styles.friendInput}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            placeholder="Add Friend"
          />
          <Icon
            size={50}
            style={styles.friendIcon}
            name="plus"
            type="evilicon"
            onPress={this.onPressLearnMore}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  // componentDidMount() {
  //   this.getUser();
  // }

  // getUser = async () => {
  //   try {
  //     const { friends } = await api.getUser("LFreeman1");
  //     this.setState({
  //       friends
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
}

const styles = StyleSheet.create({
  friendsContainer: {
    flex: 1
  },
  friendInput: {
    height: "10%",
    padding: "5%",
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: "2%"
  },
  listContainer: {
    borderWidth: 1,
    borderRadius: 10,
    height: "70%",
    width: "80%",
    marginTop: "3%"
  },
  top: {
    flex: 1,
    height: "60%",
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center"
  },
  middle: {
    height: "10%",
    backgroundColor: "pink"
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
    backgroundColor: "lightblue"
  }
});

export default FriendsScreen;
