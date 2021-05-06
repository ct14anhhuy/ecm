import { Link } from "react-router-dom";

const Pagination = () => {
  return (
    <div className="paging">
      <span>
        <Link className="act" to="/">
          1
        </Link>
      </span>
      <span>
        <Link className="act" to="/">
          2
        </Link>
      </span>
      <span>
        <Link className="act" to="/">
          3
        </Link>
      </span>
      <span>
        <Link className="act" to="/">
          4
        </Link>
      </span>
    </div>
  );
};

export default Pagination;
