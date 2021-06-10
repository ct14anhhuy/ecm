import { api } from "utils/api";

const getDepartments = async () => {
  return await api.get("/Department/GetDepartments").then(response => {
    return response.data;
  });
};

export const departmentService = { getDepartments };
