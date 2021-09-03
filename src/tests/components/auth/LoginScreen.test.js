import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../actions/auth";
import { act, waitFor } from "@testing-library/react";

jest.mock("../../../actions/auth", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe("Tests in <LoginScreen />", () => {
  test("should load the component correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call the login dispatch, startLogin", async () => {
    wrapper.find('input[name="lEmail"]').simulate("change", {
      target: { name: "lEmail", value: "test@gmail.com" },
    });
    wrapper.find('input[name="lPassword"]').simulate("change", {
      target: { name: "lPassword", value: "123456" },
    });

    wrapper.find("form").at(0).prop("onSubmit")({ preventDefault() {} });
    // waitFor is added because startlogin returns an errorMessage, and it is an async fn
    await waitFor(() => {
      expect(startLogin).toHaveBeenCalledWith("test@gmail.com", "123456");
    });
  });

  test("should not call the register an user the passwords are different", () => {
    wrapper.find('input[name="rName"]').simulate("change", {
      target: { name: "rName", value: "testName" },
    });
    wrapper.find('input[name="rEmail"]').simulate("change", {
      target: { name: "rEmail", value: "test@gmail.com" },
    });
    wrapper.find('input[name="rPassword1"]').simulate("change", {
      target: { name: "rPassword1", value: "123456" },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: { name: "rPassword2", value: "654321" },
    });
    act(() => {
      wrapper.find("form").at(1).prop("onSubmit")({ preventDefault() {} });
    });

    expect(startRegister).toHaveBeenCalledTimes(0);
  });

  test("should call the register with same passwords", async () => {
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: { name: "rPassword2", value: "123456" },
    });
    await waitFor(() => {
      wrapper.find("form").at(1).prop("onSubmit")({ preventDefault() {} });
    });
    expect(startRegister).toHaveBeenCalledTimes(1);
  });
});
