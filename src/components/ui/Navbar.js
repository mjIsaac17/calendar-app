import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../actions/auth";
import { eventLogout } from "../../actions/events";

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(eventLogout());
    return <Redirect to="/login" />;
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        <i className="fa fa-sign-out-alt mr-1"></i>
        <span>Exit</span>
      </button>
    </div>
  );
};
