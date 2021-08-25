import React from "react";

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">Alejandra</span>
      <button className="btn btn-outline-danger">
        <i className="fa fa-sign-out-alt mr-1"></i>
        <span>Exit</span>
      </button>
    </div>
  );
};
