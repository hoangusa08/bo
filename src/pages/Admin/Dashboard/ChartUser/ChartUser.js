import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./ChartUser.scss";
import useGetChartUser from "hook/useGetChartUser";
Chart.register(...registerables);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Biểu đồ khách hàng"
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
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12"
];
export default function ChartUser() {
  const [users, getChartUser] = useGetChartUser();
  const [data, setData] = useState({
    customers: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
    providers: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
  });

  useEffect(() => {
    getChartUser();
  }, []);

  useEffect(() => {
    if (users) setData({ ...users });
  }, [users]);

  return (
    <div className="chart-user">
      <Bar
        options={options}
        data={{
          labels,
          datasets: [
            {
              label: " Khách hàng",
              data: data?.customers,
              backgroundColor: "rgba(255, 99, 132, 0.5)"
            },
            {
              label: " Nhà cung cấp",
              data: data?.providers,
              backgroundColor: "rgba(53, 162, 235, 0.5)"
            }
          ]
        }}
      />
    </div>
  );
}
