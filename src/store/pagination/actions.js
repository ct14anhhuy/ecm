import * as types from "./types";

const updateCurrentPage = (currentPage) => {
  return {
    type: types.UPDATE_CURRENT_PAGE,
    payload: {
      currentPage,
    },
  };
};

const updateTotalPages = (totalPages) => {
  return {
    type: types.UPDATE_TOTAL_PAGES,
    payload: {
      totalPages,
    },
  };
};

const updatePageLimit = (pageLimit) => {
  return {
    type: types.UPDATE_PAGE_LIMIT,
    payload: {
      pageLimit,
    },
  };
};

const updateTotalRecords = (totalRecords) => {
  return {
    type: types.UPDATE_TOTAL_RECORDS,
    payload: {
      totalRecords,
    },
  };
};

const updatePageNeighbours = (pageNeighbours) => {
  return {
    type: types.UPDATE_PAGE_NEIGHBOURS,
    payload: {
      pageNeighbours,
    },
  };
};

export {
  updateCurrentPage,
  updatePageLimit,
  updatePageNeighbours,
  updateTotalPages,
  updateTotalRecords,
};
