import { clamp } from "@/lib/utils";

export function applyConfidencePenalty(score: number, dataConfidence: number) {
  const penalty = dataConfidence < 65 ? (65 - dataConfidence) * 0.18 : 0;
  return Math.round(clamp(score + penalty));
}
