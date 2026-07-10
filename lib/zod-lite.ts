type Issue = { path: string; message: string };
type ParseResult<T> = { ok: true; value: T } | { ok: false; issues: Issue[] };

interface Schema<T> {
  parse(value: unknown): T;
  safeParse(value: unknown): { success: true; data: T } | { success: false; error: { flatten: () => { fieldErrors: Record<string, string[]> } } };
  optional(): Schema<T | undefined>;
  default(defaultValue: T): Schema<T>;
}

class BaseSchema<T> implements Schema<T> {
  constructor(private readonly parser: (value: unknown, path: string) => ParseResult<T>) {}
  parse(value: unknown): T {
    const result = this.parser(value, "");
    if (!result.ok) throw new Error(result.issues.map((issue) => issue.message).join(", "));
    return result.value;
  }
  safeParse(value: unknown) {
    const result = this.parser(value, "");
    if (result.ok) return { success: true as const, data: result.value };
    return {
      success: false as const,
      error: {
        flatten: () => ({
          fieldErrors: result.issues.reduce<Record<string, string[]>>((acc, issue) => {
            const key = issue.path || "_root";
            acc[key] = [...(acc[key] ?? []), issue.message];
            return acc;
          }, {})
        })
      }
    };
  }
  optional(): Schema<T | undefined> {
    return new BaseSchema<T | undefined>((value, path) => (value === undefined ? { ok: true, value: undefined } : this.parser(value, path)));
  }
  default(defaultValue: T): Schema<T> {
    return new BaseSchema((value, path) => (value === undefined ? { ok: true, value: defaultValue } : this.parser(value, path)));
  }
}

class StringSchema extends BaseSchema<string> {
  constructor(parser?: (value: unknown, path: string) => ParseResult<string>) {
    super(parser ?? ((value, path) => (typeof value === "string" ? { ok: true, value } : { ok: false, issues: [{ path, message: "Expected string" }] })));
  }
  min(length: number) {
    return new StringSchema((value, path) => {
      const base = typeof value === "string" ? { ok: true as const, value } : { ok: false as const, issues: [{ path, message: "Expected string" }] };
      if (!base.ok) return base;
      return base.value.length >= length ? base : { ok: false, issues: [{ path, message: `Expected at least ${length} characters` }] };
    });
  }
  url() {
    return new StringSchema((value, path) => {
      if (typeof value !== "string") return { ok: false, issues: [{ path, message: "Expected string" }] };
      try {
        new URL(value);
        return { ok: true, value };
      } catch {
        return { ok: false, issues: [{ path, message: "Expected valid URL" }] };
      }
    });
  }
}

class NumberSchema extends BaseSchema<number> {
  constructor(private readonly checks: Array<(value: number) => string | null> = []) {
    super((value, path) => {
      if (typeof value !== "number" || Number.isNaN(value)) return { ok: false, issues: [{ path, message: "Expected number" }] };
      const failed = checks.map((check) => check(value)).find(Boolean);
      return failed ? { ok: false, issues: [{ path, message: failed }] } : { ok: true, value };
    });
  }
  positive() {
    return new NumberSchema([...this.checks, (value) => (value > 0 ? null : "Expected positive number")]);
  }
  max(max: number) {
    return new NumberSchema([...this.checks, (value) => (value <= max ? null : `Expected number <= ${max}`)]);
  }
  min(min: number) {
    return new NumberSchema([...this.checks, (value) => (value >= min ? null : `Expected number >= ${min}`)]);
  }
}

class BooleanSchema extends BaseSchema<boolean> {
  constructor() {
    super((value, path) => (typeof value === "boolean" ? { ok: true, value } : { ok: false, issues: [{ path, message: "Expected boolean" }] }));
  }
}

function enumSchema<const T extends readonly [string, ...string[]]>(values: T): Schema<T[number]> {
  return new BaseSchema((value, path) =>
    typeof value === "string" && values.includes(value)
      ? { ok: true, value }
      : { ok: false, issues: [{ path, message: `Expected one of ${values.join(", ")}` }] }
  );
}

function objectSchema<T extends Record<string, Schema<unknown>>>(shape: T): Schema<{ [K in keyof T]: T[K] extends Schema<infer U> ? U : never }> {
  return new BaseSchema((value, path) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return { ok: false, issues: [{ path, message: "Expected object" }] };
    }
    const output: Record<string, unknown> = {};
    const issues: Issue[] = [];
    for (const [key, schema] of Object.entries(shape)) {
      const parsed = schema.safeParse((value as Record<string, unknown>)[key]);
      if (parsed.success) output[key] = parsed.data;
      else {
        const flattened = parsed.error.flatten().fieldErrors;
        for (const [field, messages] of Object.entries(flattened)) {
          issues.push(...messages.map((message) => ({ path: field === "_root" ? key : `${key}.${field}`, message })));
        }
      }
    }
    return issues.length ? { ok: false, issues } : { ok: true, value: output as { [K in keyof T]: T[K] extends Schema<infer U> ? U : never } };
  });
}

function arraySchema<T>(schema: Schema<T>) {
  class ArraySchema extends BaseSchema<T[]> {
    constructor(private readonly minLength?: number) {
      super((value, path) => {
        if (!Array.isArray(value)) return { ok: false, issues: [{ path, message: "Expected array" }] };
        if (minLength !== undefined && value.length < minLength) return { ok: false, issues: [{ path, message: `Expected at least ${minLength} items` }] };
        const output: T[] = [];
        const issues: Issue[] = [];
        value.forEach((item, index) => {
          const parsed = schema.safeParse(item);
          if (parsed.success) output.push(parsed.data);
          else issues.push({ path: `${path}.${index}`, message: "Invalid array item" });
        });
        return issues.length ? { ok: false, issues } : { ok: true, value: output };
      });
    }
    min(length: number) {
      return new ArraySchema(length);
    }
  }
  return new ArraySchema();
}

export const z = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  enum: enumSchema,
  object: objectSchema,
  array: arraySchema
};
