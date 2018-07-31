import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ListView,
  Platform,
  ScrollView,
  ImageBackground
} from "react-native";
import { Header } from "react-native-elements";

import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import styles from "./styles/ProfileScreen";
var _ = require("lodash/core");

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../auth/actions";
import { LoadingScreen } from "../../commons";
import { getUserProfile, clearCurrentProfile } from "./actions";

class ProfileScreen extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  static navigationOptions = {
    tabBarButtonComponent: TouchableOpacity,
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="md-person" size={30} color={tintColor} />
    )
  };

  _logoutClicked() {
    //console.log("Group id", group._id);
    this.props.clearCurrentProfile();
    this.props.logout();
  }

  render() {
    const { user } = this.props.loguser;
    const { profile, loading } = this.props.profile;

    let profilecontent;

    if (profile === null || loading) {
      return <LoadingScreen />;
    }

    if (profile === undefined || _.isEmpty(profile)) {
      return (
        <View>
          <Text>profile undefined</Text>
        </View>
      );
    } else {
      console.log(profile.user.avatar);
      return (
        <View
          style={{
            flex: 1
            //display: "flex"
            //height: 300
          }}
        >
          <Header
            centerComponent={{
              text: "MY PROFILE",
              style: { color: Colors.$whiteColor, fontSize: 15 }
            }}
            rightComponent={{
              icon: "edit",
              type: "feather",
              color: Colors.$whiteColor,
              onPress: () => this._logoutClicked(),
              style: {
                paddingTop: 10,
                fontSize: 23,
                bottom: 0
              }
            }}
            outerContainerStyles={{
              height: Platform.OS === "ios" ? 70 : 70 - 22,
              //backgroundColor: Colors.$mediumBlue,
              backgroundColor: Colors.$darkBlue,
              paddingTop: 3
            }}
          />
          <ScrollView style={styles.scroll}>
            <View style={styles.container}>
              <Card containerStyle={styles.cardContainer}>
                <View style={styles.headerContainer}>
                  <ImageBackground
                    style={styles.headerBackgroundImage}
                    blurRadius={10}
                    source={{
                      uri: avatarBackground
                    }}
                  >
                    <View style={styles.headerColumn}>
                      <Image
                        style={styles.userImage}
                        source={{
                          uri: avatar
                        }}
                      />
                      <Text style={styles.userNameText}>{name}</Text>
                      <View style={styles.userAddressRow}>
                        <View>
                          <Icon
                            name="place"
                            underlayColor="transparent"
                            iconStyle={styles.placeIcon}
                          />
                        </View>
                        <View style={styles.userCityRow}>
                          <Text style={styles.userCityText}>
                            {profile.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </Card>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

ProfileScreen.propTypes = {
  logout: PropTypes.func.isRequired,
  loguser: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loguser: state.loguser,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getUserProfile, logout }
)(ProfileScreen);
