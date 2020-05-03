import React, { useState, useEffect } from "react";
import { StartStreaming, StopStreaming } from "./streamingButtons";
import { calibrate } from "../utils/utils";
import "../styles.css";
import Imu from "./imu";

export default function Page() {
  // const [selectedDevices, setSelectedDevices] = useState(["-", "-", "-", "-"]);
  const [data, setData] = useState([]);
  const [imuCount, setimuCount] = useState(1);
  const [showLogs, setShowLogs] = useState(false);

  var socket = [];

  useEffect(() => {
    socket = new WebSocket("ws://localhost:8080");
    socket.onopen = openSocket;
    socket.onmessage = showData;
  }, []);

  function openSocket() {
    socket.send("Connection established");
  }

  function showData(result) {
    console.log("FROM SOCKET", result.data);

    setData((d) => {
      return [...d, result.data];
    });
  }

  function renderImus() {
    let imus = [];
    for (let num = 0; num < imuCount; num++) {
      imus.push(
        <div className="horizontal-container">
          <Imu imuId={num} showLogs={showLogs} data={data}></Imu>
          <button
            className="remove-imu"
            onClick={() => {
              delete imus[num];
            }}
          >
            X
          </button>
        </div>
      );
    }
    return imus;
  }

  return (
    <div className="page">
      <div className="horizontal-container">
        <h1>IMU DATA CAPTURE</h1>
      </div>
      <div className="imuContainer">{renderImus()}</div>
      <button onClick={() => setimuCount(() => imuCount + 1)}>Add IMU</button>
      <div className="footer">
        {/* <button onClick={() => calibrate()}>CALIBRATE IMUs</button> */}
        <input
          type="checkbox"
          name="showLog"
          onChange={() => setShowLogs(() => !showLogs)}
        />
        <StartStreaming></StartStreaming>
        <StopStreaming></StopStreaming>
      </div>
    </div>
  );
}
