import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "../styles.css";

export default function Chart({ getData }) {
  const [graphDataState, setGraphDataState] = useState([]);
  const [graphLabels, setGraphLabels] = useState([]);

  // useEffect(() => {

  //   // setInterval(() => {
  //   //   setGraphDataState((d) => [...d, Math.floor(Math.random() * 10)]);
  //   // }, 1000);
  //   //   let y = [];
  //   //   for (let i = 0; i < data.length; i++) {
  //   //     y.push(i);
  //   //   }
  //   //   let entry = { labels: data, y: y };
  //   //   setGraphDataState(entry);
  //   // // }, [data]);
  //   // useEffect(() => {
  //   //   setGraphDataState((d) => [...d, data]);
  // }, [data]);

  const graphData = {
    labels: graphLabels,
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
        data: graphDataState,
      },
    ],
  };

  useEffect(() => {
    setGraphDataState((d) => getData());
    setGraphLabels((d) => [...d, d.length]);
  });

  return (
    <div className="graph">
      <p>{graphDataState}</p>
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
