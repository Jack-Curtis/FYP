import React from "react";
import { disconnectImu } from "../utils";

export default function DisconnectButton(props) {
  return (
    <button onClick={() => disconnectImu(props.devicePath)}>Disconnect</button>
  );
}
