import { api } from "utils/api";

const getFileUrl = async id => {
  return await api.get("/FileInfo/GetFileUrl?id=" + id).then(response => {
    return response.data;
  });
};

const getFileShareUrl = async id => {
  return await api.get("/FileInfo/GetFileShareUrl?id=" + id).then(response => {
    return response.data;
  });
};

export const fileUrlService = { getFileUrl, getFileShareUrl };
