import { api } from "utils/api";

const getDepartments = async () => {
  return await api.get("/Department/GetDepartments").then(response => response);
};

export const departmentService = { getDepartments };
