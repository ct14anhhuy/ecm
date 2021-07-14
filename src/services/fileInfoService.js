import { api } from "utils/api";

const getMyContents = async () => {
  return await api.get("/FileInfo/GetFileInfos").then(response => {
    return response;
  });
};

const getImportantContents = async () => {
  return await api.get("/FileInfo/GetImportantFiles").then(response => {
    return response;
  });
};

const getFavoriteContents = async () => {
  return await api.get("/FileInfo/GetFavoriteFiles").then(response => {
    return response;
  });
};

const getSharedContents = async () => {
  return await api.get("/FileInfo/GetSharedFiles").then(response => {
    return response;
  });
};

const getDepartmentContents = async () => {
  return await api.get("/FileInfo/GetDepartmentFiles").then(response => {
    return response;
  });
};

const getTrashContents = async () => {
  return await api.get("/FileInfo/GetTrashContents").then(response => {
    return response;
  });
};

const getContentsFromPath = async dirId => {
  return await api
    .get("/FileInfo/GetFileInfosByDirId?dirId=" + dirId)
    .then(response => {
      return response;
    });
};

const searchContents = async searchStr => {
  return await api
    .get("/FileInfo/Search?searchContent=" + searchStr)
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
