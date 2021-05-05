import { api } from "../utils/api";

const getDirectories = async () => {
  return await api.get("/Directory/GetTreeDirectory").then((response) => {
    return response.data;
  });
};

export const directoryService = { getDirectories };
