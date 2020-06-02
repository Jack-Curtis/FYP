import React, { useState, useEffect } from "react";
import "../styles.css";

const List = ({ onListChange }) => {
  const [deviceList, setDeviceList] = useState(0);

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    let response = await fetch("http://localhost:3001/getports");
    if (response.status === 200) {
      let portList = await response.json();
      console.log(portList);
      setDeviceList(portList);
    } else {
      console.log("error");
    }
  }

  function handleSelectChange(event) {
    onListChange(event.target.value);
  }

  return (
    <select onChange={handleSelectChange}>
      <option key={1}> - </option>
      {deviceList.length
        ? deviceList.map((device) => {
            return <option key={device.path}>{device.path}</option>;
          })
        : null}
    </select>
  );
};

export default List;
