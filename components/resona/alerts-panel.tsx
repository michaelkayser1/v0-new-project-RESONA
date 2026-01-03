'use client';

import type { CoherenceMetrics } from '@/lib/coherence/calculator';
import type { ReturnMapping, Incident } from '@/lib/db/types';

interface AlertsPanelProps {
  coherence: CoherenceMetrics;
  returnMapping: ReturnMapping | null;
  incidents: Incident[];
}

export function AlertsPanel({ coherence, returnMapping, incidents }: AlertsPanelProps) {
  const alerts = [];

  // Fragmentation risk (C < L)
  if (!coherence.inCorridor && coherence.score < 0.618) {
    alerts.push({
      type: 'fragmentation',
      severity: 'high',
      message: 'Coherence below corridor — fragmentation risk',
    });
  }

  // Rigidity risk (C > U)
  if (!coherence.inCorridor && coherence.score > 0.6667) {
    alerts.push({
      type: 'rigidity',
      severity: 'medium',
      message: 'Coherence above corridor — rigidity risk',
    });
  }

  // Return Mapping failure
  if (returnMapping && returnMapping.status === 'failed') {
    alerts.push({
      type: 'return_failure',
      severity: 'critical',
      message: 'Return Mapping validation failed',
    });
  }

  // Recent critical incidents
  const criticalIncidents = incidents.filter((i) => i.severity === 'critical');
  if (criticalIncidents.length > 0) {
    alerts.push({
      type: 'incident',
      severity: 'critical',
      message: `${criticalIncidents.length} critical incident(s) detected`,
    });
  }

  const severityColors: Record<string, string> = {
    low: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
    medium: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400',
    high: 'bg-orange-500/20 border-orange-500/40 text-orange-400',
    critical: 'bg-red-500/20 border-red-500/40 text-red-400',
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Alerts</h3>

      {alerts.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-4">
          All systems nominal
        </div>
      ) : (
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded border ${severityColors[alert.severity]}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase">{alert.severity}</span>
                <span className="text-xs">{alert.type}</span>
              </div>
              <div className="mt-1 text-sm">{alert.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
