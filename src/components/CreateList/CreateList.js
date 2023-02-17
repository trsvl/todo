import React from "react";
import "./CreateList.scss";

export default function CreateList({ setStateForm }) {
  const addList = () => {
    setStateForm(true);
  };

  return (
    <div className="create_list">
      <h1>To-Do List</h1>
      <button className="create_list__button" onClick={addList}>
        <span>+</span>
      </button>
    </div>
  );
}
