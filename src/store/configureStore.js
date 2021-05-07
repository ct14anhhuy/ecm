import { combineReducers } from "redux";
import fileInfoReducers from "./fileInfo/reducers";
import directoryReducers from "./diretory/reducers";
import employeeReducers from "./employee/reducers";
import paginationReducers from "./pagination/reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["employeeReducers"],
};

const rootReducer = combineReducers({
  fileInfoReducers,
  directoryReducers,
  employeeReducers,
  paginationReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeSetup =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const configureStore = () => {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  return createStore(persistedReducer, composeSetup(middlewareEnhancer));
};

const store = configureStore();
const persistedStore = persistStore(store);

export { store, persistedStore };
