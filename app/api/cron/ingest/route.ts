import { NextResponse } from 'next/server';
import { fetchAndTransformCTAAlerts } from '@/lib/cta';

export async function GET(request: Request) {
  const isDev = process.env.NODE_ENV === 'development';
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // Enforce auth everywhere except local dev
  if (!isDev) {
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  try {
    // Fetches with 10s timeout & transforms via transformRawAlert()
    const alerts = await fetchAndTransformCTAAlerts();

    // TODO: Pass `alerts` to Drizzle database sync transaction
    // const { processedCount, resolvedCount } = await syncAlertsToDatabase(alerts);

    return NextResponse.json({
      success: true,
      processedCount: alerts.length,
      resolvedCount: 0, // Placeholder until DB sync step
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[CRON_INGEST_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
