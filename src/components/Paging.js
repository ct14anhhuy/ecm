import { Link } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import { updateCurrentPageAction } from "store/pagination/actions";

const Paging = (props) => {
  const { currentPage, totalPages, pageNeighbours } = props.pagination;

  const { updateCurrentPage } = props;

  const LEFT_PAGE = "LEFT";
  const RIGHT_PAGE = "RIGHT";

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  const handleMoveLeft = () => {
    updateCurrentPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = () => {
    updateCurrentPage(currentPage + pageNeighbours * 2 + 1);
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers();

  return (
    <div className="paging">
      <span>
        {pages.map((page, index) => {
          if (page === LEFT_PAGE) {
            return (
              <Link to="/" onClick={handleMoveLeft} key={index}>
                {"<"}
              </Link>
            );
          }

          if (page === RIGHT_PAGE) {
            return (
              <Link to="/" onClick={handleMoveRight} key={index}>
                {">"}
              </Link>
            );
          }
          return (
            <Link
              className={currentPage === page ? "act" : ""}
              to="/"
              onClick={() => updateCurrentPage(page)}
              key={index}
            >
              {page}
            </Link>
          );
        })}
      </span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fileInfos: state.fileInfoReducers,
    pagination: state.paginationReducers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentPage: (currentPage) =>
      dispatch(updateCurrentPageAction(currentPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paging);
