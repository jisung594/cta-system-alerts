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

  const impactedServices: AffectedService[] = Array.isArray(raw?.ImpactedServices)
    ? raw.ImpactedServices.map((s: any) => ({
        serviceType: s?.ServiceType === 'Bus' ? 'Bus' : 'L',
        lineColor: s?.Line || undefined,
        routeName: s?.RouteName || s?.Line || 'Unknown',
        routeId: s?.RouteId || s?.Route || '',
      }))
    : [];

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