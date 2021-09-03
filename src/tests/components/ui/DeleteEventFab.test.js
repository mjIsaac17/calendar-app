import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { eventStartDelete } from "../../../actions/events";

jest.mock("../../../actions/events", () => ({
  eventStartDelete: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe("Tests in <DeleteEventFab />", () => {
  test("should load the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call the eventStartDelete when clicking", () => {
    wrapper.find("button").prop("onClick")();
    expect(eventStartDelete).toHaveBeenCalled();
  });
});
