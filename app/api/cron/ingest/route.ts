import { NextResponse } from 'next/server';
import { fetchAndTransformCTAAlerts } from '@/lib/cta-client';
import { syncAlertsToDatabase } from '@/db/services/ingest';

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

    const { processedCount, resolvedCount } = await syncAlertsToDatabase(alerts);

    return NextResponse.json({
      success: true,
      processedCount: processedCount,
      resolvedCount: resolvedCount,
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
