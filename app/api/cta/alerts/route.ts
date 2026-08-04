import { NextResponse } from 'next/server';
import { MOCK_CTA_ALERTS } from '../../../../src/data/mockAlerts';

export async function GET() {
  return NextResponse.json(MOCK_CTA_ALERTS);
}
