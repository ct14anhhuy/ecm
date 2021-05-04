import { put, call, takeEvery } from "redux-saga/effects";
import * as api from "../utils/api";
import * as types from "../store/employee/types";

function* loginRequest() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    api.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }
  try {
    const response = yield call(api.login);
    yield put({
      type: types.LOGIN_SUCCESS,
      payload: { employee: response.data },
    });
  } catch (error) {
    console.log(error);
  }
}

function* logout() {
  localStorage.removeItem("accessToken");
  yield put({
    type: types.LOGOUT,
  });
}

function* watcher() {
  yield [
    takeEvery(types.LOGIN_REQUEST, loginRequest),
    takeEvery(types.LOGOUT, logout),
  ];
}

export default watcher;
