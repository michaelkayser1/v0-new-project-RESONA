'use client';

import { useState } from 'react';

interface ExportSession {
  session_id: string;
  actor_type: string;
  actor_id: string;
  started_at: string;
  ended_at: string | null;
  counts: {
    events: number;
    checkpoints: number;
    return_mappings: number;
    incidents: number;
  };
}

interface ResearchExportPanelProps {
  currentSessionId?: string;
}

export function ResearchExportPanel({ currentSessionId }: ResearchExportPanelProps) {
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState<'json' | 'jsonl' | 'csv'>('json');
  const [anonymize, setAnonymize] = useState(true);
  const [includePayloads, setIncludePayloads] = useState(false);
  const [sessions, setSessions] = useState<ExportSession[]>([]);
  const [selectedSessions, setSelectedSessions] = useState<Set<string>>(new Set());

  // Fetch available sessions
  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/resona/export');
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Export data
  const handleExport = async () => {
    setLoading(true);
    try {
      const sessionIds = selectedSessions.size > 0
        ? Array.from(selectedSessions)
        : currentSessionId
        ? [currentSessionId]
        : undefined;

      const response = await fetch('/api/resona/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_ids: sessionIds,
          format,
          anonymize,
          include_payloads: includePayloads,
        }),
      });

      const data = await response.json();

      // Download files
      if (format === 'json') {
        downloadJSON(data, 'resona_export.json');
      } else {
        // For JSONL and CSV, download multiple files
        for (const [filename, content] of Object.entries(data.files)) {
          downloadFile(content as string, filename);
        }
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSession = (sessionId: string) => {
    const newSelected = new Set(selectedSessions);
    if (newSelected.has(sessionId)) {
      newSelected.delete(sessionId);
    } else {
      newSelected.add(sessionId);
    }
    setSelectedSessions(newSelected);
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Research Export</h3>

      <div className="space-y-3">
        {/* Export format */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Export Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as any)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-200"
            disabled={loading}
          >
            <option value="json">JSON (single file)</option>
            <option value="jsonl">JSONL (line-delimited)</option>
            <option value="csv">CSV (spreadsheet)</option>
          </select>
        </div>

        {/* Options */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={anonymize}
              onChange={(e) => setAnonymize(e.target.checked)}
              className="rounded bg-gray-700 border-gray-600"
              disabled={loading}
            />
            <span>Anonymize data (remove PII)</span>
          </label>

          <label className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includePayloads}
              onChange={(e) => setIncludePayloads(e.target.checked)}
              className="rounded bg-gray-700 border-gray-600"
              disabled={loading}
            />
            <span>Include event payloads</span>
          </label>
        </div>

        {/* Session selection */}
        {sessions.length === 0 ? (
          <button
            onClick={fetchSessions}
            disabled={loading}
            className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm"
          >
            {loading ? 'Loading...' : 'Load Sessions'}
          </button>
        ) : (
          <div>
            <div className="text-xs text-gray-500 mb-2">
              Select sessions ({selectedSessions.size} selected)
            </div>
            <div className="max-h-32 overflow-y-auto space-y-1 border border-gray-700 rounded p-2">
              {sessions.map((session) => (
                <label
                  key={session.session_id}
                  className="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer hover:bg-gray-800 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedSessions.has(session.session_id)}
                    onChange={() => toggleSession(session.session_id)}
                    className="rounded bg-gray-700 border-gray-600"
                  />
                  <span className="flex-1">
                    {session.actor_id} ({session.counts.events} events)
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Export info */}
        <div className="text-xs text-gray-500 bg-gray-800/50 p-2 rounded">
          <div className="font-semibold mb-1">Export includes:</div>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Metadata (system version, parameters)</li>
            <li>Sessions, events, checkpoints</li>
            <li>Return mappings, incidents</li>
            <li>Metric definitions</li>
          </ul>
        </div>

        {/* Export button */}
        <button
          onClick={handleExport}
          disabled={loading || (sessions.length > 0 && selectedSessions.size === 0 && !currentSessionId)}
          className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded text-sm font-medium"
        >
          {loading ? 'Exporting...' : 'Export Research Data'}
        </button>

        {/* Citation info */}
        <div className="text-xs text-gray-500 bg-blue-500/10 border border-blue-500/30 p-2 rounded">
          <div className="font-semibold text-blue-400 mb-1">Research-Grade</div>
          <div>
            Exports include full metadata for reproducibility.
            All metrics are formally defined and version-tracked.
          </div>
        </div>
      </div>
    </div>
  );
}
