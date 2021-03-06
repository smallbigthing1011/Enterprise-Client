import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import {
  AccountForm,
  Accounts,
  ContributionDetail,
  ContributionForm,
  Dashboard,
  Home,
  Login,
  MagazineDetail,
  Magazines,
  UploadForm,
  NotFound,
  MagazineForm,
} from "./containers";

function App() {
  const history = useHistory();

  let cookieData = document.cookie;

  useEffect(() => {
    if (!cookieData) {
      history.push("/");
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/oops">
          <NotFound></NotFound>
        </Route>
        <Route exact path="/accounts">
          <Accounts></Accounts>
        </Route>
        <Route exact path="/dashboard">
          <Dashboard></Dashboard>
        </Route>
        <Route exact path="/account/:action">
          <AccountForm></AccountForm>
        </Route>
        <Route exact path="/magazines">
          <Magazines></Magazines>
        </Route>
        <Route exact path="/magazine/:action">
          <MagazineForm></MagazineForm>
        </Route>

        <Route exact path="/account/:action/:idaccount">
          <AccountForm></AccountForm>
        </Route>
        <Route exact path="/magazine/:action/:idmagazine">
          <MagazineForm></MagazineForm>
        </Route>
        <Route exact path="/magazine/:idmagazine/detail/contributions">
          <MagazineDetail></MagazineDetail>
        </Route>
        <Route exact path="/contribution/:idcon/:state">
          <ContributionDetail></ContributionDetail>
        </Route>
        <Route exact path="/upload/:idmagazine/:action">
          <UploadForm></UploadForm>
        </Route>
        <Route exact path="/upload/contribution/:idcon/:action">
          <UploadForm></UploadForm>
        </Route>
        <Route exact path="/update/:idcon">
          <ContributionForm></ContributionForm>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
