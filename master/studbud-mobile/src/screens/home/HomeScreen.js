import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import { Card, ListItem } from "react-native-elements";
import {
  Ionicons,
  Entypo,
  FontAwesome,
  MaterialIcons
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { Button, Icon } from "native-base";
import { Header } from "react-native-elements";
import PropTypes from "prop-types";
import { logout } from "../auth/actions";
import { setGroup } from "../createGroup/actions";

import { LoadingScreen } from "../../commons";
import { MyMeetupsList } from "./components";
import { MyGroupsList } from "./components";

import { fetchMyGroups } from "./actions";
import styles from "./styles/HomeScreen";
import Colors from "../../../constants/Colors";

class HomeScreen extends Component {
  static navigationOptions = {
    tabBarButtonComponent: TouchableOpacity,
    title: "Home",
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome name="home" size={30} color={tintColor} />
    )
  };

  // fetch our groups
  componentWillMount() {
    // Fetch all groups this user has joined
    this.props.fetchMyGroups(this.props.loguser.user.id);
  }

  _groupClicked(group) {
    console.log("Group id", group._id);
    const groupID = group._id;
    this.props.setGroup(groupID);
    //console.log(this.props.currentGroup);
    this.props.navigation.navigate("CreateMeetup", { curgroup: group._id });
  }

  render() {
    //console.log(this.props);
    const {
      myGroups: { isFetched, data, error }
    } = this.props;
    if (!isFetched) {
      return <LoadingScreen />;
    } else if (error.on) {
      return (
        <View>
          <Text>{error.message}</Text>
        </View>
      );
    }
    console.log("current group", this.props.currentGroup);
    return (
      <View style={styles.root}>
        <Header
          centerComponent={{
            text: "MY GROUPS",
            style: { color: Colors.$darkBlue }
          }}
          rightComponent={{
            icon: "add-circle",
            type: "material",
            color: Colors.$whiteColor,
            onPress: () => this.props.navigation.navigate("CreateGroup"),
            style: {
              paddingTop: 10,
              fontSize: 23
            }
          }}
          outerContainerStyles={{
            height: Platform.OS === "ios" ? 70 : 70 - 22,
            backgroundColor: Colors.$mediumBlue,
            paddingTop: 3
          }}
        />

        <View style={styles.topContainer}>
          <View style={styles.root}>
            <View style={styles.contentContainer}>
              <ScrollView vertical>
                {data
                  .map((group, i) => (
                    <TouchableWithoutFeedback
                      key={i}
                      onPress={() => this._groupClicked(group)}
                    >
                      <View key={i}>
                        <Card title={group.name} style={styles.groupCard}>
                          <View>
                            <View style={styles.loc}>
                              <Image
                                source={require("../../../assets/images/locationpin.png")}
                                style={{
                                  width: 10,
                                  height: 10,
                                  marginBottom: 0
                                }}
                              />
                              <Text style={{ fontSize: 12 }}>
                                {group.location}
                              </Text>
                            </View>
                            <Text>
                              {"\n"}
                              {group.description}
                            </Text>
                          </View>
                        </Card>
                      </View>
                    </TouchableWithoutFeedback>
                  ))
                  .reverse()}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//

HomeScreen.propTypes = {
  myGroups: PropTypes.object.isRequired,
  fetchMyGroups: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loguser: PropTypes.object.isRequired,
  currentGroup: PropTypes.string,
  setGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  myGroups: state.home.myGroups,
  loguser: state.loguser,
  currentGroup: state.createGroup.currentGroup
});

export default connect(
  mapStateToProps,
  { logout, fetchMyGroups, setGroup }
)(HomeScreen);
