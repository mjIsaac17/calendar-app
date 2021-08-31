import { types } from "../types/types";

// Event
// {
//   id: 123a456b789c,
//   title: "React course",
//   start: moment().toDate(), // = new Date()
//   end: moment().add(2, "hours").toDate(),
//   notes: "Learn Node",
//   user: {
//     _id: "1234",
//     name: "Alejandra",
//   },
// },

const initialState = {
  events: [],
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

    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload],
      };

    case types.eventLogout:
      return { ...initialState };
    default:
      return state;
  }
};
