import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import axios from "axios";

import Home from "./components/home/Home";
import Login from "./components/login/Login";

import SweetAlert from "./components/UI/SweetAlert";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Bootstrap.css";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formIsValid, setFormIsValid] = useState();
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    setWaiting(true);

    setTimeout(() => {
      setWaiting(false);

      axios
        .post("http://challenge-react.alkemy.org", {
          email: email,
          password: password,
        })
        .then(function (response) {
          setIsLoggedIn(true);
          setFormIsValid(true);

          localStorage.setItem("isLoggedIn", `${response.data.token}`);
        })
        .catch(function (error) {
          console.error(error);
          setFormIsValid(false);
          SweetAlert({
            text: "Wrong credentials!",
          });
        });
    }, 1000);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const authUser = ({ check, component, to }) => {
    return check ? component : <Redirect to={to} />;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {authUser({
            check: isLoggedIn,
            component: <Home onLogout={logoutHandler} />,
            to: "/login",
          })}
        </Route>
        <Route path="/login">
          {authUser({
            check: !isLoggedIn,
            component: (
              <Login
                onLogin={loginHandler}
                isValid={formIsValid}
                setIsValid={setFormIsValid}
                isWaiting={waiting}
              />
            ),
            to: "/",
          })}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
