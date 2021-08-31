import { fetchNoToken, fetchToken } from "../helpers/fetch";
import { types } from "../types/types";

const baseEndpoint = "auth";

export const startLogin = (email, password) => {
  //the return is triggered by thunk when we need to use async functions
  return async (dispatch) => {
    const resp = await fetchNoToken(baseEndpoint, { email, password }, "POST");
    const body = await resp.json();
    if (resp.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));
      return "";
    }
    // else{
    //     //Using sweet alert
    //     //Swal.fire
    // }
    return body.msg;
  };
};

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchNoToken(
      `${baseEndpoint}/new`,
      { email, password, name },
      "POST"
    );
    const body = await resp.json();
    if (resp.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));
      return "";
    }
    return body.msg;
  };
};

//Renew token
export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchToken(`${baseEndpoint}/renew`);
    const body = await resp.json();
    if (resp.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));
    } else dispatch(checkingFinish());
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
