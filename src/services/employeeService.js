import { api } from "utils/api";

const searchByName = async name => {
  return await api
    .get(`/Employee/GetEmployeesByName?empName=${name}`)
    .then(response => {
      return response;
    });
};

const getByDepartment = async depId => {
  return await api
    .get(`/Employee/GetEmployeesByDeptId?deptId=${depId}`)
    .then(response => {
      return response;
    });
};

const getFileShared = async fileId => {
  return await api
    .get(`/FileShare/GetFileShared?fileId=${fileId}`)
    .then(response => {
      return response;
    });
};

export const employeeService = { searchByName, getByDepartment, getFileShared };
