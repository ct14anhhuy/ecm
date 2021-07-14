import { api } from "utils/api";

const getDirectories = async () => {
  return await api.get("/Directory/GetTreeDirectory").then(response => {
    return response;
  });
};

const createDirectory = async directory => {
  return await api
    .post("/Directory/CreateDirectory", directory)
    .then(response => {
      return response;
    });
};

const deleteDirectory = async id => {
  return await api
    .post("/Directory/DeleteDirectory?id=" + id)
    .then(response => {
      return response;
    });
};

export const directoryService = {
  getDirectories,
  createDirectory,
  deleteDirectory
};
