'use client';

import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import type { LineAlertData } from '@/types/alerts';

type AlertsRadialChartData = {
  line: string;
  count: number;
  color: string;
};

type AlertsRadialChartProps = {
  data: AlertsRadialChartData[];
};

export function AlertsRadialChart({ data }: AlertsRadialChartProps) {
  // Filter out zero-count lines or sort by count to make the arcs render cleanly
  const activeData = data
    .filter((item) => item.count > 0)
    .map((item) => ({
      line: item.line,
      count: item.count,
      fill: item.color,
    }));
    
  const renderTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) {
      return null;
    }

    const point = payload[0].payload as AlertsRadialChartData;

    return (
      <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
        <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: point.fill }} />
          <span>{point.line} Line</span>
        </div>
        <p className="mt-1 text-sm text-slate-600">Active alerts: {point.count}</p>
      </div>
    );
  };

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          barSize={12}
          data={activeData}
          startAngle={180}
          endAngle={0} // Semi-circle gauge style
        >
          <RadialBar background dataKey="count" cornerRadius={6} />
          <Tooltip
            content={renderTooltip}
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              borderColor: '#334155', 
              borderRadius: '8px', 
              color: '#fff' 
            }}
          />
          {/* <Legend
            iconSize={12}
            layout="horizontal"
            verticalAlign="bottom"
            wrapperStyle={{ fontSize: '12px' }}
          /> */}
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}