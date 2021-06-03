import * as types from "./types";
import { fileInfoService } from "services/fileInfoService";

const getMyContentsAction = () => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getMyContents();
      dispatch({
        type: types.GET_MY_CONTENTS,
        payload: {
          fileInfos: injectSelected(obj.fileInfos),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getImportantContentsAction = () => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getImportantContents();
      dispatch({
        type: types.GET_IMPORTANT_CONTENTS,
        payload: {
          fileInfos: injectSelected(obj.fileInfos),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getFavoriteContentsAction = () => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getFavoriteContents();
      dispatch({
        type: types.GET_FAVORITE_CONTENTS,
        payload: {
          fileInfos: injectSelected(obj.fileInfos),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getSharedContentsAction = () => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getSharedContents();
      dispatch({
        type: types.GET_SHARED_CONTENTS,
        payload: {
          fileInfos: injectSelected(obj.fileInfos),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getDepartmentContentsAction = () => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getDepartmentContents();
      dispatch({
        type: types.GET_DEPARTMENT_CONTENTS,
        payload: {
          fileInfos: injectSelected(obj.fileInfos),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getTrashContentsAction = () => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getTrashContents();
      dispatch({
        type: types.GET_TRASH_CONTENTS,
        payload: {
          fileInfos: injectSelected(obj.fileInfos),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getContentsFromPathAction = (dirId) => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getContentsFromPath(dirId);
      dispatch({
        type: types.GET_CONTENTS_FROM_PATH,
        payload: {
          fileInfos: injectSelected(obj.fileInfos),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const searchContentsAction = (searchStr) => {
  return async (dispatch) => {
    try {
      if (!searchStr || searchStr.trim().length < 1) return;
      const obj = await fileInfoService.searchContents(searchStr);
      dispatch({
        type: types.SEARCH_CONTENTS,
        payload: {
          fileInfos: injectSelected(obj.fileInfos),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const changeFavoriteAction = (id, employeeId) => {
  return async (dispatch) => {
    try {
      await fileInfoService.changeFavorite(id, employeeId);
      dispatch({
        type: types.CHANGE_FAVORITE,
        payload: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const changeImportantAction = (id, employeeId) => {
  return async (dispatch) => {
    try {
      await fileInfoService.changeImportant(id, employeeId);
      dispatch({
        type: types.CHANGE_IMPORTANT,
        payload: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const changeCheckedAction = (id, checked) => {
  return {
    type: types.CHANGE_CHECKED,
    payload: {
      id,
      checked,
    },
  };
};

const selectMultiAction = (fileIds, checked) => {
  return {
    type: types.SELECT_MULTI,
    payload: {
      fileIds,
      checked,
    },
  };
};

const addFilesAction = (fileInfos) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.BEGIN_UPDATE_FILE,
      });
      await fileInfoService.addFiles(fileInfos);
      dispatch({
        type: types.UPDATE_FILE_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.UPDATE_FILE_FAILURE,
      });
    }
  };
};

const moveToTrashAction = (fileIds) => {
  return async (dispatch) => {
    try {
      await fileInfoService.moveToTrash(fileIds);
      dispatch({
        type: types.MOVE_TO_TRASH,
        payload: {
          fileIds,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const recoverFileAction = (fileIds) => {
  return async (dispatch) => {
    try {
      await fileInfoService.recoverFile(fileIds);
      dispatch({
        type: types.RECOVER_FILE,
        payload: {
          fileIds,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteFileAction = (fileIds) => {
  return async (dispatch) => {
    try {
      await fileInfoService.deleteFile(fileIds);
      dispatch({
        type: types.DELETE_FILE,
        payload: {
          fileIds,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const editFileAction = (fileInfo) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: types.BEGIN_UPDATE_FILE,
      });
      await fileInfoService.editFile(fileInfo);
      dispatch({
        type: types.EDIT_FILE,
        payload: {
          fileInfo,
        },
      });
      dispatch({
        type: types.UPDATE_FILE_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.UPDATE_FILE_FAILURE,
      });
    }
  };
};

const injectSelected = (fileInfos) => {
  return fileInfos.map((fi) => Object.assign({}, fi, { checked: false }));
};

export {
  getMyContentsAction,
  getImportantContentsAction,
  getFavoriteContentsAction,
  getSharedContentsAction,
  getDepartmentContentsAction,
  getTrashContentsAction,
  getContentsFromPathAction,
  searchContentsAction,
  changeFavoriteAction,
  changeImportantAction,
  changeCheckedAction,
  selectMultiAction,
  addFilesAction,
  moveToTrashAction,
  recoverFileAction,
  deleteFileAction,
  editFileAction,
};
