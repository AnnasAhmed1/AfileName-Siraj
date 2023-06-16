import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { red } from "@mui/material/colors";

const BarChart = () => {
  // const chartRef = useRef(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartData: Array<object> = [
    { label: "AFILENAME" },
    { label: "AFILENAME" },
    { label: "AFILENAME" },
    { label: "AFILENAME" },
    { label: "AFILENAME" },
    // "backBlaze",
    // "Azure",
    // "Google",
    // "AWS",
  ];
  //   console.log(chartData.filter((v, i) => v.))
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef?.current?.getContext("2d");

      new Chart(ctx ? ctx : "", {
        type: "bar",
        data: {
          labels: ["AFILENAME", "backBlaze", "Azure", "Google", "AWS"],
          datasets: [
            {
              data: [1000, 8000, 44800, 56000, 53000],
              // label: "Applied",
              backgroundColor: [
                "#606060", // Red
                "#f24822", // Blue
                "#1890FF", // Yellow
                "#FFCD29", // Green
                "#272727", // Purple
                //   "rgba(255, 159, 64, 0.6)", // Orange
              ],
              borderWidth: 0,
              barThickness: 87,
              borderRadius: 6,
              // xAxisID:[0,0,0,0,0]
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              display: false,
              grid: {
                display: false, // Remove y-axis grid lines
              },
            },
            x: {
              grid: {
                display: false, // Remove x-axis grid lines
              },
              ticks: {
                font: {
                  size: 12,
                  weight: "bold",
                },
                color: "rgba(0, 0, 0, 0.6)", // Customize scale label color
              },
              // @ts-ignore
              drawBorder: false, // Remove line from x-axis scale at the bottom
            },
          },
          plugins: {
            tooltip: {
              enabled: false, // Disable tooltip
            },

            legend: {
              display: false, // Hide legend
            },
          },
        },
      });
    }
  }, []);

  return (
    <div
      className="
    pt-8
    "
    >
      <canvas width={700} height={400} ref={chartRef} id="myChart"></canvas>
    </div>
  );
};

export default BarChart;
