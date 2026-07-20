import { useMemo, useState } from 'react';
import { MOCK_CTA_ALERTS } from '../data/mockAlerts';
import type { CTALine } from '../types/alerts';

const LINE_STYLES: Record<CTALine, { base: string; active: string; dot: string }> = {
  Red: {
    base: 'border-slate-300 text-slate-700 hover:border-red-400 hover:text-red-700',
    active: 'border-red-500 bg-red-50 text-red-700',
    dot: 'bg-red-600',
  },
  Blue: {
    base: 'border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-700',
    active: 'border-blue-500 bg-blue-50 text-blue-700',
    dot: 'bg-blue-600',
  },
  Brown: {
    base: 'border-slate-300 text-slate-700 hover:border-amber-500 hover:text-amber-700',
    active: 'border-amber-600 bg-amber-50 text-amber-700',
    dot: 'bg-amber-700',
  },
  Green: {
    base: 'border-slate-300 text-slate-700 hover:border-green-400 hover:text-green-700',
    active: 'border-green-500 bg-green-50 text-green-700',
    dot: 'bg-green-600',
  },
  Orange: {
    base: 'border-slate-300 text-slate-700 hover:border-orange-400 hover:text-orange-700',
    active: 'border-orange-500 bg-orange-50 text-orange-700',
    dot: 'bg-orange-600',
  },
  Purple: {
    base: 'border-slate-300 text-slate-700 hover:border-violet-400 hover:text-violet-700',
    active: 'border-violet-500 bg-violet-50 text-violet-700',
    dot: 'bg-violet-600',
  },
  Pink: {
    base: 'border-slate-300 text-slate-700 hover:border-pink-400 hover:text-pink-700',
    active: 'border-pink-500 bg-pink-50 text-pink-700',
    dot: 'bg-pink-600',
  },
  Yellow: {
    base: 'border-slate-300 text-slate-700 hover:border-yellow-400 hover:text-yellow-700',
    active: 'border-yellow-500 bg-yellow-50 text-yellow-700',
    dot: 'bg-yellow-500',
  },
};

const SEVERITY_STYLES: Record<string, string> = {
  critical: 'bg-rose-100 text-rose-700',
  major: 'bg-amber-100 text-amber-700',
  minor: 'bg-slate-100 text-slate-700',
};

const CTAAlertsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLines, setSelectedLines] = useState<CTALine[]>([]);

  // Filter alerts based on search term and selected lines
  const filteredAlerts = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return MOCK_CTA_ALERTS.filter((alert) => {
      const searchableText = [
        alert.headline,
        alert.shortDescription,
        alert.fullDescription,
        ...alert.impactedServices.map((service) => service.routeName),
      ]
        .join(' ')
        .toLowerCase();

      const matchesText = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
      const matchesLines =
        selectedLines.length === 0 ||
        alert.impactedServices.some((service) => service.lineColor && selectedLines.includes(service.lineColor));

      return matchesText && matchesLines;
    });
  }, [searchTerm, selectedLines]);

  // Calculate summary statistics
  const totalAlerts = filteredAlerts.length;
  const criticalDisruptions = filteredAlerts.filter((alert) => alert.severity === 'critical').length;
  const affectedLines = useMemo(() => {
    const lineSet = new Set<CTALine>();

    // Collect unique line colors
    filteredAlerts.forEach((alert) => {
      alert.impactedServices.forEach((service) => {
        if (service.lineColor) {
          lineSet.add(service.lineColor);
        }
      });
    });

    return lineSet.size;
  }, [filteredAlerts]);

  const timestamp = new Date().toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  const toggleLine = (line: CTALine) => {
    setSelectedLines((current) =>
      current.includes(line) ? current.filter((value) => value !== line) : [...current, line],
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                CTA Alerts Console
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                Realtime CTA System Alerts
              </h1>
            </div>
            <p className="text-sm font-medium text-slate-600">
              Live Data Panel
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CTAAlertsDashboard;
