import React, { useState } from "react";
import "../styles.css";

const AddDeviceModal = ({ imuController }) => {
  const [inputValue, setInputValue] = useState("");

  function handleAddDevice(e) {
    setInputValue(e.target.value);
  }

  return (
    <div>
      <div className="overlay"></div>
      <div className="overlay-container">
        <div className="overlay-contents">
          <h2>Add Sensor</h2>
          <div className="horizontal-container">
            <label>Enter sensor name:</label>
            <input placeholder="Sensor Name" onBlur={handleAddDevice}></input>
          </div>
          <button
            className="add-Device-btn"
            name="imu-add"
            onMouseUp={(e) => {
              imuController("add", inputValue);
            }}
          >
            +
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default AddDeviceModal;
