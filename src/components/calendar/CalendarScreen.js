import React, { useState } from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";

import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarModal } from "./CalendarModal";
import { CalendarEvent } from "./CalendarEvent";
import { Navbar } from "../ui/Navbar";

import { uiOpenModal } from "../../actions/ui";
import { messages } from "../../helpers/calendar-messages-es";
import {
  eventClearActive,
  eventSetActive,
  eventStartLoading,
} from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";
import { useEffect } from "react";

// moment.locale("es");
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };
  const onSelectEvent = (event) => {
    dispatch(eventSetActive(event));
  };

  //Function triggered when we change the view (month, week, day)
  const onViewChange = (selectedView) => {
    // console.log(selectedView);
    setLastView(selectedView);
    localStorage.setItem("lastView", selectedView);
  };

  const onSelectSlot = (e) => {
    // console.log(e);
    // e contains the slot where the user clicked,
    // this is usefull if we want to add an event where it was selected
    dispatch(eventClearActive());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367CF7" : "#465555",
      borderRadious: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return { style };
  };
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages} //change messages to Spanish
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
    </div>
  );
};
