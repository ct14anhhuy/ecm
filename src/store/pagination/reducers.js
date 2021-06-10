import * as types from "./types";

const initState = {
  currentPage: 1,
  totalPages: null,
  pageLimit: 15,
  totalRecords: null,
  pageNeighbours: 0
};

const paginationReducers = (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case types.UPDATE_PAGE_LIMIT:
      return { ...state, pageLimit: action.payload.pageLimit };
    case types.UPDATE_PAGE_NEIGHBOURS:
      return { ...state, pageNeighbours: action.payload.pageNeighbours };
    case types.UPDATE_TOTAL_PAGES:
      return { ...state, totalPages: action.payload.totalPages };
    case types.UPDATE_TOTAL_RECORDS:
      return { ...state, totalRecords: action.payload.totalRecords };
    default:
      return state;
  }
};

export default paginationReducers;
