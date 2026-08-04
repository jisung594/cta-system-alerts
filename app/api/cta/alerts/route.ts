import { NextResponse } from 'next/server';

const CTA_ALERTS_URL = 'https://www.transitchicago.com/api/v2/alerts.response?outputType=JSON';
const TRAIN_ROUTE_CODES = new Set(['Red', 'Blue', 'Brn', 'G', 'Org', 'Pnk', 'P', 'Y']);

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

    const data = await response.json();
    const rawAlerts = data?.CTAAlerts?.Alert;
    const alerts = Array.isArray(rawAlerts)
      ? rawAlerts
      : rawAlerts
      ? [rawAlerts]
      : [];

    const tally = {
      Red: 0,
      Blue: 0,
      Brn: 0,
      G: 0,
      Org: 0,
      Pnk: 0,
      P: 0,
      Y: 0,
    };

    alerts.forEach((alert: any) => {
      const impactedService = alert?.ImpactedService;
      const services = impactedService?.Service;
      const serviceList = Array.isArray(services)
        ? services
        : services
        ? [services]
        : [];

      serviceList.forEach((service: any) => {
        if (service?.ServiceType === 'R' && TRAIN_ROUTE_CODES.has(service?.ServiceId)) {
          tally[service.ServiceId as keyof typeof tally] += 1;
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
