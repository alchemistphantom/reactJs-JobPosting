import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import SearchJob from "./pages/Jobs/SearchJob/SearchJob";
import NavigationBar from "./component/NavigationBar";
import ResultJob from "./pages/Jobs/ResultJob/ResultJob";
import SearchJob from "./pages/Jobs/SearchJob/SearchJob";
import Footer from "./component/footer/Footer";
import Detail from "./pages/companies/detail/Detail";
import Companies from "./pages/companies/Search/Companies";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Reigister/Register";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/admin/Home";
import Admin from "./pages/admin/Admin";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "coba",
      isLogin: false,
      query: {}
      // search: "",
      // company: ""
    };
  }

  handleLogin = isLogin => {
    this.setState(
      {
        isLogin: isLogin
      },
      () => {
        console.log("ini app", this.state.isLogin);
      }
    );
  };

  getSearch = query => {
    this.setState({
      query: query
    });
  };

  logout = isLogout => {
    this.setState({
      isLogin: isLogout
    });
  };

  componentDidMount() {
    if (localStorage.length !== 0) {
      this.setState({
        isLogin: true
      });
    }
  }

  render() {
    return (
      <Router>
        {/* {this.state.isLogin ? ( */}
        <NavigationBar
          isLogin={this.state.isLogin}
          logoutParent={this.logout}
        />
        {/* ) : null} */}
        <Switch>
          {/* <Admin /> */}
          <Route exact path="/admin">
            {/* <SearchJob searchJob={this.getSearch} /> */}
            <Home />
          </Route>
          <Route exact path="/">
            <SearchJob searchJob={this.getSearch} />
            {/* <Home /> */}
          </Route>
          {/* route dengan membawa id */}
          <Route path="/detail/:id" component={Detail} />
          <Route path="/result">
            <ResultJob words={this.state.query} isLogin={this.state.isLogin} />
          </Route>
          <Route path="/company" component={Companies}></Route>
          <Route path="/Login">
            <Login parentLogin={this.handleLogin} />
          </Route>
          <Route path="/register" component={Register}></Route>
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
