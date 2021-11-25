import { api } from "utils/api";

const login = async () => {
  return await api
    .get("/Employee/GetEmployeeFromToken")
    .then(response => response);
};

export const userService = { login };
