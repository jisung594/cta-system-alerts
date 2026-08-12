import {
  pgTable,
  text,
  boolean,
  timestamp,
  serial,
  index,
  check,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// ALERTS TABLE
export const alerts = pgTable(
  'alerts',
  {
    alertId: text('alert_id').primaryKey(), // PRIMARY KEY (CTA's unique AlertId)
    headline: text('headline').notNull(),
    shortDescription: text('short_description'), // nullable
    fullDescription: text('full_description'),   // nullable
    severity: text('severity').notNull(), 
    isPlanned: boolean('is_planned').notNull(),
    eventStart: timestamp('event_start', { withTimezone: true }),
    eventEnd: timestamp('event_end', { withTimezone: true }),

    // App-managed metadata timestamps
    firstSeenAt: timestamp('first_seen_at', { withTimezone: true }).notNull(),
    lastSeenAt: timestamp('last_seen_at', { withTimezone: true }).notNull(),
    resolvedAt: timestamp('resolved_at', { withTimezone: true }), // Set when cron job detects an alert has dropped off the feed
  },
  (table) => [
    // Multi-column index for analytics filtering
    index('idx_alerts_analytics_time').on(
      table.firstSeenAt,
      table.resolvedAt,
      table.severity
    ),
    // Enforce valid severity values
    check(
      'check_valid_severity',
      sql`${table.severity} IN ('minor', 'major', 'critical')`
    ),
  ]
);


// ALERT IMPACTED SERVICES TABLE (One-to-Many)
export const alertImpactedServices = pgTable(
  'alert_impacted_services',
  {
    id: serial('id').primaryKey(),
    alertId: text('alert_id')
      .notNull()
      .references(() => alerts.alertId, { onDelete: 'cascade' }), // FOREIGN KEY
    serviceType: text('service_type').notNull(), // e.g., 'L' or 'Bus'
    lineColor: text('line_color'),               // nullable (bus routes won't have line colors)
    routeName: text('route_name').notNull(),
    routeId: text('route_id').notNull(),
  },
  (table) => [
    // Index on foreign key for faster joins
    index('idx_impacted_services_alert_id').on(table.alertId),

    // Uniqueness constraint across all 4 key columns
    uniqueIndex('alert_service_identity').on(
      table.alertId,
      table.serviceType,
      table.routeId,
      table.lineColor
    ),

    // Enforce valid service types
    check(
      'check_valid_service_type',
      sql`${table.serviceType} IN ('L', 'Bus')`
    ),
  ]
);

// DRIZZLE RELATIONS (app-level join helpers)
export const alertsRelations = relations(alerts, ({ many }) => ({
  impactedServices: many(alertImpactedServices),
}));

export const alertImpactedServicesRelations = relations(
  alertImpactedServices,
  ({ one }) => ({
    alert: one(alerts, {
      fields: [alertImpactedServices.alertId],
      references: [alerts.alertId],
    }),
  })
);