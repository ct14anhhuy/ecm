import axios from "axios";
import { store } from "store/configureStore";
import { logoutAction } from "store/user/actions";

const apiUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    Promise.reject(error.response);
  }
);

api.interceptors.response.use(
  response => response.data,
  error => {
    const UNAUTHORIZED_STATUS = 401;
    if (error.response.status === UNAUTHORIZED_STATUS) {
      store.dispatch(logoutAction());
    }
    return Promise.reject(error.response);
  }
);

export { api };
