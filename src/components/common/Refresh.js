import { useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";

const Refresh = () => {
  const history = useHistory();
  useEffect(() => {
    history.goBack();
  });
  return <Fragment></Fragment>;
};

export default Refresh;
