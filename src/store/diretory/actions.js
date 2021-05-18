import { directoryService } from "services/directoryService";
import * as types from "./types";

const getDirectoriesAction = () => {
  return async (dispatch) => {
    try {
      const directories = await directoryService.getDirectories();
      dispatch({
        type: types.GET_DIRECTORIES,
        payload: {
          directories,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export { getDirectoriesAction };
