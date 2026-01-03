'use client';

import type { Event } from '@/lib/db/types';

interface TimelineProps {
  events: Event[];
}

export function Timeline({ events }: TimelineProps) {
  const eventTypeColors: Record<string, string> = {
    checkpoint: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
    interrupt: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400',
    tool_call: 'bg-purple-500/20 border-purple-500/40 text-purple-400',
    rollback: 'bg-red-500/20 border-red-500/40 text-red-400',
    alert: 'bg-orange-500/20 border-orange-500/40 text-orange-400',
  };

  const getEventColor = (type: string) => {
    return eventTypeColors[type] || 'bg-gray-500/20 border-gray-500/40 text-gray-400';
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Timeline / Flight Recorder</h3>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {events.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-4">No events recorded</div>
        ) : (
          events.slice(0, 50).map((event) => {
            const time = new Date(event.ts).toLocaleTimeString();
            const colorClass = getEventColor(event.event_type);

            return (
              <div
                key={event.id}
                className={`px-3 py-2 rounded border ${colorClass} text-xs`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-gray-500">{time}</span>
                    <span className="font-medium">{event.event_type}</span>
                  </div>
                  <span className="text-gray-500">{event.actor}</span>
                </div>
                {event.payload && Object.keys(event.payload).length > 0 && (
                  <div className="mt-1 text-gray-400 truncate">
                    {JSON.stringify(event.payload).slice(0, 100)}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
