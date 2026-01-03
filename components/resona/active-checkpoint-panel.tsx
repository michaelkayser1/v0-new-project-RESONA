'use client';

import type { Checkpoint } from '@/lib/db/types';

interface ActiveCheckpointPanelProps {
  checkpoint: Checkpoint | null;
  onRollback?: (checkpointId: string) => void;
}

export function ActiveCheckpointPanel({
  checkpoint,
  onRollback,
}: ActiveCheckpointPanelProps) {
  if (!checkpoint) {
    return (
      <div className="p-4 border border-gray-700 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Active Checkpoint</h3>
        <div className="text-gray-500 text-sm">No checkpoint set</div>
      </div>
    );
  }

  const constraints = Array.isArray(checkpoint.constraints)
    ? checkpoint.constraints
    : [];

  return (
    <div className="p-4 border border-gray-700 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Active Checkpoint</h3>

      <div className="space-y-3">
        {/* Goal */}
        <div>
          <div className="text-xs text-gray-500 mb-1">Goal</div>
          <div className="text-sm text-gray-200">{checkpoint.goal_statement}</div>
        </div>

        {/* Constraints */}
        {constraints.length > 0 && (
          <div>
            <div className="text-xs text-gray-500 mb-1">Constraints</div>
            <ul className="list-disc list-inside space-y-1">
              {constraints.map((constraint, i) => (
                <li key={i} className="text-xs text-gray-300">
                  {constraint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Plan Step */}
        {checkpoint.plan_step && (
          <div>
            <div className="text-xs text-gray-500 mb-1">Current Step</div>
            <div className="text-sm text-gray-200">{checkpoint.plan_step}</div>
          </div>
        )}

        {/* Coherence */}
        {checkpoint.coherence_estimate !== null && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Coherence at save:</span>
            <span className="text-gray-300 font-mono">
              {checkpoint.coherence_estimate.toFixed(3)}
            </span>
          </div>
        )}

        {/* Rollback button */}
        {onRollback && (
          <button
            onClick={() => onRollback(checkpoint.id)}
            className="w-full mt-3 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-400 rounded text-sm font-medium transition-colors"
          >
            Rollback to this checkpoint
          </button>
        )}
      </div>
    </div>
  );
}
