import { Link } from "react-router-dom";

const Paging = () => {
  return (
    <div className="paging">
      <span>
        <Link className="act" to="/">
          1
        </Link>
      </span>
    </div>
  );
};

export default Paging