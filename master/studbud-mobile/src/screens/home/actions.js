import { GroupApi } from '../../../constants/api';

const groupApi = new GroupApi();

// create constant for type name
export const FETCH_MY_GROUPS = 'FETCH_MY_GROUPS';

// creates an action called fetchMyGroups
// takes no arguments and returns an object
export const fetchMyGroups = () => ({
  type: FETCH_MY_GROUPS,
  payload: groupApi.fetchAllGroups(),
});
