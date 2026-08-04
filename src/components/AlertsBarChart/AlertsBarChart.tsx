'use client';

import { memo } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// BarChart: provides the overall chart container and coordinate system for the bars.
// Bar: draws each bar from the data array and can use a custom shape to assign colors per bar.
// CartesianGrid: adds the simple background grid lines.
// XAxis: draws the category labels along the bottom axis.
// YAxis: draws the numeric scale along the left axis.
// Tooltip: shows a small popup when the user hovers a bar.

type AlertsBarChartData = {
  line: string;
  count: number;
  color: string;
};

type AlertsBarChartProps = {
  data: AlertsBarChartData[];
};

export const AlertsBarChart = memo(({ data }: AlertsBarChartProps) => {
  const renderTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) {
      return null;
    }

    const point = payload[0].payload as AlertsBarChartData;

    return (
      <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: point.color }} />
          <span>{label}</span>
        </div>
        <p className="mt-1 text-sm text-slate-600">Active alerts: {point.count}</p>
      </div>
    );
  };

  const renderBarShape = (props: any) => {
    const { x, y, width, height, payload } = props;
    const color = payload?.color ?? '#3b82f6';

    return <rect x={x} y={y} width={width} height={height} rx={4} fill={color} />;
  };

  if (data.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500">
        All CTA transit lines are operating normally with no active alerts.
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="line" />
          <YAxis />
          <Tooltip content={renderTooltip} />
          <Bar dataKey="count" shape={renderBarShape} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
