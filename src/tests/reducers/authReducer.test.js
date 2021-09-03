import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("Tests in authReducer", () => {
  const initialState = { checking: true };
  const userState = {
    checking: false,
    uid: "123456c",
    name: "Isaac",
  };

  test("should return the initial state ", () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("authLogin should return the state + payload + checking:false in an object", () => {
    const state = authReducer(initialState, {
      type: types.authLogin,
      payload: { uid: userState.uid, name: userState.name },
    });
    expect(state).toEqual(userState);
  });

  test("authCheckingFinish should return the state + checking:false", () => {
    const state = authReducer(userState, {
      type: types.authCheckingFinish,
      payload: { ...userState, checking: true },
    });
    expect(state).toEqual({ ...userState, checking: false });
  });

  test("authlogout should return checking:false", () => {
    const state = authReducer(userState, { type: types.authLogout });
    expect(state).toEqual({ checking: false });
  });
});
