import * as types from "./types";
import { employeeService } from "services/employeeService";

const searchByNameAction = name => {
  return async dispatch => {
    try {
      const employees = await employeeService.searchByName(name);
      dispatch({
        type: types.SEARCH_BY_NAME,
        payload: {
          employees
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getByDepartmentAction = depId => {
  return async dispatch => {
    try {
      const employees = await employeeService.getByDepartment(depId);
      dispatch({
        type: types.GET_BY_DEPARTMENT,
        payload: {
          employees
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getFileSharedAction = fileId => {
  return async dispatch => {
    try {
      const fileShared = await employeeService.getFileShared(fileId);
      dispatch({
        type: types.GET_FILE_SHARED,
        payload: {
          fileShared
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export { searchByNameAction, getByDepartmentAction, getFileSharedAction };
