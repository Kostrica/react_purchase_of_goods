import { USER_DATA_TYPES } from '../actions/actionTypes';

const initialState = {
  userName: '',
  userPhone: '',
};

export const userDataReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_DATA_TYPES.SET_USER_NAME:
      return {
        ...state,
        userName: payload,
      };

    case USER_DATA_TYPES.SET_USER_PHONE:
      return {
        ...state,
        userPhone: payload,
      };

    default:
      return state;
  }
};
