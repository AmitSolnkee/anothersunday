import React, { useEffect, useState } from "react";

import data from "../data.json";

const Main = () => {
  const [selectedRadio, setSelectedRadio] = useState("");
  const [flatPayout, setflatPayout] = useState(null);
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [indPerValues, setIndPerValues] = useState([]);
  const [globalRadio, setGlobalRadio] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const radioHandler = (e) => {
    setSelectedRadio((prevSelectedRadio) => {
      const newSelectedRadio = e.target.value;
      return newSelectedRadio;
    });
  };

  const radioDataHandler = (item) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [item.id]: !prevCheckedItems[item.id],
    }));
    setCheckboxIsChecked((checkboxIsChecked) => !checkboxIsChecked);

    if (!selectedRadio) {
      alert("Select payout for all sub-products or payout per sub-products");
      return;
    }

    if (selectedRadio === "1") {
      console.log("inside1", selectedRadio);
      if (!flatPayout) {
        alert("Enter flat payout");
        return;
      }

      setGlobalRadio((prevGlobalRadio) => {
        const idFound = prevGlobalRadio.find((el) => el.id === item.id);

        if (!idFound) {
          return [...prevGlobalRadio, { id: item.id, percentage: flatPayout }];
        } else {
          return prevGlobalRadio.filter((el) => el.id !== item.id);
        }
      });
      console.log("above2", selectedRadio);
    } else {
      setflatPayout(0);
      console.log("indPerValues", indPerValues);

      setGlobalRadio((prevGlobalRadio) => {
        const updatedGlobalRadio = prevGlobalRadio.map((el) => {
          if (checkedItems[el.id]) {
            return { ...el, percentage: indPerValues[el.id] || 0 };
          }
          return el;
        });
        return updatedGlobalRadio;
      });
    }
  };

  useEffect(() => {
    console.log("global", globalRadio);
  }, [globalRadio, indPerValues, selectedRadio, checkedItems, flatPayout]);

  return (
    <div className="container-fluid p-5">
      <div className="mt-5">
        <i className="fa-solid fa-xmark me-5"></i>
        <span>Add Proposed products and payout</span>

        <div className="mt-4 mb-5py-2">
          <select className=" px-2 py-2 w-100">
            <option>One Andro Manager</option>
          </select>
        </div>
        <div className="mt-2">
          <p>Loan</p>
        </div>
      </div>
      <hr />

      <div>
        <input
          type="radio"
          id="radio1"
          name="options"
          value="1"
          onChange={radioHandler}
        />
        <label className="ms-4" htmlFor="radio1">
          Set flat payout % for all subproducts:
        </label>
        <br />

        <input
          type="radio"
          id="radio2"
          name="options"
          value="2"
          onChange={radioHandler}
        />
        <label className="ms-4" htmlFor="radio2">
          Set payout % per subproducts:
        </label>
      </div>

      <div className="mt-5 d-flex justify-content-between align-items-center">
        <div>
          <p
            className="fs-5 fw-bold"
            style={
              selectedRadio === "2"
                ? { display: "none" }
                : { display: "inline-block" }
            }
          >
            Enter flat payout
          </p>
          <p className="mt-4" style={{ color: "grey" }}>
            Sub Products
          </p>
        </div>
        <div className="text-end">
          <div
            style={
              selectedRadio === "2"
                ? { display: "none" }
                : { display: "inline-block" }
            }
          >
            {" "}
            <input
              type="number"
              style={{ width: "25%", height: "25%" }}
              onChange={(e) => setflatPayout(e.target.value)}
            />
            <span className="ms-2">%</span>
          </div>

          <p className="mt-4" style={{ color: "grey" }}>
            Pay Out %
          </p>
        </div>
      </div>

      {data.map((item) => {
        return (
          <div
            key={item.id}
            className="mt-3 d-flex justify-content-between align-items-center"
          >
            <div>
              <input
                type="checkbox"
                id={item.id}
                checked={checkedItems[item.id] || false}
                value={item.category_name}
                onChange={() => radioDataHandler(item)}
              />
              <label className="ms-4" htmlFor="radio2">
                {item.category_name}
              </label>
              <p className="fs-5 fw-normal"></p>
            </div>
            <div className="text-end">
              <input
                className="radio_for_arr"
                type="number"
                onChange={(e) => {
                  if (selectedRadio === "2" && checkedItems[item.id]) {
                    setIndPerValues((prevValues) => {
                      const updatedValues = [...prevValues];
                      const index = updatedValues.findIndex(
                        (el) => el.id === item.id
                      );

                      if (index !== -1) {
                        updatedValues[index] = {
                          id: item.id,
                          value: e.target.value,
                        };
                      } else {
                        // Add a new element
                        updatedValues.push({
                          id: item.id,
                          value: e.target.value,
                        });
                      }

                      return updatedValues;
                    });
                  }
                }}
                disabled={
                  selectedRadio === "1" ||
                  (selectedRadio === "2" && !checkedItems[item.id])
                }
                value={
                  selectedRadio === "2" && checkedItems[item.id]
                    ? indPerValues[item.id] || null
                    : selectedRadio === "1"
                    ? flatPayout
                    : null
                }
                style={{ width: "15%", height: "15%" }}
              />
              <span className="ms-2">%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
