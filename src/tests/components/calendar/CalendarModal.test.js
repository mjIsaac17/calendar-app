import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { CalendarModal } from "../../../components/calendar/CalendarModal";
import moment from "moment";
import {
  eventClearActive,
  eventStartAddNew,
  eventStartUpdate,
} from "../../../actions/events";
import { act } from "@testing-library/react";

jest.mock("../../../actions/events", () => ({
  eventStartUpdate: jest.fn(),
  eventClearActive: jest.fn(),
  eventStartAddNew: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");

const initialState = {
  calendar: {
    activeEvent: {
      title: "Test title",
      notes: "Test notes",
      start: now.toDate(),
      end: nowPlusOne.toDate(),
    },
  },
  auth: { uid: "123", name: "Isaac" },
  ui: { modalOpen: true },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe("Tests in <CalendarModal />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should show the modal", () => {
    // expect(wrapper.find(".modal").exists()).toBe(true);
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  test("should call the update and close modal action", () => {
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(eventStartUpdate).toHaveBeenCalledWith(
      initialState.calendar.activeEvent
    );
    expect(eventClearActive).toHaveBeenCalled();
  });

  test("should show error if the title is missing", () => {
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(wrapper.find('input[name="title"]').hasClass("is-invalid")).toBe(
      true
    );
  });

  test("should create a new event", () => {
    const initialState = {
      calendar: { activeEvent: null },
      auth: { uid: "123", name: "Isaac" },
      ui: { modalOpen: true },
    };
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate("change", {
      target: { name: "title", value: "test title" },
    });
    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      start: expect.anything(),
      end: expect.anything(),
      title: "test title",
      notes: "",
    });
    expect(eventClearActive).toHaveBeenCalled();
  });

  test("should validate the dates", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: { name: "title", value: "test title" },
    });
    const today = new Date();
    act(() => {
      wrapper.find("DateTimePicker").at(1).prop("onChange")(today);
    });
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(wrapper.find("p").text().trim()).toBe(
      "Start date or end date is not valid"
    );
  });
});
