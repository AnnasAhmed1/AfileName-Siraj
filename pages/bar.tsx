import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

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

      Chart.register(ChartDataLabels);
      const newChart = new Chart(ctx ? ctx : "", {
        plugins: [ChartDataLabels],
        type: "bar",

        data: {
          labels: ["AFILENAME", "backBlaze", "Azure", "Google", "AWS"],
          datasets: [
            {
              // maxBarThickness: 900,
              // barThickness: 85,
              minBarLength: 40,
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
              // barThickness: 87,
              borderRadius: 6,
              // xAxisID:[0,0,0,0,0]
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            // Configure the plugin options
            // Configure the plugin options
            datalabels: {
              anchor: "end", // Position the labels at the end of the bars
              align: "end",
              color: "rgba(0, 0, 0, 1)",
              // Customize label color
              font: {
                size: 14,
                weight: "bold",
                family: "Manrope",
              },
              formatter: function (value) {
                // Format the label as desired
                return "$" + value.toString(); // Display the value as a string
              },
            },
            tooltip: {
              enabled: false,
              // Disable tooltip
            },

            legend: {
              display: false, // Hide legend
            },
          },
          // maintainAspectRatio:false,
          scales: {
            // myScale: {
            //   position: 'right', // `axis` is determined by the position as `'y'`
            // },
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
        },
      });
    }
  }, []);

  return (
    <div
      className="
    mt-8
    w-[65%]
    mx-auto/
    md:w-full
    sm:w-full
    h-full
    "
    >
      <canvas
        width={"750px"}
        height={"700px"}
        ref={chartRef}
        id="myChart"
      ></canvas>
    </div>
  );
};

export default BarChart;
