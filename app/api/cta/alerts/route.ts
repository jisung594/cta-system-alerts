import { NextResponse } from 'next/server';

const CTA_ALERTS_URL = 'https://www.transitchicago.com/api/1.0/alerts.aspx?outputType=JSON';
type TrainRouteCode = 'Red' | 'Blue' | 'Brn' | 'G' | 'Org' | 'Pnk' | 'P' | 'Y';
const TRAIN_ROUTE_CODES = new Set<TrainRouteCode>(['Red', 'Blue', 'Brn', 'G', 'Org', 'Pnk', 'P', 'Y']);

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

type LineAlertSummary = Record<TrainRouteCode, number>;

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

    const tally: LineAlertSummary = {
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

    return NextResponse.json(tally);
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
