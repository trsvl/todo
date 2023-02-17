import React, { useEffect } from "react";
import "./List.scss";
import { ReactComponent as EditBtn } from "../../img/Edit.svg";
import { ReactComponent as DeleteBtn } from "../../img/Delete.svg";
export default function List({ listState, setListState, arrDate }) {
  useEffect(() => {
    const list = localStorage.getItem("list");
    if (list) setListState(JSON.parse(list));
  }, []);
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(listState));
  }, [listState]);

  const deleteList = (mainId, id, arrLength, title) => {
    if (arrLength === 1) {
      let newList = listState.filter((items) => items.id !== mainId);
      setListState(newList);
      arrDate.splice(arrDate.indexOf(title), 1);
    } else {
      let newList = listState.map((items) => {
        return { ...items, item: items.item.filter((obj) => obj.id !== id) };
      });
      setListState(newList);
    }
  };

  const editList = (mainId, id) => {
    let newList = listState.map((items) => {
      if (items.id === mainId) {
        items.item.map((item) => {
          if (item.id === id) {
            item.state === true ? (item.state = false) : (item.state = true);

            if (item.style.edit === "no-edit") {
              item.style.edit = "edit";
              item.style.checkbox = "test";
              item.checkbox = false;
            } else {
              item.style.edit = "no-edit";
            }
          }
        });
      }

      return items;
    });
    setListState(newList);
  };

  const changeState = (mainId, id) => {
    let newList = listState.map((items) => {
      if (items.id === mainId) {
        items.item.map((item) => {
          if (item.id === id) {
            if (item.checkbox === true) {
              item.style.checkbox = "test";
              item.checkbox = false;
            } else {
              item.style.checkbox = "test1";
              item.checkbox = true;
            }
            if (item.checkbox === true && item.style.edit === "edit") {
              item.style.edit = "no-edit";
              item.state = true;
              item.checkbox = true;
            }
          }
        });
      }
      return items;
    });
    setListState(newList);
  };

  return (
    <div id="all">
      {listState.map((items) => (
        <React.Fragment key={items.id}>
          <h2>{items.title}</h2>
          {items.item.map((item) => (
            <div id={item.style.edit} className="list" key={item.id}>
              <input
                className="checkbox"
                type="checkbox"
                checked={item.checkbox}
                onChange={() => changeState(items.id, item.id)}
              />
              <input
                className={`input-text ${item.style.checkbox}`}
                defaultValue={item.text}
                disabled={item.state}
              />
              <div>
                <EditBtn onClick={() => editList(items.id, item.id)} />
                <DeleteBtn
                  onClick={() =>
                    deleteList(
                      items.id,
                      item.id,
                      items.item.length,
                      items.title
                    )
                  }
                />
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
