import { combineReducers } from "redux";
import fileInfoReducers from "./fileInfo/reducers";
import directoryReducers from "./diretory/reducers";

export default combineReducers({
  fileInfoReducers,
  directoryReducers,
});
