'use client';

import type { ReturnMapping } from '@/lib/db/types';

interface ReturnMappingStatusProps {
  returnMapping: ReturnMapping | null;
}

export function ReturnMappingStatus({ returnMapping }: ReturnMappingStatusProps) {
  if (!returnMapping) {
    return (
      <div className="p-4 border border-gray-700 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Return Mapping</h3>
        <div className="text-gray-500 text-sm">No return mapping yet</div>
      </div>
    );
  }

  const statusColors = {
    valid: 'bg-green-500/20 text-green-400 border-green-500/40',
    weak: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
    failed: 'bg-red-500/20 text-red-400 border-red-500/40',
  };

  const statusLabels = {
    valid: 'R Valid',
    weak: 'R Weak',
    failed: 'R Failed',
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Return Mapping</h3>

      <div className={`px-3 py-2 rounded border ${statusColors[returnMapping.status]} mb-3`}>
        <div className="font-bold text-sm">{statusLabels[returnMapping.status]}</div>
      </div>

      <div className="space-y-2 text-xs">
        <div>
          <span className="text-gray-500">Last Check:</span>
          <span className="text-gray-300 ml-2">
            {new Date(returnMapping.ts).toLocaleTimeString()}
          </span>
        </div>

        {returnMapping.failure_reason && (
          <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded">
            <div className="text-red-400 text-xs">{returnMapping.failure_reason}</div>
          </div>
        )}
      </div>
    </div>
  );
}
