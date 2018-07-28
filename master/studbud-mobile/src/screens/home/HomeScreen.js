import React, { Component } from "react";
import { Font } from "expo";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
import {
  Ionicons,
  Entypo,
  FontAwesome,
  MaterialIcons
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { Button, Icon } from "native-base";
import { Header } from "react-native-elements";

import { LoadingScreen } from "../../commons";
import { MyMeetupsList } from "./components";
import { MyGroupsList } from "./components";

// import { MeetupApi } from '../../../constants/api';
import { fetchMyGroups } from "./actions";
import styles from "./styles/HomeScreen";
import Colors from "../../../constants/Colors";

// const meetupApi = new MeetupApi();

@connect(
  state => ({
    myGroups: state.home.myGroups
  }),
  { fetchMyGroups }
)
export default class HomeScreen extends Component {
  static navigationOptions = {
    tabBarButtonComponent: TouchableOpacity,
    title: "Home",
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome
        name="home"
        size={30}
        color={
          tintColor
        } /*style={{borderBottomWidth: 2,
         borderBottomColor: tintColor }}*/
      />
    )
  };

  // fetch our meetups
  componentDidMount() {
    this.props.fetchMyGroups();
  }

  render() {
    console.log(this.props);
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
          <MyGroupsList groups={data} navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

//export default HomeScreen;
