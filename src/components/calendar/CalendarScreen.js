import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-messages-es";
import { useState } from "react";
import { CalendarModal } from "./CalendarModal";
// moment.locale("es");
const localizer = momentLocalizer(moment);

const events = [
  {
    title: "React course",
    start: moment().toDate(), // = new Date()
    end: moment().add(2, "hours").toDate(),
    bgColor: "#fafafa",
    user: {
      _id: "1234",
      name: "Alejandra",
    },
  },
];

export const CalendarScreen = () => {
  const onDoubleClick = (e) => {
    console.log(e);
  };
  const onSelectEvent = (e) => {
    console.log(e);
  };

  //Function triggered when we change the view (month, week, day)
  const onViewChange = (selectedView) => {
    // console.log(selectedView);
    setLastView(selectedView);
    localStorage.setItem("lastView", selectedView);
  };

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
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
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <CalendarModal />
    </div>
  );
};
