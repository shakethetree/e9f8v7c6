import { Font } from "expo";
import React from "react";
import { Provider } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import jwt_decode from "jwt-decode";
import setAuthToken from "./constants/setAuthToken";
import setCurrentUser from "./src/screens/auth/actions";
import { AsyncStorage } from "react-native";

import Root from "./src/Root";

import Colors from "./constants/Colors";
//import { HomeScreen } from './src/screens';
import { cachedFonts } from "./helpers";
import store from "./src/redux/store";

EStyleSheet.build(Colors);

// Check for token
/*if (AsyncStorage.getItem("jwtToken")) {
  // Set auth token header auth
  const token = AsyncStorage.getItem("jwtToken");
  //console.log(token);
  setAuthToken(AsyncStorage.getItem("jwtToken"));
  // decode token and get user info
  const decoded = jwt_decode(token);
  console.log(decoded);
  store.dispatch({ type: SET_CURRENT_USER, payload: decoded });
}*/

export default class App extends React.Component {
  /*state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });

  }*/

  render() {
    //return <Root />;
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
