import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helpers/calendar-messages-es";
import { types } from "../../../types/types";
import { eventSetActive, eventStartLoading } from "../../../actions/events";
import { act } from "@testing-library/react";

jest.mock("../../../actions/events", () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  calendar: { events: [] },
  auth: { uid: "132", name: "Isaac" },
  ui: { openModal: false },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe("Tests in <CalendarModal />", () => {
  test("should show correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should work with the calendar interactions", () => {
    const calendar = wrapper.find("Calendar");
    const calendarMessages = calendar.prop("messages");
    expect(calendarMessages).toEqual(messages);

    calendar.prop("onDoubleClickEvent")();
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

    calendar.prop("onSelectEvent")({ start: "Test value" });
    expect(eventSetActive).toHaveBeenCalledWith({ start: "Test value" });

    act(() => {
      calendar.prop("onView")("week");
      expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
    });
  });
});
