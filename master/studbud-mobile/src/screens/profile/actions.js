import { ProfileApi } from "../../../constants/api";

const profileApi = new ProfileApi();

// create constant for type name
export const GET_PROFILE = "GET_PROFILE";
export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND";
export const CLEAR_CURRENT_PROFILE = "CLEAR_CURRENT_PROFILE";
export const GET_PROFILES = "FETCH_MY_GROUPS";

export const getUserProfile = () => async dispatch => {
  dispatch({ type: PROFILE_LOADING });

  const profile = await profileApi.getUserProfile().then(res => {
    return res;
  });

  dispatch({
    type: GET_PROFILE,
    payload: profile
  });
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
