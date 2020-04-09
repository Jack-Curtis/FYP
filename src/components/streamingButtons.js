import React from "react";
import { startStreaming, stopStreaming } from "../utils/utils";

export function StartStreaming() {
  return <button onClick={() => startStreaming(0)}>START STREAMING</button>;
}

export function StopStreaming() {
  return <button onClick={() => stopStreaming(0)}>STOP STREAMING</button>;
}
