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