// import { JSX } from "@emotion/react/jsx-runtime";
// import axios from "axios";
// import ReactDOM from "react-dom";
// import {
//   LineChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Line,
//   Tooltip,
//   Legend,
// } from "recharts";

// async function getSteps() {
//   let steps: number[] = [];
//   const step = await axios
//     .get(
//       `https://linewalker.onrender.com/user/steps?code=1//0gLxEY42zih92CgYIARAAGBASNwF-L9Ir_sdMXWVUfcfAx9fwXUK20xs3oOt9yck5Pr06ZmyKsJ79kRqcWsNuqwhM8rbYlgWIGME`
//     )
//     .then((data) => {
//       console.log(data.data);
//       steps = data.data.steps as number[];
//     });

//   const avgSteps = Math.floor(steps.reduce((prev, curr) => prev + curr, 0) / 7);
//   const diffSteps = steps.map((num, index) =>
//     index != 0 ? num - steps[index - 1] : null
//   );

//   const weekDate: string[] = [];
//   const now = new Date();
//   const tmp = new Date(now.setDate(now.getDate() - 7));

//   for (let i = -7; i < 0; i++) {
//     tmp.setDate(tmp.getDate() + 1);
//     weekDate.push(`${tmp.getMonth() + 1}/${tmp.getDate()}`);
//   }

//   const data = [
//     {
//       name: weekDate[0],
//       steps: steps[0],
//       diff: diffSteps[0],
//     },
//     {
//       name: weekDate[1],
//       steps: steps[1],
//       diff: diffSteps[1],
//     },
//     {
//       name: weekDate[2],
//       steps: steps[2],
//       diff: diffSteps[2],
//     },
//     {
//       name: weekDate[3],
//       steps: steps[3],
//       diff: diffSteps[3],
//     },
//     {
//       name: weekDate[4],
//       steps: steps[4],
//       diff: diffSteps[4],
//     },
//     {
//       name: weekDate[5],
//       steps: steps[5],
//       diff: diffSteps[5],
//     },
//     {
//       name: weekDate[6],
//       steps: steps[6],
//       diff: diffSteps[6],
//     },
//   ];
//   return data;
// }

// export async function Chart() {
//   const data = await getSteps();
//   return (
//     <LineChart
//       width={1100}
//       height={300}
//       data={data}
//       margin={{
//         top: 5,
//         right: 30,
//         left: 20,
//         bottom: 5,
//       }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
//       <YAxis yAxisId="1" orientation="left" />
//       <YAxis yAxisId="2" orientation="right" />
//       <Line type="monotone" dataKey="steps" stroke="#82ca9d" yAxisId="1" />
//       <Tooltip />
//       <Legend verticalAlign="top" height={30} iconSize={20} />
//       <Line type="monotone" dataKey="diff" stroke="#8884d8" yAxisId="2" />
//     </LineChart>
//   );
// }
const plotly = require("plotly")("mitsuYashi", "mKy1WntswXXUA4vYwy59");
const axios = require("axios");

async function getSteps() {
  let steps: number[] = [];
  const response = await axios.get(
    "https://linewalker.onrender.com/user/steps?code=1//0gLxEY42zih92CgYIARAAGBASNwF-L9Ir_sdMXWVUfcfAx9fwXUK20xs3oOt9yck5Pr06ZmyKsJ79kRqcWsNuqwhM8rbYlgWIGME"
  );
  steps = response.data.steps;

  const avgSteps = Math.floor(steps.reduce((prev, curr) => prev + curr, 0) / 7);
  const diffSteps = steps.map((num, index) =>
    index !== 0 ? num - steps[index - 1] : null
  );

  const weekDate = [];
  const now = new Date();
  const tmp = new Date(now.setDate(now.getDate() - 7));

  for (let i = -7; i < 0; i++) {
    tmp.setDate(tmp.getDate() + 1);
    weekDate.push(`${tmp.getMonth() + 1}/${tmp.getDate()}`);
  }

  const data = [
    {
      x: weekDate,
      y: steps,
      type: "scatter",
      mode: "lines",
      name: "Steps",
      yaxis: "y",
      line: { color: "#82ca9d" },
    },
    {
      x: weekDate,
      y: diffSteps,
      type: "scatter",
      mode: "lines",
      name: "Diff",
      yaxis: "y2",
      line: { color: "#8884d8" },
    },
  ];
  return data;
}

async function plotChart() {
  const data = await getSteps();
  const layout = {
    width: 1100,
    height: 300,
    margin: {
      l: 50,
      r: 30,
      b: 50,
      t: 10,
      pad: 4,
    },
    xaxis: {
      tickangle: -45,
      tickfont: {
        size: 10,
      },
      title: "Date",
    },
    yaxis: {
      title: "Steps",
    },
    yaxis2: {
      title: "Diff",
      overlaying: "y",
      side: "right",
    },
  };
  const figure = { data, layout };
  plotly.image(
    figure,
    { format: "png", width: 1100, height: 300 },
    function (err: any, imageData: any) {
      if (err) console.log(err);
      else console.log(`<img src="${imageData}" alt="steps-chart"/>`);
    }
  );
}

plotChart();
