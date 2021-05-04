import * as types from "./types";

const loginRequest = (token) => {
  return {
    type: types.LOGIN_REQUEST,
    payload: {
      token,
    },
  };
};

const loginSuccess = (employee) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: employee,
  };
};

const logout = () => {
  return {
    type: types.LOGOUT,
  };
};

export { loginRequest, loginSuccess, logout };
