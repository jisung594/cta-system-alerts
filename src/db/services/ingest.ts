import { db } from '@/db';
import { alerts, alertImpactedServices } from '@/db/schema';
import { type CTAServiceAlert } from '@/types/alerts';
import { eq, isNull, lt, and, notInArray } from 'drizzle-orm';

export async function syncAlertsToDatabase(
  incomingAlerts: CTAServiceAlert[]
) {
  const now = new Date();

  return await db.transaction(async (tx) => {
    // Collect active IDs from the incoming feed
    const activeAlertIds = incomingAlerts.map((a) => a.id);

    // Step 1: Upsert parent alerts + re-sync impacted services
    for (const alert of incomingAlerts) {
      // 1. Upsert Parent Alert
      await tx
        .insert(alerts)
        .values({
          alertId: alert.id, // Maps internal `id` to DB `alertId`
          headline: alert.headline,
          shortDescription: alert.shortDescription ?? null,
          fullDescription: alert.fullDescription ?? null,
          severity: alert.severity,
          isPlanned: alert.isPlanned,
          eventStart: alert.eventStart ? new Date(alert.eventStart) : null,
          eventEnd: alert.eventEnd ? new Date(alert.eventEnd) : null,
          firstSeenAt: now,
          lastSeenAt: now,
        })
        .onConflictDoUpdate({
          target: alerts.alertId,
          set: {
            headline: alert.headline,
            shortDescription: alert.shortDescription ?? null,
            fullDescription: alert.fullDescription ?? null,
            severity: alert.severity,
            isPlanned: alert.isPlanned,
            eventStart: alert.eventStart ? new Date(alert.eventStart) : null,
            eventEnd: alert.eventEnd ? new Date(alert.eventEnd) : null,
            lastSeenAt: now, // Bumps timestamp to mark it as active
          },
        });

      // 2. Wipe & Replace Impacted Services
      await tx
        .delete(alertImpactedServices)
        .where(eq(alertImpactedServices.alertId, alert.id));

      if (alert.impactedServices && alert.impactedServices.length > 0) {
        await tx.insert(alertImpactedServices).values(
          alert.impactedServices.map((service) => ({
            alertId: alert.id,
            serviceType: service.serviceType,
            lineColor: service.lineColor ?? null,
            routeName: service.routeName,
            routeId: service.routeId,
          }))
        );
      }
    }

    // Step 2: Mark dropped alerts as resolved
    const staleThreshold = new Date(now.getTime() - 6 * 60 * 1000);

    // Build the query conditions for resolving dropped alerts
    const conditions = [
      isNull(alerts.resolvedAt),            // Must currently be open/unresolved
      lt(alerts.lastSeenAt, staleThreshold) // Must be older than 6 minutes
    ];

    // Only add the `notInArray` filter if there are active alerts in this run
    if (activeAlertIds.length > 0) {
      conditions.push(notInArray(alerts.alertId, activeAlertIds));
    }

    const resolvedResult = await tx
      .update(alerts)
      .set({ resolvedAt: now })
      .where(and(...conditions))
      .returning({ alertId: alerts.alertId });

    return {
      processedCount: incomingAlerts.length,
      resolvedCount: resolvedResult.length,
    };
  });
}