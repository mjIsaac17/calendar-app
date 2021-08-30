import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./login.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [errorMessageLogin, setErrorMessageLogin] = useState("");
  const [errorMessageRegister, setErrorMessageRegister] = useState("");

  const [formLoginValues, handleInputChange] = useForm({
    lEmail: "isaac@gmail.com", //loginEmail
    lPassword: "123456",
  });
  const { lEmail, lPassword } = formLoginValues;

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: "Caasi",
    rEmail: "caasi@gmail.com", //registerEmail
    rPassword1: "123456",
    rPassword2: "123456",
  });

  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

  const handleLogin = async (e) => {
    e.preventDefault();
    const errorMessage = await dispatch(startLogin(lEmail, lPassword));
    setErrorMessageLogin(errorMessage);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (rPassword1 !== rPassword2) {
      return setErrorMessageRegister("Passwords must be the same");
    }
    //More validations if required
    const errorMessage = await dispatch(
      startRegister(rEmail, rPassword1, rName)
    );
    setErrorMessageRegister(errorMessage);
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            {errorMessageLogin !== "" && (
              <div className="alert alert-danger">
                <p className="noMargin text-center">{errorMessageLogin}</p>
              </div>
            )}
            <div className="form-group">
              <input
                name="lEmail"
                type="text"
                className="form-control"
                placeholder="Email"
                value={lEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                name="lPassword"
                value={lPassword}
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            {errorMessageRegister !== "" && (
              <div className="alert alert-danger">
                <p className="noMargin text-center">{errorMessageRegister}</p>
              </div>
            )}
            <div className="form-group">
              <input
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
                type="email"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                name="rPassword1"
                value={rPassword1}
                onChange={handleRegisterInputChange}
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group">
              <input
                name="rPassword2 "
                value={rPassword2}
                onChange={handleRegisterInputChange}
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
