import React, { useState, useEffect, useRef } from "react";
import { StartStreaming, StopStreaming } from "./streamingButtons";
import { calibrate, splitData } from "../utils/utils";
import "../styles.css";
import Imu from "./imu";

export default function Page() {
  const [data, setData] = useState([]);
  const [imus, setimus] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showLogs, setShowLogs] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [imuScreen, setImuScreen] = useState(false);
  const inputVal = useRef(null);
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
      let [imuNum, modData] = splitData(result.data);
      d[imuNum]
        ? (d[imuNum] = [...d[imuNum], modData])
        : (d[imuNum] = [modData]);

      return d;
    });
  }

  function imuController(func, name) {
    if (func === "add") {
      setimus((items) => {
        let imu = { name: name };
        return [...items, imu];
      });
      setImuScreen(false);
      setInputValue("");
    } else if (func === "remove") {
      setimus((items) => {
        let result = items.filter((imu) => {
          return imu.name.toString() !== name.toString();
        });
        return result;
      });
    }
  }

  function ImuScreen() {
    function handleAddImu(e) {
      // inputVal.current.focus();
      console.log("hello", e);
      console.log(e.target.value);
      setInputValue(e.target.value);
    }
    return (
      // <div className="overlay-container">
      //   <div className="overlay"></div>
      //   <div className="overlay-contents">
      //
      <div>
        <div className="overlay"></div>
        <div className="overlay-container">
          <div className="overlay-contents">
            <h2>Add Sensor</h2>
            <div className="horizontal-container">
              <label>Enter sensor name:</label>
              <input
                placeholder="Sensor Name"
                ref={inputVal}
                // value={inputValue}
                onBlur={handleAddImu}
              ></input>
            </div>
            <button
              className="add-imu-btn"
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

      //   </div>
      // </div>
    );
  }

  return (
    <div>
      <div>{imuScreen ? <ImuScreen></ImuScreen> : null}</div>
      <div className="page">
        <div className="horizontal-container">
          <h1>IMU DATA CAPTURE</h1>
        </div>

        <div className="imuContainer">
          {imus.map((imu, index) => {
            console.log(data[index]);
            return (
              <div className="horizontal-container">
                <Imu
                  name={imu.name}
                  showLogs={showLogs}
                  showGraphs={false}
                  data={data[index]}
                  id={index}
                ></Imu>
              </div>
            );
          })}
        </div>
        <div className="horizontal-container">
          <button name="imu-add" onClick={() => setImuScreen(true)}>
            Add IMU
          </button>
        </div>
        {imuScreen ? null : (
          <div className="footer">
            <input
              type="checkbox"
              name="showLog"
              onChange={() => setShowLogs(() => !showLogs)}
            />
            <StartStreaming
              changeStreamState={() => setIsStreaming(true)}
            ></StartStreaming>
            <StopStreaming
              changeStreamState={() => setIsStreaming(false)}
            ></StopStreaming>
          </div>
        )}
      </div>
    </div>
  );
}
