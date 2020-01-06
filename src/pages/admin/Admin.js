import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./companies/Home";
import Categories from "./categories";
class Admin extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/companies">
            <Home />
          </Route>
          <Route exact path="/categories">
            <Categories />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Admin;
