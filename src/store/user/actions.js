import * as types from "./types";
import { userService } from "services/userService";

const login = () => {
  return async (dispatch) => {
    try {
      const user = await userService.login();
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { user },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const logout = () => {
  return {
    type: types.LOGOUT,
  };
};

export { login, logout };
