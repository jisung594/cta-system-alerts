import { transformRawAlert } from '@/types/alerts';

const CTA_ALERTS_URL =
  'https://www.transitchicago.com/api/1.0/alerts.aspx?outputType=JSON';

export async function fetchAndTransformCTAAlerts() {
  // 1. Enforce a 10-second timeout guard
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(CTA_ALERTS_URL, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
      // Ensure we fetch fresh data on every cron run
      cache: 'no-store',
    });

    // 2. Check HTTP status before attempting to parse JSON
    if (!response.ok) {
      throw new Error(`CTA API returned HTTP status ${response.status}`);
    }

    const rawData = await response.json();

    // 3. Extract raw array from CTAAlerts.Alert nesting pattern
    const rawAlerts = rawData?.CTAAlerts?.Alert;
    if (!Array.isArray(rawAlerts)) {
      return [];
    }

    // 4. Pass each raw alert through your existing transform function
    return rawAlerts.map(transformRawAlert);
  } finally {
    clearTimeout(timeoutId); // Clean up timer
  }
}