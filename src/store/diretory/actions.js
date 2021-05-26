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

const createDirectoryAction = (directory) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.BEGIN_UPDATE,
      });
      const result = await directoryService.createDirectory(directory);
      dispatch({
        type: types.UPDATE_SUCCESS,
        payload: {
          directory: result,
        },
      });
    } catch (error) {
      dispatch({
        type: types.UPDATE_FAILURE,
      });
    }
  };
};

export { getDirectoriesAction, createDirectoryAction };
