import React, { useState, useEffect } from "react";
import Chart from "./components/chart";
import List from "./components/list";
import { calibrate } from "./utils";
import ConnectButton from "./components/connectButton";
import DisconnectButton from "./components/disconnectButton";

export default function Page() {
  const [selectedDevices, setSelectedDevices] = useState(["-", "-", "-", "-"]);
  const [data, setData] = useState([]);
  var socket = [];
  var count = 0;

  function openSocket() {
    // console.log("Socket open");
    socket.send("Connection established");
  }

  function showData(result) {
    console.log("FROM SOCKET", result.data);

    setData((d) => {
      var newValue = result.data;

      if (newValue.includes("Acceleration")) {
        count = count + 1;
        var accelerationData = [
          ...d,
          { x: count, y: newValue.replace("Acceleration", "") },
        ];
        return accelerationData;
      } else {
        return [];
      }
    });
  }

  useEffect(() => {
    socket = [];
    socket = new WebSocket("ws://localhost:8080");
    socket.onopen = openSocket;
    socket.onmessage = showData;
  }, []);

  function IMU(imuId) {
    function handleListChange(value) {
      var state = selectedDevices;
      state[imuId] = value;
      setSelectedDevices(() => state);
    }

    return (
      <div>
        <h3>IMU {imuId + 1}:</h3>
        {<List imuId={imuId} onListChange={handleListChange}></List>}

        {/* TODO: */}
        {/* Change the connect button so on click it fetches the path, change for disconnect too */}
        <ConnectButton devicePath={selectedDevices[imuId]}></ConnectButton>
        <DisconnectButton
          devicePath={selectedDevices[imuId]}
        ></DisconnectButton>
      </div>
    );
  }

  function renderChart() {
    return <Chart data={data}></Chart>;
  }

  return (
    <div>
      <h1>List of devices:</h1>
      {IMU(0)}
      {/* {IMU2(1)} */}
      <button onClick={() => calibrate()}>CALIBRATE IMUs</button>
      {/* TODO:
      Give these buttons their own components, or do in the same file? */}
      {/* <button onClick={() => startStreaming(0)}>START STREAMING</button>
      <button onClick={() => stopStreaming(0)}>STOP STREAMING</button> */}
      {/* {renderChart()} */}
      <Chart data={data}></Chart>;
    </div>
  );
}
