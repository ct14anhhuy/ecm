import React from "react";
import { Route, Switch } from "react-router-dom";
import Error from "./components/common/Error";
import Login from "./components/common/Login";
import PrivateRoute from "./components/common/PrivateRoute";
import Main from "./components/Main";

const App = () => {
  return (
    <Switch>
      <Route path="/redirect/:token" component={Login} />
      <PrivateRoute path="/">
        <Main />
      </PrivateRoute>
      <Route component={Error} />
    </Switch>
  );
};

export default App;
