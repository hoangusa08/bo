import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useGetChartSale from "hook/useGetChartSale";
import "./ChartSales.scss";
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
  const [thisYear, setThisYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  useEffect(() => {
    getChartSale(thisYear);
  }, [thisYear]);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < 4; i++) {
      temp.push(thisYear - i);
    }
    setYears(temp);
  }, []);

  return (
    <div className="chart-sales">
      <select
        value={thisYear}
        className="select"
        onChange={(e) => setThisYear(e.target.value)}
      >
        {years?.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
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
