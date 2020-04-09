import React, { useState, useEffect } from "react";

export default function List({ onListChange }) {
  const [deviceList, setDeviceList] = useState(0);

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    let response = await fetch("http://localhost:3001/init");
    if (response.status === 200) {
      let portList = await response.json();
      setDeviceList(portList);
      console.log(portList);
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
}
