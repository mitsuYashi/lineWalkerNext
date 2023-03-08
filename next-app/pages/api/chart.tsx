// import axios from "axios";
// import Plotly, { PlotData } from "plotly.js";

// async function createGraph() {
//   const res = await axios.get(`https://linewalker.onrender.com/user/steps`);
//   const steps: number[] = res.data.steps;

//   const avgSteps = Math.floor(steps.reduce((prev, curr) => prev + curr, 0) / 7);
//   const diffSteps = steps.map((num, index) =>
//     index != 0 ? num - steps[index - 1] : null
//   );

//   const weekDate = [];
//   const now = new Date();
//   const tmp = new Date(now.setDate(now.getDate() - 8));

//   for (let i = -7; i < 0; i++) {
//     tmp.setDate(tmp.getDate() + 1);
//     weekDate.push(`${tmp.getMonth() + 1}/${tmp.getDate()}`);
//   }

//   const stepsString = ["1週間の平均", "一昨日", "昨日", "一昨日と昨日の差"];
//   const twoDaysAgo = steps[5];
//   const oneDaysAgo = steps[6];
//   const dashbordSteps = [avgSteps, twoDaysAgo, oneDaysAgo, diffSteps[6]];

//   const trace1: Partial<PlotData> = {
//     x: weekDate,
//     y: steps,
//     type: "scatter",
//     name: "steps",
//     line: { color: "#82ca9d" },
//     yaxis: "y",
//   };

//   const trace2: Partial<PlotData> = {
//     x: weekDate,
//     y: diffSteps,
//     type: "scatter",
//     name: "diff",
//     line: { color: "#8884d8" },
//     yaxis: "y2",
//   };

//   const data: Plotly.Data[] = [trace1, trace2];

//   const layout: Partial<Plotly.Layout> = {
//     title: "Steps",
//     xaxis: {
//       title: "Date",
//     },
//     yaxis: {
//       title: "Steps",
//       titlefont: { color: "#82ca9d" },
//       tickfont: { color: "#82ca9d" },
//     },
//     yaxis2: {
//       title: "Difference",
//       titlefont: { color: "#8884d8" },
//       tickfont: { color: "#8884d8" },
//       overlaying: "y",
//       side: "right",
//     },
//   };

//   Plotly.newPlot("graph", data, layout);
// }

// createGraph();
