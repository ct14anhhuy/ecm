import * as types from "./types";
import { fileInfoService } from "services/fileInfoService";

const getMyContentsAction = page => {
  return async dispatch => {
    try {
      const obj = await fileInfoService.getMyContents(page);
      dispatch({
        type: types.GET_MY_CONTENTS,
        payload: {
          pagedSet: obj.pagedSet,
          fileInfos: injectSelected(obj.pagedSet.items)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getImportantContentsAction = page => {
  return async dispatch => {
    try {
      const obj = await fileInfoService.getImportantContents(page);
      dispatch({
        type: types.GET_IMPORTANT_CONTENTS,
        payload: {
          pagedSet: obj.pagedSet,
          fileInfos: injectSelected(obj.pagedSet.items)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getFavoriteContentsAction = page => {
  return async dispatch => {
    try {
      const obj = await fileInfoService.getFavoriteContents(page);
      dispatch({
        type: types.GET_FAVORITE_CONTENTS,
        payload: {
          pagedSet: obj.pagedSet,
          fileInfos: injectSelected(obj.pagedSet.items)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getSharedContentsAction = page => {
  return async dispatch => {
    try {
      const obj = await fileInfoService.getSharedContents(page);
      dispatch({
        type: types.GET_SHARED_CONTENTS,
        payload: {
          pagedSet: obj.pagedSet,
          fileInfos: injectSelected(obj.pagedSet.items)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getDepartmentContentsAction = page => {
  return async dispatch => {
    try {
      const obj = await fileInfoService.getDepartmentContents(page);
      dispatch({
        type: types.GET_DEPARTMENT_CONTENTS,
        payload: {
          pagedSet: obj.pagedSet,
          fileInfos: injectSelected(obj.pagedSet.items)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getTrashContentsAction = page => {
  return async dispatch => {
    try {
      const obj = await fileInfoService.getTrashContents(page);
      dispatch({
        type: types.GET_TRASH_CONTENTS,
        payload: {
          pagedSet: obj.pagedSet,
          fileInfos: injectSelected(obj.pagedSet.items)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getContentsFromPathAction = (dirId, page) => {
  return async dispatch => {
    try {
      const obj = await fileInfoService.getContentsFromPath(dirId, page);
      dispatch({
        type: types.GET_CONTENTS_FROM_PATH,
        payload: {
          pagedSet: obj.pagedSet,
          fileInfos: injectSelected(obj.pagedSet.items)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const searchContentsAction = (searchStr, page) => {
  return async dispatch => {
    try {
      if (!searchStr || searchStr.trim().length < 1) return;
      const obj = await fileInfoService.searchContents(searchStr, page);
      dispatch({
        type: types.SEARCH_CONTENTS,
        payload: {
          pagedSet: obj.pagedSet,
          fileInfos: injectSelected(obj.pagedSet.items)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const changeFavoriteAction = (id, employeeId) => {
  return async dispatch => {
    try {
      await fileInfoService.changeFavorite(id, employeeId);
      dispatch({
        type: types.CHANGE_FAVORITE,
        payload: {
          id
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const changeImportantAction = (id, employeeId) => {
  return async dispatch => {
    try {
      await fileInfoService.changeImportant(id, employeeId);
      dispatch({
        type: types.CHANGE_IMPORTANT,
        payload: {
          id
        }
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
      checked
    }
  };
};

const selectMultiAction = (fileIds, checked) => {
  return {
    type: types.SELECT_MULTI,
    payload: {
      fileIds,
      checked
    }
  };
};

const addFilesAction = fileInfos => {
  return async dispatch => {
    try {
      dispatch({
        type: types.BEGIN_UPDATE_FILE
      });
      await fileInfoService.addFiles(fileInfos);
      dispatch({
        type: types.UPDATE_FILE_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: types.UPDATE_FILE_FAILURE,
        payload: {
          error: error.data.message
        }
      });
    }
  };
};

const moveToTrashAction = fileIds => {
  return async dispatch => {
    try {
      await fileInfoService.moveToTrash(fileIds);
      dispatch({
        type: types.MOVE_TO_TRASH,
        payload: {
          fileIds
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const recoverFileAction = fileIds => {
  return async dispatch => {
    try {
      await fileInfoService.recoverFile(fileIds);
      dispatch({
        type: types.RECOVER_FILE,
        payload: {
          fileIds
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteFileAction = fileIds => {
  return async dispatch => {
    try {
      await fileInfoService.deleteFile(fileIds);
      dispatch({
        type: types.DELETE_FILE,
        payload: {
          fileIds
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const editFileAction = fileInfo => {
  return async dispatch => {
    try {
      dispatch({
        type: types.BEGIN_UPDATE_FILE
      });
      await fileInfoService.editFile(fileInfo);
      dispatch({
        type: types.EDIT_FILE,
        payload: {
          fileInfo
        }
      });
      dispatch({
        type: types.UPDATE_FILE_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: types.UPDATE_FILE_FAILURE,
        payload: {
          error: error.data.message
        }
      });
    }
  };
};

const updatePageSizeAction = pageSize => {
  return {
    type: types.UPDATE_PAGE_SIZE,
    payload: {
      pageSize
    }
  };
};

const injectSelected = fileInfos => {
  return fileInfos.map(fi => Object.assign({}, fi, { checked: false }));
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
  updatePageSizeAction
};
