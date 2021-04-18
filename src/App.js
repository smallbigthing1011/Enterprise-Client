import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import {
  AccountForm,
  Accounts,
  ContributionDetail,
  ContributionForm,
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
        <Route exact path="/magazines">
          <Magazines></Magazines>
        </Route>
        <Route exact path="/magazines/:idmagazine">
          <MagazineDetail></MagazineDetail>
        </Route>
        <Route exact path="/account/:action">
          <AccountForm></AccountForm>
        </Route>
        <Route exact path="/account/:action/:idaccount">
          <AccountForm></AccountForm>
        </Route>
        <Route exact path="/magazine/:action">
          <MagazineForm></MagazineForm>
        </Route>
        <Route exact path="/magazine/:action/:idmagazine">
          <MagazineForm></MagazineForm>
        </Route>
        <Route exact path="/contributions/:action/:idcon">
          <ContributionDetail></ContributionDetail>
        </Route>
        {/* <Route exact path="/contributions/:conaction">
          <ContributionForm></ContributionForm>
        </Route>
        
        <Route exact path="/contributions/details/:idcon/upload">
          <UploadForm></UploadForm>
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
