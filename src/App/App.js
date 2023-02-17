import React, { useState } from "react";
import Form from "../components/Form/Form";
import CreateList from "../components/CreateList/CreateList";
import "./App.scss";
import List from "../components/List/List";

function App() {
  const [stateForm, setStateForm] = useState(false);
  const [listState, setListState] = useState([]);
  const [arrDate, setArrDate] = useState([]);

  return (
    <>
      <CreateList setStateForm={setStateForm} />
      {stateForm && (
        <Form
          listState={listState}
          setListState={setListState}
          setStateForm={setStateForm}
          arrDate={arrDate}
          setArrDate={setArrDate}
        />
      )}
      <List
        listState={listState}
        setListState={setListState}
        arrDate={arrDate}
      />
    </>
  );
}

export default App;
