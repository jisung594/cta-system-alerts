import { NextResponse } from 'next/server';

const CTA_ALERTS_URL = 'https://www.transitchicago.com/api/1.0/alerts.aspx?outputType=JSON';

type TrainRouteCode = 'Red' | 'Blue' | 'Brn' | 'G' | 'Org' | 'Pnk' | 'P' | 'Y';
// Official CTA Route Configs: Maps route IDs to display names and brand hex colors
const LINE_CONFIG: Record<TrainRouteCode, { name: string; color: string }> = {
  Red: { name: 'Red Line', color: '#c0392b' },
  Blue: { name: 'Blue Line', color: '#2980b9' },
  Brn: { name: 'Brown Line', color: '#964B00' },
  G: { name: 'Green Line', color: '#27ae60' },
  Org: { name: 'Orange Line', color: '#d35400' },
  Pnk: { name: 'Pink Line', color: '#e84393' },
  P: { name: 'Purple Line', color: '#8e44ad' },
  Y: { name: 'Yellow Line', color: '#f1c40f' },
};

const TRAIN_ROUTE_CODES = new Set<string>(Object.keys(LINE_CONFIG));

interface CTAAlertsResponse {
  CTAAlerts?: CTAAlerts;
}

interface CTAAlerts {
  Alert?: CTAAlert | CTAAlert[];
}

interface CTAAlert {
  AlertId: string;
  Headline?: string;
  ShortDescription?: string;
  ImpactedService?: ImpactedService;
}

interface ImpactedService {
  Service?: Service | Service[];
}

interface Service {
  ServiceType?: 'R' | 'T' | 'B' | string; // 'R' = Route, 'T' = Station, 'B' = Bus
  ServiceTypeDescription?: string;
  ServiceName?: string;
  ServiceId?: string;
}

// Return contract for Frontend / Recharts
export interface LineAlertSummary {
  line: string;
  count: number;
  color: string;
}

export async function GET() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(CTA_ALERTS_URL, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch live CTA alerts', status: response.status },
        { status: response.status }
      );
    }

    const data = (await response.json()) as CTAAlertsResponse;
    const rawAlerts = data?.CTAAlerts?.Alert;
    const alerts: CTAAlert[] = Array.isArray(rawAlerts)
      ? rawAlerts
      : rawAlerts
      ? [rawAlerts]
      : [];

    const tally: Record<TrainRouteCode, number> = {
      Red: 0,
      Blue: 0,
      Brn: 0,
      G: 0,
      Org: 0,
      Pnk: 0,
      P: 0,
      Y: 0,
    };

    alerts.forEach((alert) => {
      const impactedService = alert?.ImpactedService;
      const services = impactedService?.Service;
      const serviceList = Array.isArray(services)
        ? services
        : services
        ? [services]
        : [];

      serviceList.forEach((service) => {
        const serviceId = service?.ServiceId;
        if (service?.ServiceType === 'R' && serviceId && TRAIN_ROUTE_CODES.has(serviceId as TrainRouteCode)) {
          tally[serviceId as TrainRouteCode] += 1;
        }
      });
    });

    // Convert tally object into Recharts-ready array
    const formattedData: LineAlertSummary[] = (
      Object.keys(LINE_CONFIG) as TrainRouteCode[]
    ).map((code) => ({
      line: LINE_CONFIG[code].name,
      count: tally[code] || 0,
      color: LINE_CONFIG[code].color,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Unable to reach CTA alerts endpoint',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
