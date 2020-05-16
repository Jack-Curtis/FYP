import React, { useState, useEffect } from "react";
import Chart from "./imuGraph";
import List from "./list";
import { connectToImu, disconnectImu } from "../utils/utils";
import "../styles.css";

export default function Imu({ name, showLogs, showGraphs, data, id }) {
  const [selectedDevice, setSelectedDevice] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  function handleListChange(value) {
    setSelectedDevice(() => value);
  }

  function changeConnectionStatus(status) {
    setIsConnected(status);
  }

  return (
    <div className="vertical-container">
      <h3>
        {name}, id = {id}
      </h3>
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

      {showLogs ? (
        <div className="log-container">
          <ul>
            {data.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {showGraphs ? <Chart data={data}></Chart> : null}
    </div>
  );
}
