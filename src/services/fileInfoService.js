import { api } from "utils/api";
import { store } from "store/configureStore";

const getMyContents = async page => {
  const { pageSize } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(`/FileInfo/GetFileInfos?page=${page}&pageSize=${pageSize}`)
    .then(response => {
      return response;
    });
};

const getImportantContents = async page => {
  const { pageSize } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(`/FileInfo/GetImportantFiles?page=${page}&pageSize=${pageSize}`)
    .then(response => {
      return response;
    });
};

const getFavoriteContents = async page => {
  const { pageSize } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(`/FileInfo/GetFavoriteFiles?page=${page}&pageSize=${pageSize}`)
    .then(response => {
      return response;
    });
};

const getSharedContents = async page => {
  const { pageSize } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(`/FileInfo/GetSharedFiles?page=${page}&pageSize=${pageSize}`)
    .then(response => {
      return response;
    });
};

const getDepartmentContents = async page => {
  const { pageSize } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(`/FileInfo/GetDepartmentFiles?page=${page}&pageSize=${pageSize}`)
    .then(response => {
      return response;
    });
};

const getTrashContents = async page => {
  const { pageSize } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(`/FileInfo/GetTrashContents?page=${page}&pageSize=${pageSize}`)
    .then(response => {
      return response;
    });
};

const getContentsFromPath = async (dirId, page) => {
  const { pageSize } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(
      `/FileInfo/GetFileInfosByDirId?dirId=${dirId}&page=${page}&pageSize=${pageSize}`
    )
    .then(response => {
      return response;
    });
};

const searchContents = async (searchStr, page) => {
  const { pageSize } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(
      `/FileInfo/Search?searchContent=${searchStr}&page=${page}&pageSize=${pageSize}`
    )
    .then(response => {
      return response;
    });
};

const changeFavorite = async (fileId, employeeId) => {
  const fileFavorite = {
    fileId,
    employeeId
  };
  return await api
    .post("/FileFavorite/AddOrRemoveFavoriteFile", fileFavorite)
    .then(response => {
      return response;
    });
};

const changeImportant = async (fileId, employeeId) => {
  const fileImportant = {
    fileId,
    employeeId
  };
  return await api
    .post("/FileImportant/AddOrRemoveImportantFile", fileImportant)
    .then(response => {
      return response;
    });
};

const addFiles = async fileInfos => {
  return await api
    .post("/FileInfo/AddFiles", fileInfos, {
      headers: { "Content-type": "multipart/form-data" }
    })
    .then(response => {
      return response;
    });
};

const moveToTrash = async fileIds => {
  return await api.post("/Trash/AddFilesToTrash", fileIds).then(response => {
    return response;
  });
};

const recoverFile = async fileIds => {
  return await api.post("/Trash/RecoverFile", fileIds).then(response => {
    return response;
  });
};

const deleteFile = async fileIds => {
  return await api.post("/Trash/CleanTrash", fileIds).then(response => {
    return response;
  });
};

const editFile = async fileInfo => {
  return await api.post("/FileInfo/EditFileInfo", fileInfo).then(response => {
    return response;
  });
};

export const fileInfoService = {
  getMyContents,
  getImportantContents,
  getFavoriteContents,
  getSharedContents,
  getDepartmentContents,
  getTrashContents,
  getContentsFromPath,
  searchContents,
  changeFavorite,
  changeImportant,
  addFiles,
  moveToTrash,
  recoverFile,
  deleteFile,
  editFile
};
