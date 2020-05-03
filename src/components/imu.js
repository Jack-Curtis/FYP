import React, { useState } from "react";
import Chart from "./imuGraph";
import List from "./list";
import { connectToImu, disconnectImu } from "../utils/utils";
import "../styles.css";

export default function Imu({ imuId, showLogs, data }) {
  const [selectedDevice, setSelectedDevice] = useState([]);

  function handleListChange(value) {
    setSelectedDevice(() => value);
  }

  return (
    <div className="vertical-container">
      <h3>IMU {imuId + 1}:</h3>
      <div className="horizontal-container">
        <List imuId={imuId} onListChange={handleListChange}></List>
        <button onClick={() => connectToImu(selectedDevice)}>Connect</button>
        <button onClick={() => disconnectImu(selectedDevice)}>
          Disconnect
        </button>
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
      {/* <Chart data={data}></Chart> */}
    </div>
  );
}
