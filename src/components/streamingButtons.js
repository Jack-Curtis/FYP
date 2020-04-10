import React from "react";
import { startStreaming, stopStreaming } from "../utils/utils";
import "../styles.css";

export function StartStreaming() {
  return (
    <button className="startStream" onClick={() => startStreaming(0)}>
      START STREAMING
    </button>
  );
}

export function StopStreaming() {
  return (
    <button className="stopStream" onClick={() => stopStreaming(0)}>
      STOP STREAMING
    </button>
  );
}
