#!/usr/bin/env node

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createPhylaxClient } from "../sdk/index.mjs";
import { tokenAssetsFromOnchainOsResponse, toPhylaxPortfolioSnapshot } from "../sdk/okx-evidence.mjs";

const execFileAsync = promisify(execFile);

function parseArgs(args) {
  const output = {};
  for (let index = 0; index < args.length; index += 1) {
    if (!args[index].startsWith("--")) continue;
    output[args[index].slice(2)] = args[index + 1];
    index += 1;
  }
  return output;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options.address) throw new Error("Provide --address with a public EVM wallet address.");
  const chains = options.chains ?? "xlayer";
  const executable = process.env.ONCHAINOS_BIN ?? "onchainos";
  const { stdout } = await execFileAsync(executable, [
    "portfolio",
    "all-balances",
    "--address",
    options.address,
    "--chains",
    chains,
    "--filter",
    "1"
  ]);
  const okxResponse = JSON.parse(stdout);
  if (!okxResponse.ok) throw new Error("The read-only OKX portfolio query did not complete successfully.");

  const snapshot = toPhylaxPortfolioSnapshot(tokenAssetsFromOnchainOsResponse(okxResponse), {
    chainId: options.chain ? Number(options.chain) : undefined
  });
  const phylax = createPhylaxClient({ baseUrl: options.endpoint });
  const result = await phylax.preflight({
    requestingAgentId: options.agent ?? "okx_live_evidence_bridge",
    walletAddress: options.address,
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
      blockLowConfidence: false
    },
    portfolioSnapshot: snapshot
  });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exitCode = result.decision === "blocked" ? 2 : 0;
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
