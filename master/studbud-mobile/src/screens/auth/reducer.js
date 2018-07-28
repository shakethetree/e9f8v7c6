import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, SET_CURRENT_USER } from "./actions";
import { isEmpty } from "../../../constants/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload.name.length > 0,
        user: action.payload
      };
    default:
      return state;
  }
}
