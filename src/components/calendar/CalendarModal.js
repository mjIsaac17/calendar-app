import moment from "moment";
import React from "react";
import DateTimePicker from "react-datetime-picker";
import { useState } from "react";
import Modal from "react-modal";
import { errorMessages } from "../../helpers/error-messages";
import "../../styles/modal.css";

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

export const CalendarModal = () => {
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowPlusOne.toDate());
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: now.toDate(),
    end: nowPlusOne.toDate(),
  });
  const { title, notes, start, end } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {};

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

    isFormValid();
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
      isOpen={true}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1>New event</h1>
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
