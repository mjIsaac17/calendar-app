import React, { useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import { useSelector, useDispatch } from "react-redux";

import { errorMessages } from "../../helpers/error-messages";
import { uiCloseModal } from "../../actions/ui";

import "../../styles/modal.css";
import {
  eventClearActive,
  eventAddNew,
  eventUpdate,
} from "../../actions/events";
import { useEffect } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

//Bind modal to your appElement
Modal.setAppElement("#root"); //id root in index.html
const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlusOne.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowPlusOne.toDate());
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const [formValues, setFormValues] = useState(initEvent);
  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActive());
    setFormValues(initEvent);
  };

  // Handlers
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setFormValues({
      ...formValues,
      start: date,
    });
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setFormValues({
      ...formValues,
      end: date,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      console.log("valid");
      if (activeEvent) {
        dispatch(eventUpdate(formValues));
      } else {
        dispatch(
          eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user: {
              _id: "13",
              name: "Isaac",
            },
          })
        );
      }
      dispatch(closeModal);
    }
  };

  const isFormValid = () => {
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (title === "") {
      setFormErrorMessage(errorMessages.emptyTitle);
      return false;
    }
    if (momentStart.isSameOrAfter(momentEnd, "minutes")) {
      setFormErrorMessage(errorMessages.invalidDates);
      return false;
    }
    setFormErrorMessage("");
    return true;
  };

  return (
    <Modal
      isOpen={modalOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>{activeEvent ? "Update event" : "New event"}</h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        {formErrorMessage && (
          <div className="alert alert-danger">
            <p className="text-center modal-noMargin">{formErrorMessage}</p>
          </div>
        )}
        <div className="form-group">
          <label>Start date and time</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={start}
            className={`form-control ${
              formErrorMessage === errorMessages.invalidDates && "is-invalid"
            }`}
            maxDate={endDate}
          />
        </div>

        <div className="form-group">
          <label>End date and time</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={end}
            className="form-control"
            minDate={startDate}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Title and notes</label>
          <input
            type="text"
            className={`form-control ${
              formErrorMessage === errorMessages.emptyTitle && "is-invalid"
            }`}
            placeholder="Event title"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            A short description
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notes"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Additional information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span>Save</span>
        </button>
      </form>
    </Modal>
  );
};
