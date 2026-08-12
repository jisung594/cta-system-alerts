import {
  pgTable,
  text,
  boolean,
  timestamp,
  serial,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

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
    index('idx_alerts_first_seen').on(table.firstSeenAt),
    index('idx_alerts_resolved').on(table.resolvedAt),
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
    index('idx_impacted_services_route').on(table.routeId, table.lineColor),
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