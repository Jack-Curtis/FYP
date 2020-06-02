import React, { useState, useEffect } from "react";
import { StartStreaming, StopStreaming } from "./streamingButtons";
import { splitData } from "../utils/utils";
import "../styles.css";
import Device from "./device";
import AddDeviceModal from "./addDeviceModal";
import Chart from "./imuGraph";

const Page = () => {
  const [data, setData] = useState([]);
  const [devices, setDevices] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [dataType, setDataType] = useState("Accelerometer");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);

  var socket = [];
  var dataa = [];

  useEffect(() => {
    socket = new WebSocket("ws://localhost:8080");
    socket.onopen = openSocket;
    socket.onmessage = showData;
  }, []);

  function openSocket() {
    socket.send("Connection established");
  }

  function showData(result) {
    console.log(result.data);
    setData((d) => {
      let [deviceNum, modData] = splitData(result.data);
      var newData = [];
      for (let i = 0; i < d.length; i++) {
        let entry = d[i];
        newData[i] = entry;
      }

      if (typeof d[deviceNum] === "undefined") {
        newData[deviceNum] = [modData];
      } else {
        let entry = d[deviceNum];
        entry.push(modData);
        newData[deviceNum] = entry;
      }

      return newData;
    });
  }

  function imuController(func, name) {
    if (func === "add") {
      setDevices((items) => {
        let device = { name: name };
        return [...items, device];
      });
      setShowAddDeviceModal(false);
    } else if (func === "remove") {
      setDevices((items) => {
        let result = items.filter((device) => {
          return device.name.toString() !== name.toString();
        });
        return result;
      });
    }
  }

  return (
    <div className="Page">
      <div>
        {showAddDeviceModal ? (
          <AddDeviceModal imuController={imuController}></AddDeviceModal>
        ) : null}
      </div>
      <div>
        <div className="horizontal-container">
          <h1>IMU DATA CAPTURE</h1>
        </div>
        <div className="device-container">
          {devices.map((device, index) => {
            return (
              <div className="individual-device-container" key={index}>
                <Device
                  name={device.name}
                  showLogs={showLogs}
                  isStreaming={isStreaming}
                  showGraphs={true}
                  data={data[index]}
                  id={index}
                  // key={data[index] ? data[index].length : index}
                  dataType={dataType}
                ></Device>
              </div>
            );
          })}
        </div>
        <div className="horizontal-container">
          <button name="imu-add" onClick={() => setShowAddDeviceModal(true)}>
            Add IMU
          </button>
        </div>
        {showAddDeviceModal ? null : (
          <div className="footer">
            <div className="vertical-container">
              <div className="horizontal-container">
                <label>Show logs</label>
                <input
                  type="checkbox"
                  name="showLog"
                  id="showLog"
                  onChange={() => setShowLogs(() => !showLogs)}
                />
                <label>Show graphs</label>
                <input
                  type="checkbox"
                  name="showLog"
                  id="showLog"
                  // onChange={() => setShowLogs(() => !showLogs)}
                />

                <select
                  className="data-select"
                  onChange={(e) => setDataType(e.target.value)}
                >
                  <option key={1}> Accelerometer </option>
                  <option key={2}> Gyroscope </option>
                  <option key={3}> Magnetometer </option>
                </select>
              </div>

              <div className="horizontal-container">
                {isStreaming ? (
                  <StopStreaming
                    changeStreamState={() => setIsStreaming(false)}
                  ></StopStreaming>
                ) : (
                  <StartStreaming
                    disabled={!devices.length}
                    changeStreamState={() => setIsStreaming(true)}
                  ></StartStreaming>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
