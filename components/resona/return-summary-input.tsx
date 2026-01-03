'use client';

import { useState } from 'react';
import type { ReturnMappingInput } from '@/lib/coherence/return-mapping-validator';

interface ReturnSummaryInputProps {
  onSubmit: (mapping: ReturnMappingInput) => void;
  loading?: boolean;
}

export function ReturnSummaryInput({ onSubmit, loading = false }: ReturnSummaryInputProps) {
  const [goal, setGoal] = useState('');
  const [nextStep, setNextStep] = useState('');
  const [doneWhen, setDoneWhen] = useState('');
  const [constraints, setConstraints] = useState('');

  const handleSubmit = () => {
    const constraintsList = constraints
      .split('\n')
      .filter((c) => c.trim().length > 0);

    const mapping: ReturnMappingInput = {
      goal_reconstruction: goal,
      constraints_reconstruction: constraintsList,
      state_delta: nextStep,
      why_next_action_follows: nextStep,
      stop_condition: doneWhen,
    };

    onSubmit(mapping);

    // Reset form
    setGoal('');
    setNextStep('');
    setDoneWhen('');
    setConstraints('');
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Return Summary Input</h3>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Goal is…</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="What are you trying to accomplish?"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Next step is…</label>
          <input
            type="text"
            value={nextStep}
            onChange={(e) => setNextStep(e.target.value)}
            placeholder="What are you doing next?"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Done when…</label>
          <input
            type="text"
            value={doneWhen}
            onChange={(e) => setDoneWhen(e.target.value)}
            placeholder="How will you know you're done?"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Constraints are…</label>
          <textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="One constraint per line"
            rows={3}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
            disabled={loading}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !goal || !nextStep || !doneWhen}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded text-sm font-medium transition-colors"
        >
          {loading ? 'Validating...' : 'Submit Return Mapping'}
        </button>
      </div>
    </div>
  );
}
