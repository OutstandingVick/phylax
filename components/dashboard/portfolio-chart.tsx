"use client";

import { performanceData } from "@/lib/mock/portfolio";

export function PortfolioChart() {
  const width = 640;
  const height = 260;
  const values = performanceData.map((item) => item.value);
  const min = Math.min(...values) * 0.98;
  const max = Math.max(...values) * 1.01;
  const points = performanceData.map((item, index) => {
    const x = (index / (performanceData.length - 1)) * width;
    const y = height - ((item.value - min) / (max - min)) * (height - 28) - 12;
    return { x, y, item };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `0,${height} ${line} ${width},${height}`;
  return (
    <div className="h-72 w-full overflow-hidden rounded-lg">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" role="img" aria-label="Portfolio performance chart">
        <defs>
          <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity=".42" />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity=".03" />
          </linearGradient>
        </defs>
        {[52, 104, 156, 208].map((y) => <line key={y} x1="0" x2={width} y1={y} y2={y} stroke="var(--border)" />)}
        <polygon points={area} fill="url(#portfolioFill)" />
        <polyline points={line} fill="none" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => <circle key={point.item.date} cx={point.x} cy={point.y} r="4" fill="var(--background)" stroke="var(--primary)" strokeWidth="3" />)}
        {points.map((point, index) => index % 2 === 0 ? <text key={point.item.date} x={point.x} y={height - 4} textAnchor="middle" fill="var(--text-muted)" fontSize="12">{point.item.date}</text> : null)}
      </svg>
    </div>
  );
}
