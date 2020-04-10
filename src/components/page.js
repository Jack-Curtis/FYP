import React, { useState, useEffect } from "react";
import Chart from "./imuGraph";
import List from "./list";
import { StartStreaming, StopStreaming } from "./streamingButtons";
import { calibrate, connectToImu, disconnectImu } from "../utils/utils";
import "../styles.css";

export default function Page() {
  const [selectedDevices, setSelectedDevices] = useState(["-", "-", "-", "-"]);
  const [data, setData] = useState([]);

  var socket = [];
  var count = 0;
  var xData = [];
  var yData = [];

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
      var newValue = result.data;

      if (newValue.includes("Acceleration")) {
        yData.push(newValue.replace("Acceleration", ""));

        count = count + 1;
        xData.push(count);
        var accelerationData = { labels: xData, y: yData };
        return accelerationData;
      } else {
        return [];
      }
    });
  }

  function IMU(imuId) {
    function handleListChange(value) {
      var state = selectedDevices;
      state[imuId] = value;
      setSelectedDevices(() => state);
    }

    return (
      <div>
        <h3>IMU {imuId + 1}:</h3>
        <div className="container">
          {<List imuId={imuId} onListChange={handleListChange}></List>}
          <button onClick={() => connectToImu(selectedDevices[imuId])}>
            Connect
          </button>
          <button onClick={() => disconnectImu(selectedDevices[imuId])}>
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>List of devices:</h1>
      {IMU(0)}
      <div className="container">
        <button onClick={() => calibrate()}>CALIBRATE IMUs</button>
        <StartStreaming></StartStreaming>
        <StopStreaming></StopStreaming>
      </div>
      <Chart data={data}></Chart>
    </div>
  );
}
