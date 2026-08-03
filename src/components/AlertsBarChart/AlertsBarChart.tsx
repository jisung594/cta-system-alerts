import { 
  BarChart, 
  Bar, 
  CartesianGrid,
  ResponsiveContainer, 
  XAxis, 
  YAxis
} from 'recharts';

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
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="line" />
          <YAxis />
          <Bar dataKey="count" fill={(entry: { color: string }) => entry.color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
