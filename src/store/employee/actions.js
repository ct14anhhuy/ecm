import * as types from "./types";
import { employeeService } from "services/employeeService";

const initState = () => {
  return {
    type: types.INIT_STATE,
  };
};

const searchByName = (name) => {
  return async (dispatch) => {
    try {
      const employees = await employeeService.searchByName(name);
      dispatch({
        type: types.SEARCH_BY_NAME,
        payload: {
          employees,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export { initState, searchByName };
