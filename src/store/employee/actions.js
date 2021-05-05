import * as types from "./types";
import { employeeService } from "../../services/employeeService";

const login = () => {
  return async (dispatch) => {
    try {
      const employee = await employeeService.login();
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { employee },
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
