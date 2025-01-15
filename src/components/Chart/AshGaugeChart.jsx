'use client'

import React from 'react';

export default function AshGaugeChart({ value, maxValue, size = 50, fillColor = '#A9A9A9', strokeColor = '#A9A9A9' }) {
  const percentage = value / maxValue;

  const stonePath = `
    M ${size * 0.25} ${size * 0.5}
    C ${size * 0.375} ${size * 0.25}, ${size * 0.75} ${size * 0.25}, ${size * 0.875} ${size * 0.5}
    L ${size * 0.75} ${size * 0.75}
    C ${size * 0.625} ${size}, ${size * 0.375} ${size}, ${size * 0.25} ${size * 0.75}
    Z
  `;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <clipPath id={`stoneClip-${size}`}>
          <path d={stonePath} />
        </clipPath>
      </defs>
      <g clipPath={`url(#stoneClip-${size})`}>
        <rect
          x="0"
          y={size - size * percentage}
          width={size}
          height={size * percentage}
          fill={fillColor}
        />
      </g>
      <path d={stonePath} fill="none" stroke={strokeColor} strokeWidth="10" />
    </svg>
  );
};