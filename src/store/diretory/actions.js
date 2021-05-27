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
        type: types.BEGIN_UPDATE_DIRECTORY,
      });
      const result = await directoryService.createDirectory(directory);
      dispatch({
        type: types.UPDATE_DIRECTORY_SUCCESS,
        payload: {
          directory: result,
        },
      });
    } catch (error) {
      dispatch({
        type: types.UPDATE_DIRECTORY_FAILURE,
      });
    }
  };
};

const deleteDirectoryAction = (id) => {
  return async (dispatch) => {
    try {
      await directoryService.deleteDirectory(id);
      dispatch({
        type: types.DELETE_DIRECTORY,
        payload: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export { getDirectoriesAction, createDirectoryAction, deleteDirectoryAction };
