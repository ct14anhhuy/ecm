import Main from "components/Main";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "components/common/Login";
import PrivateRoute from "components/common/PrivateRoute";
import Error from "components/common/Error";
import Refresh from "components/common/Refresh";

const App = () => {
  return (
    <Switch>
      <Route path="/redirect/:token" component={Login} />

      <Redirect
        from="/ecm-redirect/:path/:dirId/:page"
        to="/ecm/:path/:dirId/:page"
      />
      <Redirect from="/ecm-redirect/:path/:page" to="/ecm/:path/:page" />

      <PrivateRoute path={["/ecm/:path/:dirId/:page", "/ecm/:path/:page"]}>
        <Main />
      </PrivateRoute>
      <Route path="/refresh" exact component={Refresh} />
      <Route path="*">
        <Error message="Invalid url" />
      </Route>
    </Switch>
  );
};

export default App;
