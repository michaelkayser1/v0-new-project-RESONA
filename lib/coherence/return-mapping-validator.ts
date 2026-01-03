// Return Mapping (R) Validation Engine
// Ensures agents maintain goal coherence through the "audit line"

import type { ReturnMappingStatus } from '../db/types';

export interface ReturnMappingInput {
  goal_reconstruction: string;
  constraints_reconstruction: string[];
  state_delta: string;
  why_next_action_follows: string;
  stop_condition: string;
}

export interface ReturnMappingValidation {
  status: ReturnMappingStatus;
  failureReason?: string;
  scores: {
    goalSimilarity: number;
    constraintsPresent: boolean;
    stateDeltaExplainable: boolean;
    logicalContinuity: number;
    stopConditionClear: boolean;
  };
}

export interface ValidationContext {
  originalGoal: string;
  originalConstraints: string[];
  recentToolResults?: any[];
}

const MIN_GOAL_SIMILARITY = 0.7; // Threshold for goal reconstruction
const MIN_CONTINUITY_SCORE = 0.6; // Threshold for logical flow

/**
 * Validate a Return Mapping from an agent
 *
 * Checks:
 * 1. Goal similarity above threshold
 * 2. Constraints present and accounted for
 * 3. State delta explainable in plain language
 * 4. No contradictions with tool results
 * 5. Stop condition is clear and measurable
 */
export function validateReturnMapping(
  input: ReturnMappingInput,
  context: ValidationContext
): ReturnMappingValidation {
  const scores = {
    goalSimilarity: 0,
    constraintsPresent: false,
    stateDeltaExplainable: false,
    logicalContinuity: 0,
    stopConditionClear: false,
  };

  // 1. Goal Similarity
  scores.goalSimilarity = calculateSimilarity(
    input.goal_reconstruction,
    context.originalGoal
  );

  if (scores.goalSimilarity < MIN_GOAL_SIMILARITY) {
    return {
      status: 'failed',
      failureReason: `Goal reconstruction too divergent (${(scores.goalSimilarity * 100).toFixed(0)}% similarity, need >${(MIN_GOAL_SIMILARITY * 100).toFixed(0)}%)`,
      scores,
    };
  }

  // 2. Constraints Present
  scores.constraintsPresent =
    input.constraints_reconstruction.length > 0 &&
    context.originalConstraints.length > 0 &&
    hasConstraintOverlap(
      input.constraints_reconstruction,
      context.originalConstraints
    );

  if (!scores.constraintsPresent && context.originalConstraints.length > 0) {
    return {
      status: 'weak',
      failureReason: 'Constraints not adequately reconstructed',
      scores,
    };
  }

  // 3. State Delta Explainable
  scores.stateDeltaExplainable =
    input.state_delta.length > 10 && // Non-trivial explanation
    !input.state_delta.toLowerCase().includes('unknown') &&
    !input.state_delta.toLowerCase().includes('unclear');

  if (!scores.stateDeltaExplainable) {
    return {
      status: 'weak',
      failureReason: 'State delta not clearly explained',
      scores,
    };
  }

  // 4. Logical Continuity
  scores.logicalContinuity = assessLogicalContinuity(
    input.why_next_action_follows,
    input.state_delta,
    context.recentToolResults
  );

  if (scores.logicalContinuity < MIN_CONTINUITY_SCORE) {
    return {
      status: 'failed',
      failureReason: `Logical continuity too low (${(scores.logicalContinuity * 100).toFixed(0)}%)`,
      scores,
    };
  }

  // 5. Stop Condition Clear
  scores.stopConditionClear =
    input.stop_condition.length > 5 &&
    (input.stop_condition.toLowerCase().includes('when') ||
      input.stop_condition.toLowerCase().includes('until') ||
      input.stop_condition.toLowerCase().includes('complete') ||
      input.stop_condition.toLowerCase().includes('done'));

  if (!scores.stopConditionClear) {
    return {
      status: 'weak',
      failureReason: 'Stop condition not clearly defined',
      scores,
    };
  }

  // All checks passed
  return {
    status: 'valid',
    scores,
  };
}

/**
 * Calculate semantic similarity between two strings
 * Uses simple token-based overlap (production would use embeddings)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const tokens1 = tokenize(str1);
  const tokens2 = tokenize(str2);

  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size; // Jaccard similarity
}

/**
 * Check if reconstructed constraints overlap with originals
 */
function hasConstraintOverlap(
  reconstructed: string[],
  original: string[]
): boolean {
  for (const recon of reconstructed) {
    for (const orig of original) {
      if (calculateSimilarity(recon, orig) > 0.5) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Assess logical continuity of the next action
 * Checks if the reasoning makes sense given the state delta and tool results
 */
function assessLogicalContinuity(
  reasoning: string,
  stateDelta: string,
  toolResults?: any[]
): number {
  let score = 0.5; // Base score

  // Reasoning should be non-trivial
  if (reasoning.length < 20) {
    return 0.3;
  }

  // Should contain causal language
  const causalWords = ['because', 'therefore', 'since', 'need to', 'must', 'require'];
  const hasCausality = causalWords.some((word) =>
    reasoning.toLowerCase().includes(word)
  );

  if (hasCausality) {
    score += 0.2;
  }

  // Should reference the state delta
  const deltaTokens = tokenize(stateDelta);
  const reasoningTokens = tokenize(reasoning);
  const deltaReferences = deltaTokens.filter((t) => reasoningTokens.includes(t)).length;

  if (deltaReferences > 0) {
    score += 0.2;
  }

  // Should not contradict tool results (simple check)
  if (toolResults && toolResults.length > 0) {
    const hasContradiction = detectContradiction(reasoning, toolResults);
    if (hasContradiction) {
      score -= 0.5;
    }
  }

  return Math.max(0, Math.min(1, score));
}

/**
 * Detect obvious contradictions between reasoning and tool results
 * (Simplified version - production would use more sophisticated NLU)
 */
function detectContradiction(reasoning: string, toolResults: any[]): boolean {
  const lowerReasoning = reasoning.toLowerCase();

  // Check for negation mismatches
  for (const result of toolResults) {
    const resultStr = JSON.stringify(result).toLowerCase();

    // If reasoning says "failed" but result says "success"
    if (
      lowerReasoning.includes('failed') &&
      (resultStr.includes('success') || resultStr.includes('"status":"ok"'))
    ) {
      return true;
    }

    // If reasoning says "found" but result is empty
    if (
      lowerReasoning.includes('found') &&
      (resultStr.includes('[]') || resultStr.includes('null'))
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Simple tokenizer (lowercase, alphanumeric only)
 */
function tokenize(str: string): string[] {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

/**
 * Helper: Create a valid Return Mapping template for agents
 */
export function createReturnMappingTemplate(
  goal: string,
  constraints: string[]
): ReturnMappingInput {
  return {
    goal_reconstruction: goal,
    constraints_reconstruction: constraints,
    state_delta: '',
    why_next_action_follows: '',
    stop_condition: '',
  };
}
