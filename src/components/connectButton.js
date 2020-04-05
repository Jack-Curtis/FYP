import React from "react";
import { connectToImu } from "../utils";

export default function ConnectButton(props) {
  return (
    <button onClick={() => connectToImu(props.devicePath)}>Connect</button>
  );
}
