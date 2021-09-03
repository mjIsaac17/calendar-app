import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import * as fetchModule from "../../helpers/fetch";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn(); //mock of setItem function

describe("Tests in Auth actions", () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test("startLogin is correct", async () => {
    await store.dispatch(startLogin("isaac@gmail.com", "123456"));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: expect.any(String), name: expect.any(String) },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );

    //get the items stored in the mock localStorage
    //console.log(localStorage.setItem.mock.calls[0][1]);
  });

  test("startLogin is incorrect", async () => {
    const message = await store.dispatch(
      startLogin("isaac@gmail.com", "123456789")
    );
    const actions = store.getActions();

    expect(actions).toEqual([]);
    expect(message).toBe("Invalid email or password");
  });

  //   test("startRegister is correct", async () => {
  //     //Create a mock to avoid creating a new user when the test runs
  //     //The mock is not working with https://github.com/wojtekmaj/enzyme-adapter-react-17 on 09/02/21
  //     fetchModule.fetchNoToken = jest.fn(() => ({
  //       json() {
  //         return {
  //           ok: true,
  //           uid: "abc",
  //           name: "Isaac",
  //           token: "123c456v",
  //         };
  //       },
  //     }));

  //     await store.dispatch(
  //       startRegister("isaac@gmail.com", "123456", "testName")
  //     );

  //     const actions = store.getActions();

  //     expect(actions[0]).toEqual({
  //       type: types.authLogin,
  //       payload: {
  //         uid: "abc",
  //         name: "Isaac",
  //       },
  //     });

  //     expect(localStorage.setItem).toHaveBeenCalledWith("token", "123c456v");

  //     expect(localStorage.setItem).toHaveBeenCalledWith(
  //       "token-init-data",
  //       expect.any(Number)
  //     );
  //   });

  //   test("startChecking is correct", async () => {
  //     fetchModule.fetchToken = jest.fn(() => ({
  //       json() {
  //         return {
  //           ok: true,
  //           uid: "123",
  //           name: "Isaac",
  //           token: "abc123dec456",
  //         };
  //       },
  //     }));
  //     await store.dispatch(startChecking());
  //     const actions = store.getActions();
  //     expect(actions[0]).toEqual({
  //       type: types.authLogin,
  //       payload: { uid: "123", name: "Isaac" },
  //     });

  //     expect(localStorage.setItem).toHaveBeenCalledWith("token", "abc123dec456");
  //   });
});
