#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { createPhylaxClient } from "./index.mjs";

function argsToObject(args) {
  const result = {};
  for (let index = 0; index < args.length; index += 1) {
    const item = args[index];
    if (!item.startsWith("--")) continue;
    result[item.slice(2)] = args[index + 1];
    index += 1;
  }
  return result;
}

function required(options, name) {
  if (!options[name]) throw new Error(`Missing --${name}.`);
  return options[name];
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const options = argsToObject(rest);
  const client = createPhylaxClient({ baseUrl: options.endpoint });

  if (command === "preflight") {
    const result = await client.preflight({
      requestingAgentId: options.agent ?? "phylax_cli",
      walletAddress: required(options, "wallet"),
      proposedAction: {
        type: options.type ?? "swap",
        from: options.from,
        to: options.to,
        amountUsd: options.amount ? Number(options.amount) : undefined,
        slippagePct: options.slippage ? Number(options.slippage) : undefined,
        chainId: options.chain ? Number(options.chain) : undefined
      },
      policy: {
        maxSingleAssetExposurePct: options["max-exposure"] ? Number(options["max-exposure"]) : 30,
        maxSlippagePct: options["max-slippage"] ? Number(options["max-slippage"]) : 0.5,
        maxActionUsd: options["max-action"] ? Number(options["max-action"]) : undefined
      }
    });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exitCode = result.decision === "blocked" ? 2 : 0;
    return;
  }

  if (command === "verify") {
    const attestation = JSON.parse(await readFile(required(options, "file"), "utf8"));
    const result = await client.verifyAttestation(attestation.attestation ?? attestation);
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }

  process.stdout.write(`Phylax CLI\n\nCommands:\n  preflight --wallet <address> --from USDC --to TSLA.x --amount 10000\n  verify --file <signed-response.json>\n\nOptions:\n  --endpoint <url>       Override the Phylax API base URL\n  --max-exposure <pct>   Maximum single-asset allocation\n  --max-slippage <pct>   Maximum proposed slippage\n  --max-action <usd>     Maximum action value\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
