// C(S) Coherence Score Calculator
// Estimates coherence based on QOTE principles and session dynamics

import type { Event, CoherenceConfidence } from '../db/types';

// QOTE coherence corridor bounds
export const COHERENCE_LOWER_BOUND = 0.618; // φ⁻¹ (golden ratio inverse)
export const COHERENCE_UPPER_BOUND = 0.6667; // 2/3

export interface CoherenceMetrics {
  score: number; // C(S) - the coherence score
  confidence: CoherenceConfidence;
  state: 'coherent' | 'fragmented' | 'rigid';
  components: {
    orientation: number; // Goal alignment
    interruptCost: number; // Context switching penalty
    volatility: number; // Action rate stability
    drift: number; // Goal/context drift over time
    contradictionRate: number; // For agents: logical contradictions
  };
  inCorridor: boolean;
}

export interface CoherenceInput {
  events: Event[];
  currentGoal?: string;
  timeWindowMinutes?: number;
}

/**
 * Calculate C(S) coherence score from session events
 *
 * C(S) = (orientation × interruptResistance × stability) - drift - contradictions
 *
 * Bounded to [0, 1] range
 * Corridor: [0.618, 0.6667]
 */
export function calculateCoherence(input: CoherenceInput): CoherenceMetrics {
  const { events, currentGoal, timeWindowMinutes = 30 } = input;

  // Filter events to time window
  const now = Date.now();
  const windowMs = timeWindowMinutes * 60 * 1000;
  const recentEvents = events.filter(
    (e) => now - new Date(e.ts).getTime() < windowMs
  );

  if (recentEvents.length === 0) {
    return {
      score: COHERENCE_LOWER_BOUND,
      confidence: 'low',
      state: 'coherent',
      components: {
        orientation: 0.5,
        interruptCost: 1.0,
        volatility: 0,
        drift: 0,
        contradictionRate: 0,
      },
      inCorridor: true,
    };
  }

  // Calculate components
  const orientation = calculateOrientation(recentEvents, currentGoal);
  const interruptCost = calculateInterruptCost(recentEvents);
  const volatility = calculateVolatility(recentEvents);
  const drift = calculateDrift(recentEvents);
  const contradictionRate = calculateContradictionRate(recentEvents);

  // Compute C(S)
  const interruptResistance = 1 - interruptCost;
  const stability = 1 - volatility;

  let score = orientation * interruptResistance * stability - drift - contradictionRate;

  // Bound to [0, 1]
  score = Math.max(0, Math.min(1, score));

  // Determine state
  let state: 'coherent' | 'fragmented' | 'rigid';
  if (score < COHERENCE_LOWER_BOUND) {
    state = 'fragmented'; // Under-coupled
  } else if (score > COHERENCE_UPPER_BOUND) {
    state = 'rigid'; // Over-coupled
  } else {
    state = 'coherent';
  }

  // Determine confidence
  const sampleSize = recentEvents.length;
  let confidence: CoherenceConfidence;
  if (sampleSize < 5) {
    confidence = 'low';
  } else if (sampleSize < 20) {
    confidence = 'medium';
  } else {
    confidence = 'high';
  }

  return {
    score,
    confidence,
    state,
    components: {
      orientation,
      interruptCost,
      volatility,
      drift,
      contradictionRate,
    },
    inCorridor: score >= COHERENCE_LOWER_BOUND && score <= COHERENCE_UPPER_BOUND,
  };
}

/**
 * Orientation: How well aligned are actions with the current goal?
 * Returns [0, 1] where 1 = perfect alignment
 */
function calculateOrientation(events: Event[], currentGoal?: string): number {
  if (!currentGoal) return 0.5; // Neutral if no goal

  const goalEvents = events.filter((e) => e.goal_id === currentGoal);
  const ratio = goalEvents.length / events.length;

  return ratio;
}

/**
 * Interrupt Cost: Average time lost to interrupts
 * Returns [0, 1] where 0 = no cost, 1 = high cost
 */
function calculateInterruptCost(events: Event[]): number {
  const interrupts = events.filter((e) => e.event_type === 'interrupt');

  if (interrupts.length === 0) return 0;

  const totalDuration = interrupts.reduce((sum, e) => {
    const payload = e.payload as any;
    return sum + (payload.duration_seconds || 0);
  }, 0);

  const avgDuration = totalDuration / interrupts.length;

  // Normalize: 0-60s = low cost, >300s = high cost
  const normalizedCost = Math.min(1, avgDuration / 300);

  return normalizedCost;
}

/**
 * Volatility: How stable is the action rate?
 * Returns [0, 1] where 0 = stable, 1 = highly volatile
 */
function calculateVolatility(events: Event[]): number {
  if (events.length < 3) return 0;

  // Calculate time deltas between events
  const sorted = [...events].sort(
    (a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime()
  );

  const deltas: number[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const delta =
      (new Date(sorted[i].ts).getTime() - new Date(sorted[i - 1].ts).getTime()) / 1000;
    deltas.push(delta);
  }

  // Calculate coefficient of variation (CV)
  const mean = deltas.reduce((sum, d) => sum + d, 0) / deltas.length;
  const variance =
    deltas.reduce((sum, d) => sum + Math.pow(d - mean, 2), 0) / deltas.length;
  const stdDev = Math.sqrt(variance);
  const cv = mean > 0 ? stdDev / mean : 0;

  // Normalize CV to [0, 1]
  return Math.min(1, cv / 2);
}

/**
 * Drift: How much has the goal/context changed?
 * Returns [0, 1] where 0 = no drift, 1 = high drift
 */
function calculateDrift(events: Event[]): number {
  if (events.length < 2) return 0;

  const goalChanges = new Set<string>();
  events.forEach((e) => {
    if (e.goal_id) goalChanges.add(e.goal_id);
  });

  // More goal changes = higher drift
  const driftRatio = (goalChanges.size - 1) / events.length;

  return Math.min(1, driftRatio * 2);
}

/**
 * Contradiction Rate: For agents, how many tool calls contradict each other?
 * Returns [0, 1] where 0 = no contradictions, 1 = high contradiction
 */
function calculateContradictionRate(events: Event[]): number {
  const toolCalls = events.filter((e) => e.event_type === 'tool_call');

  if (toolCalls.length < 2) return 0;

  // Detect retry loops (same tool called multiple times in succession)
  let retries = 0;
  for (let i = 1; i < toolCalls.length; i++) {
    const prev = toolCalls[i - 1].payload as any;
    const curr = toolCalls[i].payload as any;

    if (prev.tool === curr.tool && curr.attempt > 1) {
      retries++;
    }
  }

  const retryRate = retries / toolCalls.length;

  return Math.min(1, retryRate * 3); // Amplify signal
}

/**
 * Helper: Generate a simple coherence estimate for checkpoints
 * (Lighter version for quick checks)
 */
export function estimateCheckpointCoherence(
  recentEvents: Event[]
): { score: number; confidence: CoherenceConfidence } {
  const metrics = calculateCoherence({ events: recentEvents });
  return {
    score: metrics.score,
    confidence: metrics.confidence,
  };
}
