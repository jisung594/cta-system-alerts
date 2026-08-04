import { NextResponse } from 'next/server';

const CTA_ALERTS_URL = 'https://www.transitchicago.com/api/v2/alerts.response?outputType=JSON';

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
    return NextResponse.json(data ?? {});
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
