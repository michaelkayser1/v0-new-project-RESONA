'use client';

import { useState, useEffect } from 'react';
import { CoherenceGauge } from '@/components/resona/coherence-gauge';
import { ReturnMappingStatus } from '@/components/resona/return-mapping-status';
import { ActiveCheckpointPanel } from '@/components/resona/active-checkpoint-panel';
import { InterruptCostChart } from '@/components/resona/interrupt-cost-chart';
import { VolatilityPanel } from '@/components/resona/volatility-panel';
import { Timeline } from '@/components/resona/timeline';
import { ReturnSummaryInput } from '@/components/resona/return-summary-input';
import { AlertsPanel } from '@/components/resona/alerts-panel';
import type { CoherenceMetrics } from '@/lib/coherence/calculator';
import type { Event, Checkpoint, ReturnMapping, Incident } from '@/lib/db/types';

interface DashboardData {
  coherence: CoherenceMetrics;
  latest_checkpoint: Checkpoint | null;
  latest_return_mapping: ReturnMapping | null;
  recent_incidents: Incident[];
  event_count: number;
  timestamp: string;
}

export default function DashboardPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [actorType, setActorType] = useState<'human' | 'agent'>('human');
  const [actorId, setActorId] = useState('');

  // Start a new session
  const startSession = async () => {
    if (!actorId) return;

    setLoading(true);
    try {
      const response = await fetch('/api/resona/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actor_type: actorType, actor_id: actorId }),
      });

      const session = await response.json();
      setSessionId(session.id);
    } catch (error) {
      console.error('Failed to start session:', error);
    } finally {
      setLoading(false);
    }
  };

  // End current session
  const endSession = async () => {
    if (!sessionId) return;

    setLoading(true);
    try {
      await fetch('/api/resona/sessions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sessionId }),
      });

      setSessionId(null);
      setData(null);
      setEvents([]);
    } catch (error) {
      console.error('Failed to end session:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle return mapping submission
  const handleReturnMappingSubmit = async (mapping: any) => {
    if (!sessionId || !data) return;

    setLoading(true);
    try {
      await fetch('/api/resona/return-mappings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          reconstruction: mapping,
          original_goal: data.latest_checkpoint?.goal_statement || '',
          original_constraints: data.latest_checkpoint?.constraints || [],
        }),
      });
    } catch (error) {
      console.error('Failed to submit return mapping:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle checkpoint rollback
  const handleRollback = async (checkpointId: string) => {
    if (!sessionId) return;

    setLoading(true);
    try {
      // Record rollback event
      await fetch('/api/resona/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          actor: actorId,
          event_type: 'rollback',
          payload: {
            type: 'rollback',
            to_checkpoint_id: checkpointId,
            reason: 'Manual rollback from dashboard',
          },
        }),
      });
    } catch (error) {
      console.error('Failed to rollback:', error);
    } finally {
      setLoading(false);
    }
  };

  // Subscribe to real-time updates
  useEffect(() => {
    if (!sessionId) return;

    const eventSource = new EventSource(`/api/resona/stream?session_id=${sessionId}`);

    eventSource.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setData(update);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    // Fetch events separately
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/resona/events?session_id=${sessionId}&limit=100`);
        const eventsData = await response.json();
        setEvents(eventsData);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 5000);

    return () => {
      eventSource.close();
      clearInterval(interval);
    };
  }, [sessionId]);

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-md w-full p-8 border border-gray-700 rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Resona Dashboard</h1>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Actor Type</label>
              <select
                value={actorType}
                onChange={(e) => setActorType(e.target.value as 'human' | 'agent')}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-gray-200"
              >
                <option value="human">Human</option>
                <option value="agent">Agent</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Actor ID</label>
              <input
                type="text"
                value={actorId}
                onChange={(e) => setActorId(e.target.value)}
                placeholder="Enter your ID"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-gray-200"
              />
            </div>
            <button
              onClick={startSession}
              disabled={!actorId || loading}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded font-medium"
            >
              {loading ? 'Starting...' : 'Start Session'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Resona Dashboard — QOTE Cockpit</h1>
        <button
          onClick={endSession}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium"
        >
          End Session
        </button>
      </div>

      {/* Top Row - Critical State */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <CoherenceGauge
          score={data.coherence.score}
          confidence={data.coherence.confidence}
        />
        <ReturnMappingStatus returnMapping={data.latest_return_mapping} />
        <ActiveCheckpointPanel
          checkpoint={data.latest_checkpoint}
          onRollback={handleRollback}
        />
      </div>

      {/* Middle Row - Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <InterruptCostChart events={events} />
        <VolatilityPanel
          metrics={data.coherence}
          eventCount={data.event_count}
        />
        <Timeline events={events} />
      </div>

      {/* Bottom Row - Interaction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReturnSummaryInput
          onSubmit={handleReturnMappingSubmit}
          loading={loading}
        />
        <AlertsPanel
          coherence={data.coherence}
          returnMapping={data.latest_return_mapping}
          incidents={data.recent_incidents}
        />
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-gray-500">
        Session: {sessionId.slice(0, 8)}... | Last update: {new Date(data.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}
