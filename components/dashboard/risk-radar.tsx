"use client";

const data = [
  { factor: "Market", score: 68 },
  { factor: "Liquidity", score: 72 },
  { factor: "Concentration", score: 86 },
  { factor: "Approval", score: 79 },
  { factor: "Volatility", score: 63 },
  { factor: "Execution", score: 55 }
];

export function RiskRadar() {
  const center = 130;
  const radius = 94;
  const points = data.map((item, index) => {
    const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
    const r = radius * (item.score / 100);
    return {
      x: center + Math.cos(angle) * r,
      y: center + Math.sin(angle) * r,
      labelX: center + Math.cos(angle) * (radius + 22),
      labelY: center + Math.sin(angle) * (radius + 22),
      item
    };
  });
  const polygon = points.map((point) => `${point.x},${point.y}`).join(" ");
  return (
    <div className="h-72 w-full">
      <svg viewBox="0 0 260 260" className="h-full w-full" role="img" aria-label="Guardian risk radar">
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <circle key={scale} cx={center} cy={center} r={radius * scale} fill="none" stroke="var(--border)" />
        ))}
        {points.map((point) => <line key={point.item.factor} x1={center} y1={center} x2={point.labelX} y2={point.labelY} stroke="var(--border)" />)}
        <polygon points={polygon} fill="var(--accent)" fillOpacity=".16" stroke="var(--accent)" strokeWidth="2" />
        {points.map((point) => <circle key={point.item.factor} cx={point.x} cy={point.y} r="3.5" fill="var(--accent)" />)}
        {points.map((point) => (
          <text key={point.item.factor} x={point.labelX} y={point.labelY} textAnchor="middle" dominantBaseline="middle" fill="var(--text-muted)" fontSize="10">
            {point.item.factor}
          </text>
        ))}
      </svg>
    </div>
  );
}
