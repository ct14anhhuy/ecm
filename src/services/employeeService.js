import { api } from "utils/api";

const searchByName = async (name) => {
  return await api
    .get("/Employee/GetEmployeesByName?empName=" + name)
    .then((response) => {
      return response.data;
    });
};

export const employeeService = { searchByName };
