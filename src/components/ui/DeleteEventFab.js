import React from "react";
import { useDispatch } from "react-redux";
import { eventDelete } from "../../actions/events";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(eventDelete());
  };
  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fa fa-trash mr-1"></i>
      <span>Delete event</span>
    </button>
  );
};