import { USER_DATA_TYPES } from "./actionTypes";

export const setUserName = data => ({
  type: USER_DATA_TYPES.SET_USER_NAME,
  payload: data,
});

export const setUserPhone = data => ({
  type: USER_DATA_TYPES.SET_USER_PHONE,
  payload: data,
});
