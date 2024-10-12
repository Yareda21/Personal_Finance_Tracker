// charts.js
import React from "react";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie } from "recharts";

const BarChartComponent = ({ data }) => {
    return (
        <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="income" fill="#8884d8" />
            <Bar dataKey="expenses" fill="#82ca9d" />
        </BarChart>
    );
};

const PieChartComponent = ({ data }) => {
    return (
        <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" />
        </PieChart>
    );
};

export { BarChartComponent, PieChartComponent };
