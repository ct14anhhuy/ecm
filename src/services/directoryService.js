import { api } from "utils/api";

const getDirectories = async () => {
  return await api.get("/Directory/GetTreeDirectory").then(response => response);
};

const createDirectory = async directory => {
  return await api
    .post("/Directory/CreateDirectory", directory)
    .then(response => response);
};

const deleteDirectory = async id => {
  return await api.post(`/Directory/DeleteDirectory?id=${id}`).then(response => response);
};

export const directoryService = {
  getDirectories,
  createDirectory,
  deleteDirectory,
};
