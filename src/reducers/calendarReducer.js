import moment from "moment";
import { types } from "../types/types";

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: "React course",
      start: moment().toDate(), // = new Date()
      end: moment().add(2, "hours").toDate(),
      bgColor: "#fafafa",
      user: {
        _id: "1234",
        name: "Alejandra",
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.eventClearActive:
      return { ...state, activeEvent: null };

    case types.eventUpdate:
      //action.payload = eventToUpdate
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    case types.eventDelete:
      //action.payload = eventToUpdate
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null,
      };
    default:
      return state;
  }
};
