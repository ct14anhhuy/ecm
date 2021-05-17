import * as types from "./types";
import { employeeService } from "services/employeeService";

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

const getByDepartment = (depId) => {
  return async (dispatch) => {
    try {
      const employees = await employeeService.getByDepartment(depId);
      dispatch({
        type: types.GET_BY_DEPARTMENT,
        payload: {
          employees,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export { searchByName, getByDepartment };
