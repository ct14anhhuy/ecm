import Main from "components/Main";
import { Route, Switch } from "react-router-dom";
import Login from "components/common/Login";
import PrivateRoute from "components/common/PrivateRoute";
import Error from "components/common/Error";

const App = () => {
  return (
    <Switch>
      <Route path="/redirect/:token" component={Login} />
      <PrivateRoute path="/ecm/:path/:id?">
        <Main />
      </PrivateRoute>
      <Route path="*">
        <Error message="Invalid url" />
      </Route>
    </Switch>
  );
};

export default App;
