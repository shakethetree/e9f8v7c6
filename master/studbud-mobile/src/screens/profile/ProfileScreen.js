import React, { Component } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { Header } from "react-native-elements";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../auth/actions";

class ProfileScreen extends Component {
  static navigationOptions = {
    tabBarButtonComponent: TouchableOpacity,
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="md-person" size={30} color={tintColor} />
    )
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          /*rightComponent={{
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateMeetup')}>
          <MaterialIcons name="add-circle" size={25} style={{
            //fontSize: 30,
            //padding:1
            color: Colors.$whiteColor}} />
        </TouchableOpacity>, style: {paddingTop: 2} }}*/
          rightComponent={{
            icon: "add-circle",
            type: "material",
            color: Colors.$whiteColor,
            onPress: () => this.props.logout(),
            style: {
              paddingTop: 10,
              fontSize: 23
            }
          }}
          outerContainerStyles={{
            height: Platform.OS === "ios" ? 70 : 70 - 22,
            backgroundColor: Colors.$darkBlue,
            paddingTop: 3
          }}
        />

        <Text>Profile</Text>
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  logout: PropTypes.func.isRequired,
  loguser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loguser: state.loguser
});

export default connect(
  mapStateToProps,
  { logout }
)(ProfileScreen);
