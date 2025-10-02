import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const OrderChart = ({barChartData}) => {
    console.log(barChartData)
  return (
    <div>
      <BarChart width={730} height={250} data={barChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey='order' />
        <Tooltip />
        <Legend />
        <Bar dataKey="order" fill="#8884d8" />
        <Bar dataKey="revenue" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default OrderChart;
