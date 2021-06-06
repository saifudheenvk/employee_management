import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route exact path={["/login", "/signup"]} component={Login} />
        <Route exact strict path="/dashboard" component={Dashboard} />
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      </Switch>
    </Router>
  </div>
);

export default App;
