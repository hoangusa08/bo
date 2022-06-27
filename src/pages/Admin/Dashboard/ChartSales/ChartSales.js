import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useGetChartSale from "hook/useGetChartSale";
Chart.register(...registerables);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Biểu đồ doanh thu"
    }
  }
};

const labels = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12"
];

export default function ChartSales() {
  const [sales, getChartSale] = useGetChartSale();
  useEffect(() => {
    getChartSale();
  }, []);
  return (
    <div>
      <Line
        options={options}
        data={{
          labels,
          datasets: [
            {
              label: "Doanh thu",
              data: sales || [
                10, 50, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120
              ],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)"
            }
          ]
        }}
      />
    </div>
  );
}
