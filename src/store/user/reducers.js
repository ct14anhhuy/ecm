import * as types from "./types";

const userReducers = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.payload.user;
    case types.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userReducers;
