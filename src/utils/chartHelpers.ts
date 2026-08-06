import type { CTAServiceAlert, CTALine, LineAlertData } from '../types/alerts';

// Hex palette mapped to CTA line colors
export const CTA_LINE_COLORS: Record<CTALine, string> = {
  Red: '#c0392b',
  Blue: '#2980b9',
  Brown: '#795548',
  Green: '#27ae60',
  Orange: '#d35400',
  Purple: '#8e44ad',
  Pink: '#e91e63',
  Yellow: '#f1c40f',
};

// Aggregates service alerts by transit line color for Recharts ingestion
export const aggregateAlertsByLine = (
  alerts: CTAServiceAlert[],
  selectedLines: CTALine[] = []
): LineAlertData[] => {
  const counts: Record<CTALine, number> = {
    Red: 0,
    Blue: 0,
    Brown: 0,
    Green: 0,
    Orange: 0,
    Purple: 0,
    Pink: 0,
    Yellow: 0,
  };

  alerts.forEach((alert) => {
    const impactedLines = new Set<CTALine>();

    alert.impactedServices.forEach((service) => {
      if (service.lineColor) {
        impactedLines.add(service.lineColor);
      };
    });

    impactedLines.forEach((line) => {
      counts[line] += 1;
    });
  });

  return (Object.keys(counts) as CTALine[])
    .map((line) => ({
      line: line,
      count: counts[line],
      color: CTA_LINE_COLORS[line],
    }))
    .filter((line) => {
      const hasAlerts = line.count > 0;
      const matchesFilter = selectedLines.length === 0 || selectedLines.includes(line.line);
      
      return hasAlerts && matchesFilter;
    });
}