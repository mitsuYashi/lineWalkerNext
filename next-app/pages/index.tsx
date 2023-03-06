import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import ResponsiveAppBar from "components/Appbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppBar from "components/Appbar";

export default function Home() {
  const [steps, setSteps] = useState([0]);
  const router = useRouter();

  const getSteps = async () => {
    const code = sessionStorage.getItem("refresh_token");
    const step = await axios
      .get(`https://linewalker.onrender.com/user/steps?code=${code}`)
      .then((data) => {
        console.log(data.data);
        setSteps(data.data.steps as number[]);
      });
  };

  useEffect(() => {
    getSteps();
  }, []);

  const avgSteps = Math.floor(steps.reduce((prev, curr) => prev + curr, 0) / 7);
  const diffSteps = steps.map((num, index) =>
    index != 0 ? num - steps[index - 1] : null
  );

  const weekDate: string[] = [];
  const now = new Date();
  const tmp = new Date(now.setDate(now.getDate() - 7));

  for (let i = -7; i < 0; i++) {
    tmp.setDate(tmp.getDate() + 1);
    weekDate.push(`${tmp.getMonth() + 1}/${tmp.getDate()}`);
  }

  const data = [
    { name: weekDate[0], steps: steps[0], diff: diffSteps[0] },
    { name: weekDate[1], steps: steps[1], diff: diffSteps[1] },
    { name: weekDate[2], steps: steps[2], diff: diffSteps[2] },
    { name: weekDate[3], steps: steps[3], diff: diffSteps[3] },
    { name: weekDate[4], steps: steps[4], diff: diffSteps[4] },
    { name: weekDate[5], steps: steps[5], diff: diffSteps[5] },
    { name: weekDate[6], steps: steps[6], diff: diffSteps[6] },
  ];

  const stepsString = ["1週間の平均", "一昨日", "昨日", "一昨日と昨日の差"];
  const twoDaysAgo = data[5].steps;
  const oneDaysAgo = steps[6];
  const dashbordSteps = [avgSteps, twoDaysAgo, oneDaysAgo, diffSteps[6]];

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient( #d8ffe1, #ffd4ba)",
        padding: "20px 0",
      }}
    >
      <div style={{ width: "80%", margin: "0px auto" }}>
        <AppBar />
        <h2>Dashbord</h2>
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 20 }}
        >
          {stepsString.map((str, index) => (
            <div
              style={{
                width: "90%",
                margin: "20px 0",
                padding: "10px 20px",
                backgroundColor: "#fff",
                borderRadius: "10px",
              }}
              key={index}
            >
              <p style={{ fontSize: "1em" }}>{str}</p>
              <p style={{ fontSize: "1.7rem" }}>
                {Math.floor(dashbordSteps[index] as number).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
            borderRadius: "10px",
            // margin: "10px",
            padding: "20px 10px",
          }}
        >
          <LineChart
            width={1100}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis yAxisId="1" orientation="left" />
            <YAxis yAxisId="2" orientation="right" />
            <Line
              type="monotone"
              dataKey="steps"
              stroke="#82ca9d"
              yAxisId="1"
            />
            <Tooltip />
            <Legend verticalAlign="top" height={30} iconSize={20} />
            <Line type="monotone" dataKey="diff" stroke="#8884d8" yAxisId="2" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}
