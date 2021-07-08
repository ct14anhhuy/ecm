import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Refresh = () => {
  const history = useHistory();
  useEffect(() => {
    history.goBack();
  });
  return <React.Fragment></React.Fragment>;
};

export default Refresh;
