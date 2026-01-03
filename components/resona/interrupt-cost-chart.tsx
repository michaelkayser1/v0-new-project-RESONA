'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Event } from '@/lib/db/types';

interface InterruptCostChartProps {
  events: Event[];
}

export function InterruptCostChart({ events }: InterruptCostChartProps) {
  // Extract interrupt events
  const interrupts = events
    .filter((e) => e.event_type === 'interrupt')
    .map((e) => ({
      timestamp: new Date(e.ts).getTime(),
      duration: (e.payload as any).duration_seconds || 0,
    }))
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-20); // Last 20 interrupts

  const chartData = interrupts.map((int, i) => ({
    index: i + 1,
    duration: int.duration,
  }));

  const avgDuration =
    interrupts.length > 0
      ? interrupts.reduce((sum, i) => sum + i.duration, 0) / interrupts.length
      : 0;

  return (
    <div className="p-4 border border-gray-700 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-400">Interrupt Cost</h3>
        <div className="text-xs text-gray-500">
          Avg: <span className="text-gray-300 font-mono">{avgDuration.toFixed(0)}s</span>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="h-32 flex items-center justify-center text-gray-500 text-sm">
          No interrupts recorded
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="index"
              stroke="rgba(255,255,255,0.3)"
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.3)"
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
              label={{ value: 'Duration (s)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '4px',
              }}
              labelStyle={{ color: 'rgba(255,255,255,0.8)' }}
            />
            <Line
              type="monotone"
              dataKey="duration"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ fill: '#60a5fa', r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
