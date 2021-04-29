import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import "./assets/font-awesome/css/all.min.css";

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Main} exact />
    </Switch>
  );
};

export default App;
