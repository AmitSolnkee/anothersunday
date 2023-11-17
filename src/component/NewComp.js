import React, { useEffect, useState } from "react";

import data from "../data.json";

const NewComp = () => {
  const [selectedRadio, setSelectedRadio] = useState("");
  const [payoutAll, setPayoutAll] = useState("");
  const [payoutPer, setPayoutPer] = useState("");
  const [globalArr, setGlobalArr] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [currentItem, setCurrentItem] = useState(null);

  //   Handling Radio
  const selectRadioHandle = (e) => {
    setSelectedRadio((prevselectedRadio) => e.target.value);
  };

  //   Handling input change when radio is 1
  const payoutAllHandler = (item) => {
    // setCurrentItem(item);
    if (selectedRadio === "") {
      alert("Kindly select 1 radio button of 2");
      return;
    }
    if (payoutAll === "") {
      alert("Enter Payout");
      return;
    }
    // handling checkbox state
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [item.id]: !prevCheckedItems[item.id],
    }));

    setGlobalArr((prevGlobalArr) => {
      const findIdIndex = prevGlobalArr.findIndex((el) => el.id === item.id);

      if (findIdIndex === -1) {
        return [...prevGlobalArr, { id: item.id, percentage: payoutAll }];
      } else {
        const newArr = [
          ...prevGlobalArr.slice(0, findIdIndex),
          ...prevGlobalArr.slice(findIdIndex + 1),
        ];
        return newArr;
      }
    });
  };

  //   Handling input change when radio is 1
  const payoutPerHandler = (item) => {
    if (selectedRadio === "") {
      alert("Kindly select 1 radio button of 2");
      return;
    }

    // handling checkbox state
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [item.id]: !prevCheckedItems[item.id],
    }));

    setGlobalArr((prevGlobalArr) => {
      const findIdIndex = prevGlobalArr.findIndex((el) => el.id === item.id);

      if (findIdIndex === -1) {
        return [
          ...prevGlobalArr,
          { id: item.id, percentage: payoutPer[item.id] },
        ];
      } else {
        const newArr = [
          ...prevGlobalArr.slice(0, findIdIndex),
          ...prevGlobalArr.slice(findIdIndex + 1),
        ];
        return newArr;
      }
    });
    setCurrentItem(item);
  };

  useEffect(() => {
    if (selectedRadio === "2") {
      setGlobalArr((prevGlobalArr) => {
        const keysArray = Object.keys(payoutPer);
        console.log("keysArray", keysArray);
        const findIdIndex = prevGlobalArr.findIndex(
          (el) => el.id === currentItem.id
        );

        if (findIdIndex === -1) {
          return [
            ...prevGlobalArr,
            { id: currentItem.id, percentage: payoutPer[currentItem.id] },
          ];
        } else {
          const newArr = [
            ...prevGlobalArr.slice(0, findIdIndex),
            ...prevGlobalArr.slice(findIdIndex + 1),
          ];
          return newArr;
        }
      });
    }
  }, [payoutPer]);

  useEffect(() => {
    console.log(globalArr);
  }, [globalArr, currentItem, payoutPer]);

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
          onChange={selectRadioHandle}
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
          onChange={selectRadioHandle}
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
              onChange={(e) => setPayoutAll(e.target.value)}
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
                value={item.category_name}
                checked={checkedItems[item.id] || false}
                onChange={() =>
                  selectedRadio === "1"
                    ? payoutAllHandler(item)
                    : selectedRadio === "2"
                    ? payoutPerHandler(item)
                    : alert("Select radio")
                }
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
                disabled={
                  selectedRadio === "1" ||
                  selectedRadio !== "2" ||
                  !checkedItems[item.id]
                }
                onChange={(e) => {
                  if (selectedRadio === "2" && checkedItems[item.id]) {
                    setPayoutPer((prevPayoutPer) => {
                      const updatedPayoutPer = {
                        ...prevPayoutPer,
                        [item.id]: e.target.value,
                      };

                      //   payoutPerHandler(item);
                      return updatedPayoutPer;
                    });
                  } else {
                    setPayoutAll(e.target.value);
                  }
                }}
                value={
                  selectedRadio === "1" ? payoutAll : payoutPer[item.id] || ""
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

export default NewComp;
// setPayoutPer((prevPayoutPer) => {
//     const updatedPayoutPer = {
//       ...prevPayoutPer,
//       [item.id]: e.target.value,
//     };
//     secondMod(item);
//     payoutPerHandler(item)
//     return updatedPayoutPer;
//   });
