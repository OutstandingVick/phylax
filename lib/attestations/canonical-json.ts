import { createHash } from "node:crypto";

function normalize(value: unknown): unknown {
  if (value === null || typeof value === "string" || typeof value === "boolean") return value;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("Attestation values must be finite numbers.");
    return value;
  }
  if (Array.isArray(value)) return value.map(normalize);
  if (typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((output, key) => {
        const item = (value as Record<string, unknown>)[key];
        if (item !== undefined) output[key] = normalize(item);
        return output;
      }, {});
  }
  throw new Error(`Unsupported attestation value: ${typeof value}`);
}

export function canonicalJson(value: unknown) {
  return JSON.stringify(normalize(value));
}

export function sha256Digest(value: unknown) {
  return createHash("sha256").update(canonicalJson(value)).digest("hex");
}
