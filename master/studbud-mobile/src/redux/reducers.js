import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

import {
  HomeReducer,
  CreateMeetupReducer,
  CreateGroupReducer,
  SignupReducer
} from "../screens";

import { UserReducer } from "../screens";

import navigation from "../routes/navigationReducer";

export default combineReducers({
  home: HomeReducer,
  createMeetup: CreateMeetupReducer,
  createGroup: CreateGroupReducer,
  navigation,
  loguser: UserReducer,
  auth: SignupReducer,
  form
});
