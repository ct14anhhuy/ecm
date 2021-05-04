import { combineReducers } from "redux";
import fileInfoReducers from "./fileInfo/reducers";
import directoryReducers from "./diretory/reducers";
import employeeReducers from "./employee/reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { createStore, compose, applyMiddleware } from "redux";

const composeSetup =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const rootReducer = combineReducers({
  fileInfoReducers,
  directoryReducers,
  employeeReducers,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: "employeeReducers",
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
let store = createStore(
  persistedReducer,
  composeSetup(applyMiddleware(sagaMiddleware))
);
let persistor = persistStore(store);

export default combineReducers({
  fileInfoReducers,
  directoryReducers,
  employeeReducers,
});

export { store, persistor, sagaMiddleware };
