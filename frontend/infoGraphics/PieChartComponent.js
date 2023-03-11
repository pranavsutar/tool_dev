import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Geeksforgeeks', students: 400 },
  { name: 'Technical scripter', students: 700 },
  { name: 'Geek-i-knack', students: 200 },
  { name: 'Geek-o-mania', students: 1000 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = () => {
  return (
    <PieChart width={700} height={500}>
      <Pie
        data={data}
        dataKey="students"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={200}
        fill="#8884d8"
        labelLine={false}
        label={({ name, students }) => `${name} ${students}`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PieChartComponent;
