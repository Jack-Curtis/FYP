import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function Chart({ data }) {
  const [graphData, setGraphData] = useState({});

  const dataa = {
    labels: graphData.labels,
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: graphData.y,
      },
    ],
  };

  useEffect(() => {
    setGraphData(data);
  }, [data, graphData, dataa]);
  return (
    <div>
      <Line
        data={dataa}
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
