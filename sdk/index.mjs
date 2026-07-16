const defaultBaseUrl = "https://phylax-ivory.vercel.app";

async function requestJson(url, init) {
  const response = await fetch(url, init);
  const body = await response.json().catch(() => ({ message: "Phylax returned a non-JSON response." }));
  if (!response.ok) {
    const error = new Error(body.message ?? `Phylax request failed with HTTP ${response.status}.`);
    error.status = response.status;
    error.body = body;
    throw error;
  }
  return body;
}

export class PhylaxClient {
  constructor(options = {}) {
    this.baseUrl = (options.baseUrl ?? defaultBaseUrl).replace(/\/$/, "");
    this.apiKey = options.apiKey;
  }

  headers() {
    return {
      "Content-Type": "application/json",
      ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {})
    };
  }

  preflight(input) {
    return requestJson(`${this.baseUrl}/api/agent/query`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({ ...input, intent: "execution.preflight" })
    });
  }

  verifyAttestation(attestation, expected = {}) {
    return requestJson(`${this.baseUrl}/api/attestations/verify`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({ attestation, ...expected })
    });
  }

  publicKey() {
    return requestJson(`${this.baseUrl}/api/attestations/public-key`, { headers: this.headers() });
  }

  evidence() {
    return requestJson(`${this.baseUrl}/api/evidence`, { headers: this.headers() });
  }
}

export function createPhylaxClient(options) {
  return new PhylaxClient(options);
}
