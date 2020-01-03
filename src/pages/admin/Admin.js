import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
class Admin extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/admin">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Admin;
