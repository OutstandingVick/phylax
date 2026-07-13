export const reports = [
  {
    id: "rpt_incident_001",
    type: "incident",
    title: "TSLA.x Exposure and USDC Approval Incident",
    createdAt: new Date(Date.now() - 3 * 60_000).toISOString(),
    summary:
      "Phylax detected concentration and approval risk. Suggested rebalance lowers risk from 74 to 49 and improves health from 61 to 78.",
    riskScoreBefore: 74,
    riskScoreAfter: 49,
    healthBefore: 61,
    healthAfter: 78,
    recommendations: [
      "Reduce TSLA.x allocation below 25%",
      "Increase USDC and Treasury/RWA allocation",
      "Revoke unlimited USDC approval for 0x9ab...991"
    ]
  }
];
