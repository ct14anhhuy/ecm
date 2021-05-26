import * as types from "./types";

const initState = {
  headerPath: "My Contents",
};

const systemParamsReducers = (state = initState, action) => {
  switch (action.type) {
    case types.CHANGE_HEADER_PATH:
      return { ...state, headerPath: action.payload.path };
    default:
      return state;
  }
};

export default systemParamsReducers;
