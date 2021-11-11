import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const Paging = props => {
  const LEFT_PAGE = "LEFT";
  const RIGHT_PAGE = "RIGHT";
  const { path, dirId } = useParams();
  const { pageIndex, pageSize, totalRows } = props.paginationSet;

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  const fetchPageNumbers = () => {
    const pageNeighbours = 0;
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;
    const totalPages = Math.ceil(totalRows / pageSize);
    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, pageIndex - pageNeighbours);
      const endPage = Math.min(totalPages - 1, pageIndex + pageNeighbours);
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
              <Link
                to={{
                  pathname: `/ecm/${path}/${dirId ? `${dirId}/` : ""}${
                    pageIndex - 1
                  }`
                }}
                key={index}
              >
                {"<"}
              </Link>
            );
          }

          if (page === RIGHT_PAGE) {
            return (
              <Link
                to={{
                  pathname: `/ecm/${path}/${dirId ? `${dirId}/` : ""}${
                    pageIndex + 1
                  }`
                }}
                key={index}
              >
                {">"}
              </Link>
            );
          }
          return (
            <Link
              className={page === pageIndex ? "act" : ""}
              to={{
                pathname: `/ecm/${path}/${dirId ? `${dirId}/` : ""}${page}`
              }}
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

const mapStateToProps = state => {
  return {
    paginationSet: state.fileInfoReducers.paginationSet
  };
};

export default connect(mapStateToProps, null)(Paging);
