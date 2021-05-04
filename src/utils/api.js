import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const login = async () =>
  await axiosInstance.get("/Employee/GetEmployeeFromToken");

export { axiosInstance, login };
