import { api } from "utils/api";

const getFileUrl = async id => {
  return await api.get("/FileInfo/GetFileUrl?id=" + id).then(response => {
    return response;
  });
};

const getFileShareUrl = async id => {
  return await api.get("/FileInfo/GetFileShareUrl?id=" + id).then(response => {
    return response;
  });
};

export const fileUrlService = { getFileUrl, getFileShareUrl };
