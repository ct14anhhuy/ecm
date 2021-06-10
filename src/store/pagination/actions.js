import * as types from "./types";

const updateCurrentPageAction = currentPage => {
  return {
    type: types.UPDATE_CURRENT_PAGE,
    payload: {
      currentPage
    }
  };
};

const updateTotalPagesAction = totalPages => {
  return {
    type: types.UPDATE_TOTAL_PAGES,
    payload: {
      totalPages
    }
  };
};

const updatePageLimitAction = pageLimit => {
  return {
    type: types.UPDATE_PAGE_LIMIT,
    payload: {
      pageLimit
    }
  };
};

const updateTotalRecordsAction = totalRecords => {
  return {
    type: types.UPDATE_TOTAL_RECORDS,
    payload: {
      totalRecords
    }
  };
};

const updatePageNeighboursAction = pageNeighbours => {
  return {
    type: types.UPDATE_PAGE_NEIGHBOURS,
    payload: {
      pageNeighbours
    }
  };
};

export {
  updateCurrentPageAction,
  updatePageLimitAction,
  updatePageNeighboursAction,
  updateTotalPagesAction,
  updateTotalRecordsAction
};
