import type { LineAlertData } from '../../types/alerts';

interface AlertsBarChartProps {
  data: LineAlertData[];
}

export const AlertsBarChart = ({ data }: AlertsBarChartProps) => {
  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-400">
        No active alerts for selected filters
      </div>
    );
  } 

  return (
    <div>
      placeholder for bar chart
    </div>
  );
}