import React from "react";
import { Line, LineChart, XAxis, YAxis } from "recharts";

export default function Chart({ data }) {
  // console.log("from other function", data);

  return (
    // <p>{data}</p>
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="x" />
      <YAxis type="number" domain={["dataMin", "dataMax"]} />
      <Line type="monotone" dataKey="y" stroke="#8884d8" />
      {/* <Line dataKey="value" /> */}
    </LineChart>
  );
}
