import { fetchToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    try {
      const { uid, name } = getState().auth;
      const resp = await fetchToken("events", event, "POST");
      const body = await resp.json();
      if (resp.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name,
        };
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActive = () => ({
  type: types.eventClearActive,
});

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken(`events/${event.id}`, event, "PUT");
      const body = await resp.json();
      if (resp.ok) {
        dispatch(eventUpdate(event));
      } else {
        alert(`Error. ${body.msg}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().calendar.activeEvent;
      const resp = await fetchToken(`events/${id}`, {}, "DELETE");
      const body = await resp.json();
      if (resp.ok) {
        dispatch(eventDelete());
      } else {
        alert(`Error. ${body.msg}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDelete = () => ({
  type: types.eventDelete,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken("events");
      const body = await resp.json();
      const events = prepareEvents(body.events);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventLogout = () => ({
  type: types.eventLogout,
});
