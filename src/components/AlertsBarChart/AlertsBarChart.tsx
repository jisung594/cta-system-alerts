import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

// BarChart: provides the overall chart container and coordinate system for the bars.
// Bar: draws each bar from the data array.
// CartesianGrid: adds the simple background grid lines.
// XAxis: draws the category labels along the bottom axis.
// YAxis: draws the numeric scale along the left axis.

type AlertsBarChartProps = {
  data: Array<{ line: string; count: number }>;
};

export const AlertsBarChart = ({ data }: AlertsBarChartProps) => {
  return (
    <BarChart width={400} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="line" />
      <YAxis />
      <Bar dataKey="count" fill="#3b82f6" />
    </BarChart>
  );
};
