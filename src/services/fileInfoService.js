import { api } from "utils/api";
import { store } from "store/configureStore";

const getMyContents = async page => {
  const { pageSize, filterExtension } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(
      `/FileInfo/GetFileInfos?filterExtension=${filterExtension}&page=${page}&pageSize=${pageSize}`
    )
    .then(response => response);
};

const getImportantContents = async page => {
  const { pageSize, filterExtension } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(
      `/FileInfo/GetImportantFiles?filterExtension=${filterExtension}&page=${page}&pageSize=${pageSize}`
    )
    .then(response => response);
};

const getFavoriteContents = async page => {
  const { pageSize, filterExtension } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(
      `/FileInfo/GetFavoriteFiles?filterExtension=${filterExtension}&page=${page}&pageSize=${pageSize}`
    )
    .then(response => response);
};

const getSharedContents = async page => {
  const { pageSize, filterExtension } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(
      `/FileInfo/GetSharedFiles?filterExtension=${filterExtension}&page=${page}&pageSize=${pageSize}`
    )
    .then(response => response);
};

const getDepartmentContents = async page => {
  const { pageSize, filterExtension } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(
      `/FileInfo/GetDepartmentFiles?filterExtension=${filterExtension}&page=${page}&pageSize=${pageSize}`
    )
    .then(response => response);
};

const getTrashContents = async page => {
  const { pageSize, filterExtension } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(
      `/FileInfo/GetTrashContents?filterExtension=${filterExtension}&page=${page}&pageSize=${pageSize}`
    )
    .then(response => response);
};

const getContentsFromPath = async (dirId, page) => {
  const { pageSize, filterExtension } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(
      `/FileInfo/GetFileInfosByDirId?dirId=${dirId}&filterExtension=${filterExtension}&page=${page}&pageSize=${pageSize}`
    )
    .then(response => response);
};

const searchContents = async (searchStr, page) => {
  const { pageSize, filterExtension } = store.getState().fileInfoReducers.paginationSet;
  return await api
    .get(
      `/FileInfo/Search?searchContent=${searchStr}&filterExtension=${filterExtension}&page=${page}&pageSize=${pageSize}`
    )
    .then(response => response);
};

const changeFavorite = async (fileId, employeeId) => {
  const fileFavorite = {
    fileId,
    employeeId
  };
  return await api
    .post("/FileFavorite/AddOrRemoveFavoriteFile", fileFavorite)
    .then(response => response);
};

const changeImportant = async (fileId, employeeId) => {
  const fileImportant = {
    fileId,
    employeeId
  };
  return await api
    .post("/FileImportant/AddOrRemoveImportantFile", fileImportant)
    .then(response => response);
};

const addFiles = async fileInfos => {
  return await api
    .post("/FileInfo/AddFiles", fileInfos, {
      headers: { "Content-type": "multipart/form-data" }
    })
    .then(response => response);
};

const moveToTrash = async fileIds => {
  return await api.post("/Trash/AddFilesToTrash", fileIds).then(response => response);
};

const recoverFile = async fileIds => {
  return await api.post("/Trash/RecoverFile", fileIds).then(response => response);
};

const deleteFile = async fileIds => {
  return await api.post("/Trash/CleanTrash", fileIds).then(response => response);
};

const editFile = async fileInfo => {
  return await api.post("/FileInfo/EditFileInfo", fileInfo).then(response => response);
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
