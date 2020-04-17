import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "../styles.css";

export default function Chart({ data }) {
  const [graphDataState, setGraphDataState] = useState({});

  const graphData = {
    labels: graphDataState.labels,
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderWidth: 1,
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: "rgb(255, 37, 186)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointRadius: 1,
        pointHitRadius: 5,
        data: graphDataState.y,
      },
    ],
  };

  useEffect(() => {
    setGraphDataState(data);
  }, [data, graphDataState, graphData]);
  return (
    <div className="graph">
      <Line
        data={graphData}
        options={{
          title: {
            display: "Chart",
            text: "IMU Data",
            fontSize: 25,
          },
        }}
        redraw={true}
      />
    </div>
  );
}
