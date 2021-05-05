import { api } from "../utils/api";

const login = async () => {
  return await api.get("/Employee/GetEmployeeFromToken").then((response) => {
    return response.data;
  });
};

export const employeeService = { login };
