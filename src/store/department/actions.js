import * as types from "./types";
import { departmentService } from "services/departmentService";

const getDepartments = () => {
  return async (dispatch) => {
    try {
      const departments = await departmentService.getDepartments();
      dispatch({
        type: types.GET_DEPARTMENTS,
        payload: {
          departments,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export { getDepartments };
