import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  //Renew the token when the page loads
  useEffect(async () => {
    await dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Loading ...</h5>;
  } else {
    return (
      <Router>
        <div>
          <Switch>
            <PublicRoute
              path="/login"
              isAuthenticated={!!uid}
              component={LoginScreen}
            />
            <PrivateRoute
              path="/"
              isAuthenticated={!!uid}
              component={CalendarScreen}
            />
          </Switch>
        </div>
      </Router>
    );
  }
};
