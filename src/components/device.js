import React, { useState, useEffect } from "react";
import Chart from "./imuGraph";
import List from "./list";
import { connectToImu, disconnectImu } from "../utils/utils";
import "../styles.css";

const Device = ({ name, showLogs, isStreaming, data, dataType }) => {
  const [selectedDevice, setSelectedDevice] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [graphDataState, setGraphDataState] = useState([]);

  // Not fully functional
  function filterData() {
    if (isStreaming) {
      let dataRow = data;
      dataRow = dataRow.slice(-1).pop();
      dataRow = dataRow.split(" ");
      for (let i = 0; i < dataRow.length; i++) {
        if (dataRow[i].includes(dataType)) {
          let measurementData = dataRow[i];
          for (let j = 0; j < measurementData.length; j++) {
            let dataVals = measurementData.split("=")[1];
            let finalVals = dataVals.split(",");
            return finalVals;
          }
        }
      }
    }
  }

  function handleListChange(value) {
    setSelectedDevice(() => value);
  }

  function changeConnectionStatus(status) {
    setIsConnected(status);
  }

  return (
    <div className="vertical-container">
      <h3>{name}</h3>
      <div className="horizontal-container">
        <List imuname={name} onListChange={handleListChange}></List>

        {isConnected ? (
          <button
            onClick={() =>
              disconnectImu(selectedDevice, changeConnectionStatus)
            }
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={() => connectToImu(selectedDevice, changeConnectionStatus)}
          >
            Connect
          </button>
        )}
      </div>
      <p>{graphDataState}</p>
      {showLogs ? (
        <div className="log-container">
          <ul>
            {data ? data.map((item, i) => <li key={i}>{item}</li>) : null}
          </ul>
        </div>
      ) : null}
      {/* {typeof graphDataState !== "undefined" ? (
        <Chart getData={() => filterData()}></Chart>
      ) : null} */}
    </div>
  );
};

export default Device;
