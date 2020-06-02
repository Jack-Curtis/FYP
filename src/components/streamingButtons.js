import React from "react";
import { startStreaming, stopStreaming } from "../utils/utils";
import "../styles.css";

export function StartStreaming({ disabled, changeStreamState }) {
  return (
    <button
      className="startStream"
      disabled={disabled}
      onClick={() => {
        changeStreamState();
        startStreaming(0);
      }}
    >
      START STREAMING
    </button>
  );
}

export function StopStreaming({ changeStreamState }) {
  return (
    <button
      className="stopStream"
      onClick={() => {
        changeStreamState();
        stopStreaming(0);
      }}
    >
      STOP STREAMING
    </button>
  );
}
