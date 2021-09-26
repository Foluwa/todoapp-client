import React, { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();

const App = () => {
  const checkAuthenticated = async () => {
    try {

      console.log('localStorage.token ', localStorage.token)
      const res = await fetch("http://localhost:3001/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.token}` }
      });

      const parseRes = await res.json();
      console.log('parseRes RESPOSNE ', parseRes)
      if (parseRes.email === true) { console.log('USER FOUND') } else { console.log('USER NOT FOUND') }

      //parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      parseRes !== null ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={props =>
            !isAuthenticated ? (
              <SignIn {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={props =>
            !isAuthenticated ? (
              <SignIn {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/register"
          render={props =>
            !isAuthenticated ? (
              <SignUp {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/dashboard"
          render={props =>
            isAuthenticated ? (
              <Dashboard {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
