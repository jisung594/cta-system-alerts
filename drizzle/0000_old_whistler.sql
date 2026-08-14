CREATE TABLE "alert_impacted_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"alert_id" text NOT NULL,
	"service_type" text NOT NULL,
	"line_color" text,
	"route_name" text NOT NULL,
	"route_id" text NOT NULL,
	CONSTRAINT "check_valid_service_type" CHECK ("alert_impacted_services"."service_type" IN ('L', 'Bus'))
);
--> statement-breakpoint
CREATE TABLE "alerts" (
	"alert_id" text PRIMARY KEY NOT NULL,
	"headline" text NOT NULL,
	"short_description" text,
	"full_description" text,
	"severity" text NOT NULL,
	"is_planned" boolean NOT NULL,
	"event_start" timestamp with time zone,
	"event_end" timestamp with time zone,
	"first_seen_at" timestamp with time zone NOT NULL,
	"last_seen_at" timestamp with time zone NOT NULL,
	"resolved_at" timestamp with time zone,
	CONSTRAINT "check_valid_severity" CHECK ("alerts"."severity" IN ('minor', 'major', 'critical'))
);
--> statement-breakpoint
ALTER TABLE "alert_impacted_services" ADD CONSTRAINT "alert_impacted_services_alert_id_alerts_alert_id_fk" FOREIGN KEY ("alert_id") REFERENCES "public"."alerts"("alert_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_impacted_services_alert_id" ON "alert_impacted_services" USING btree ("alert_id");--> statement-breakpoint
CREATE UNIQUE INDEX "alert_service_identity" ON "alert_impacted_services" USING btree ("alert_id","service_type","route_id","line_color");--> statement-breakpoint
CREATE INDEX "idx_alerts_analytics_time" ON "alerts" USING btree ("first_seen_at","resolved_at","severity");