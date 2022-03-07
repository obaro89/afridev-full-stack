import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/layouts/Landing";
import NavBar from "./components/layouts/NavBar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layouts/Alert";
import setAuthToken from "./utilities/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import AddExperience from "./components/profile/AddExperience";
import AddEducation from "./components/profile/AddEducation";
import Profiles from "./components/profile/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile/user/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
