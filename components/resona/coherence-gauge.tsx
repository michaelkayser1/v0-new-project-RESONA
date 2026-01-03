'use client';

import { CoherenceConfidence } from '@/lib/db/types';
import { COHERENCE_LOWER_BOUND, COHERENCE_UPPER_BOUND } from '@/lib/coherence/calculator';

interface CoherenceGaugeProps {
  score: number;
  confidence: CoherenceConfidence;
  lowerBound?: number;
  upperBound?: number;
}

export function CoherenceGauge({
  score,
  confidence,
  lowerBound = COHERENCE_LOWER_BOUND,
  upperBound = COHERENCE_UPPER_BOUND,
}: CoherenceGaugeProps) {
  // Convert score to angle (-90 to 90 degrees)
  const angle = (score - 0.5) * 180;

  // Corridor bounds as angles
  const lowerAngle = (lowerBound - 0.5) * 180;
  const upperAngle = (upperBound - 0.5) * 180;

  const isInCorridor = score >= lowerBound && score <= upperBound;

  const gaugeColor = isInCorridor
    ? 'text-green-500'
    : score < lowerBound
    ? 'text-yellow-500'
    : 'text-red-500';

  const confidenceBadge = {
    low: 'bg-gray-500/20 text-gray-400',
    medium: 'bg-blue-500/20 text-blue-400',
    high: 'bg-green-500/20 text-green-400',
  }[confidence];

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-48 h-48">
        {/* Gauge background */}
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {/* Corridor band */}
          <path
            d={`M 100 100 L ${100 + 80 * Math.cos((lowerAngle * Math.PI) / 180)} ${
              100 + 80 * Math.sin((lowerAngle * Math.PI) / 180)
            } A 80 80 0 0 1 ${100 + 80 * Math.cos((upperAngle * Math.PI) / 180)} ${
              100 + 80 * Math.sin((upperAngle * Math.PI) / 180)
            } Z`}
            fill="rgba(34, 197, 94, 0.2)"
            stroke="none"
          />

          {/* Gauge arc */}
          <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

          {/* Needle */}
          <line
            x1="100"
            y1="100"
            x2={100 + 60 * Math.cos((angle * Math.PI) / 180)}
            y2={100 + 60 * Math.sin((angle * Math.PI) / 180)}
            className={gaugeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Center dot */}
          <circle cx="100" cy="100" r="5" className={`${gaugeColor} fill-current`} />

          {/* Labels */}
          <text x="30" y="110" className="text-xs fill-gray-500" textAnchor="middle">
            0
          </text>
          <text x="100" y="40" className="text-xs fill-gray-500" textAnchor="middle">
            0.5
          </text>
          <text x="170" y="110" className="text-xs fill-gray-500" textAnchor="middle">
            1
          </text>
        </svg>
      </div>

      {/* Score display */}
      <div className="text-center">
        <div className={`text-4xl font-bold ${gaugeColor}`}>
          {score.toFixed(3)}
        </div>
        <div className="text-sm text-gray-400 mt-1">Coherence Score C(S)</div>
      </div>

      {/* Confidence badge */}
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${confidenceBadge}`}>
        {confidence.toUpperCase()} CONFIDENCE
      </div>
    </div>
  );
}
