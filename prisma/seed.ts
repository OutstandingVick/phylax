/**
 * Optional Prisma seed script for the Phylax demo dataset.
 * Install Prisma client before running this in a productionized setup.
 */
import { portfolioOverview } from "../lib/mock/portfolio";
import { holdings } from "../lib/mock/holdings";
import { alerts } from "../lib/mock/alerts";

console.log(
  JSON.stringify(
    {
      user: { id: "usr_demo_001", plan: "Free", status: "demo" },
      wallet: { id: "wal_demo_001", address: portfolioOverview.walletAddress, chainId: "xlayer-demo" },
      portfolio: portfolioOverview,
      holdings,
      alerts
    },
    null,
    2
  )
);
