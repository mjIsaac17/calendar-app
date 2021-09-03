import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { AppRouter } from "../../routers/AppRouter";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// store.dispatch = jest.fn();

describe("Tests in <AppRouter />", () => {
  test("should show Loading...", () => {
    const initialState = {
      auth: { checking: true },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h5").text().trim()).toBe("Loading ...");
  });

  test("should show the public route", () => {
    const initialState = { auth: { checking: false } };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("should show the private route", () => {
    const initialState = {
      ui: { modalOpen: false },
      calendar: { events: [] },
      auth: { checking: false, uid: "123", name: "Isaac" },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });
});
