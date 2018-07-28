import { GroupApi } from '../../../constants/api';
import { fetchMyGroups } from '../home/actions';

const groupApi = new GroupApi();

export const CREATE_GROUP = 'CREATE_GROUP';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_ERROR = 'CREATE_GROUP_ERROR';

export const createGroup = args => async dispatch => {
  dispatch({ type: CREATE_GROUP });
  try {
    await groupApi.createGroup(args);
    dispatch({ type: CREATE_GROUP_SUCCESS });
  } catch (e) {
    return dispatch({ type: CREATE_GROUP_ERROR });
  }
  return await dispatch(fetchMyGroups());
};
