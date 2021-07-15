import * as types from "./types";
import produce from "immer";

const initState = {
  currentPage: 1,
  totalPages: null,
  pageLimit: 15,
  totalRecords: null,
  pageNeighbours: 0
};

const paginationReducers = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.UPDATE_CURRENT_PAGE:
        draft.currentPage = action.payload.currentPage;
        break;
      case types.UPDATE_PAGE_LIMIT:
        draft.pageLimit = action.payload.pageLimit;
        break;
      case types.UPDATE_PAGE_NEIGHBOURS:
        draft.pageNeighbours = action.payload.pageNeighbours;
        break;
      case types.UPDATE_TOTAL_PAGES:
        draft.totalPages = action.payload.totalPages;
        break;
      case types.UPDATE_TOTAL_RECORDS:
        draft.totalRecords = action.payload.totalRecords;
        break;
      default:
        return state;
    }
  });

export default paginationReducers;
