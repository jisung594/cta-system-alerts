export type CTALine = 'Red' | 'Blue' | 'Brown' | 'Green' | 'Orange' | 'Purple' | 'Pink' | 'Yellow';
export type AlertSeverity = 'minor' | 'major' | 'critical';

export interface AffectedService {
  serviceType: 'L' | 'Bus';
  lineColor?: CTALine; // optional (only applicable for serviceType = 'L')
  routeName: string; // "Red Line" or "151 Sheridan"
  routeId: string; // "Green" or "66"
}

export interface CTAServiceAlert {
  id: string;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  severity: AlertSeverity;
  isPlanned: boolean; // true = planned work, false = active emergency/unplanned disruption
  impactedServices: AffectedService[];
  eventStart: string;
  eventEnd: string | null;
}

export interface LineAlertData {
  line: CTALine;
  count: number;
  color: string;
}

export interface CTAAlertsAPIResponse {
  summaries: LineAlertData[];
  alerts: CTAServiceAlert[];
}

// Transformer for raw CTA API alert objects -> `CTAServiceAlert`.
export function transformRawAlert(raw: any): CTAServiceAlert {
  const severityScore = Number(raw?.SeverityScore ?? raw?.Severity ?? 0);
  const severity: AlertSeverity =
    severityScore >= 10 ? 'critical' : severityScore >= 5 ? 'major' : 'minor';

  const CTA_COLOR_MAP: Record<string, CTALine> = {
    red: 'Red',
    blue: 'Blue',
    brn: 'Brown', brown: 'Brown',
    g: 'Green', green: 'Green',
    org: 'Orange', orange: 'Orange',
    p: 'Purple', purple: 'Purple',
    pnk: 'Pink', pink: 'Pink',
    y: 'Yellow', yel: 'Yellow', yellow: 'Yellow',
  };

  const rawServiceData = raw?.ImpactedService?.Service;
  const rawServices = Array.isArray(rawServiceData)
    ? rawServiceData
    : rawServiceData
    ? [rawServiceData]
    : [];

const impactedServices: AffectedService[] = rawServices.map((s: any) => {
  const isBus = s?.ServiceType === 'Bus';
  const serviceType: 'L' | 'Bus' = isBus ? 'Bus' : 'L';
  const rawId = String(s?.ServiceId || '').trim();
  const rawName = String(s?.ServiceName || '').trim();

  // L trains only
  const lineColor =
    rawId && CTA_COLOR_MAP[rawId.toLowerCase()]
      ? CTA_COLOR_MAP[rawId.toLowerCase()]
      : undefined;

  const routeId = rawId || rawName;

  return {
    serviceType,
    lineColor,
    routeName: rawName || 'Unknown',
    routeId,
  };
});

  return {
    id: String(raw?.AlertId ?? raw?.id ?? ''),
    headline: raw?.Headline || 'Transit Alert',
    shortDescription: raw?.ShortDescription || '',
    fullDescription:
      raw?.FullDescription?.['#cdata-section'] || raw?.ShortDescription || '',
    severity,
    isPlanned: raw?.MajorAlert === '0',
    impactedServices,
    eventStart: raw?.EventStart || '',
    eventEnd: raw?.EventEnd ?? null,
  };
}