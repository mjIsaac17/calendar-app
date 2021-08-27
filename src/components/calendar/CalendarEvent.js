import React from "react";

export const CalendarEvent = ({ event }) => {
  //   console.log(event);
  const { title, user } = event;
  return (
    <div>
      <strong>{title}</strong>
      <br />
      <span>- {user.name}</span>
    </div>
  );
};
