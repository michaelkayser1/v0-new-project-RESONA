'use client';

import type { CoherenceMetrics } from '@/lib/coherence/calculator';

interface VolatilityPanelProps {
  metrics: CoherenceMetrics;
  eventCount: number;
}

export function VolatilityPanel({ metrics, eventCount }: VolatilityPanelProps) {
  const actionRate = eventCount > 0 ? (eventCount / 30).toFixed(1) : '0.0'; // events/min (30min window)

  const isRetryLoop = metrics.components.contradictionRate > 0.3;

  return (
    <div className="p-4 border border-gray-700 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Volatility & Drift</h3>

      <div className="space-y-3">
        {/* Action Rate */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Action Rate</span>
          <span className="text-sm text-gray-300 font-mono">{actionRate} events/min</span>
        </div>

        {/* Retry Loop Indicator */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Retry Loop</span>
          {isRetryLoop ? (
            <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 rounded text-xs font-medium">
              DETECTED
            </span>
          ) : (
            <span className="px-2 py-0.5 bg-gray-500/20 border border-gray-500/40 text-gray-400 rounded text-xs font-medium">
              NONE
            </span>
          )}
        </div>

        {/* Drift Score */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Goal Drift</span>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 transition-all"
                style={{ width: `${metrics.components.drift * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 font-mono w-10 text-right">
              {(metrics.components.drift * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Contradiction Rate (for agents) */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Contradiction Rate</span>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all"
                style={{ width: `${metrics.components.contradictionRate * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 font-mono w-10 text-right">
              {(metrics.components.contradictionRate * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
