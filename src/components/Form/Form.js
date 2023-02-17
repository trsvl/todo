import React, { useState } from "react";
import "./Form.scss";
import { v4 } from "uuid";

export default function CreateListForm({
  setStateForm,
  listState,
  setListState,
  arrDate,
  setArrDate,
}) {
  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedDate, setSelectedDate] = useState("");
  const [titleDate, setTitleDate] = useState("");
  const [message, setMessage] = useState("");
  const [handlingDateInput, setHandlingDateInput] = useState("");
  const [handlingTextInput, setHandlingTextInput] = useState("");
  const [shortDate, setShortDate] = useState("");

  function addLeadingZeros(num) {
    return String(num).padStart(2, "0");
  }

  const newDate = new Date();
  const minDate = addLeadingZeros(newDate.getDate());
  const minMonth = addLeadingZeros(newDate.getMonth() + 1);
  const minYear = newDate.getFullYear();
  const fullMinDate = `${minYear}-${minMonth}-${minDate}`;

  const handleChangeDate = (event) => {
    const received = new Date(event.target.value);
    const date = received.getDate();
    const day = dayOfWeek[received.getDay()];
    const month = allMonths[received.getMonth()];
    const year = received.getFullYear();
    setTitleDate(`${day}, ${date} ${month}, ${year}.`);
    setSelectedDate(event.target.value);
    month ? setShortDate(`${date} ${month.substring(0, 3)}`) : setShortDate("");
    !selectedDate && setHandlingDateInput("");
  };

  const handleChangeText = (event) => {
    setMessage(event.target.value);
    !message && setHandlingTextInput("");
  };

  const emptyCheck = () => {
    if (!selectedDate) {
      setHandlingDateInput("*Enter the date");
    }
    if (!message) {
      setHandlingTextInput("*Enter text");
    }
  };

  const addList = (e) => {
    e.preventDefault();
    if (!selectedDate || !message) {
      emptyCheck();
    } else {
      if (arrDate.includes(titleDate)) {
        setListState(
          listState.map((items) => {
            if (items.title === titleDate) {
              items.item.push({
                text: message,
                state: true,
                checkbox: false,
                id: v4(),
                style: {
                  checkbox: "test",
                  edit: "no-edit",
                },
              });
              return items;
            } else return items;
          })
        );
      } else {
        setArrDate([...arrDate, titleDate]);
        setListState([
          ...listState,
          {
            id: v4(),
            item: [
              {
                text: message,
                state: true,
                checkbox: false,
                id: v4(),
                style: {
                  checkbox: "test",
                  edit: "no-edit",
                },
              },
            ],
            title: titleDate,
          },
        ]);
      }

      setMessage("");
      setStateForm(false);
    }
  };

  const CloseForm = (e) => {
    e.preventDefault();
    setStateForm(false);
  };

  return (
    <>
      <div onClick={() => setStateForm(false)} className="form-bg" />
      <div className="form-wrapper">
        <form className="all-form">
          <button onClick={CloseForm} className="close">
            <b>X</b>
          </button>
          <p className="error">{handlingDateInput}</p>
          <div className="date">
            <p>Select date:</p>
            <input
              type="date"
              className="input_date"
              min={fullMinDate}
              onChange={handleChangeDate}
            />
            <p>{shortDate}</p>
          </div>
          <p className="error">{handlingTextInput}</p>
          <input
            type="text"
            className="input_text"
            value={message}
            onChange={handleChangeText}
          />
          <button className="add_form__button" onClick={addList}>
            Add
          </button>
        </form>
      </div>
    </>
  );
}
