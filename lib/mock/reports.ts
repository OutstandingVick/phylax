export const reports = [
  {
    id: "rpt_incident_001",
    title: "TSLA.x Exposure and USDC Approval Incident",
    summary:
      "Phylax detected concentration and approval risk. Suggested rebalance lowers risk from 74 to 49 and improves health from 61 to 78.",
    riskScoreBefore: 74,
    riskScoreAfter: 49,
    healthBefore: 61,
    healthAfter: 78,
    recommendations: [
      "Reduce TSLA.x allocation below 25%",
      "Increase USDC/RWA defensive allocation",
      "Revoke unlimited USDC approval for 0x9ab...991"
    ]
  }
];
