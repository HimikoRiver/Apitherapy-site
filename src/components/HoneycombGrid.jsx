"use client";

import { useMemo, useState } from "react";

const HEX_SIZE = 52;
const STROKE = 1.5;
const ROWS = 20;
const COLS = 40;
const EXTRA_PADDING = 4;

function hexPoints(size) {
  const w = Math.sqrt(3) * size;
  const h = size * 2;

  return [
    [w / 2, 0],
    [w, h * 0.25],
    [w, h * 0.75],
    [w / 2, h],
    [0, h * 0.75],
    [0, h * 0.25],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function HoneycombGrid() {
  const [mouse, setMouse] = useState(null);

  const width = Math.sqrt(3) * HEX_SIZE;
  const height = HEX_SIZE * 2;
  const verticalStep = HEX_SIZE * 1.5;
  const horizontalStep = width;
  const points = hexPoints(HEX_SIZE);

  const hexagons = useMemo(() => {
    const items = [];

    for (let row = -EXTRA_PADDING; row < ROWS + EXTRA_PADDING; row++) {
      for (let col = -EXTRA_PADDING; col < COLS + EXTRA_PADDING; col++) {
        const x = col * horizontalStep + (row % 2 ? width / 2 : 0);
        const y = row * verticalStep;

        items.push({
          id: `${row}-${col}`,
          x,
          y,
          cx: x + width / 2,
          cy: y + height / 2,
        });
      }
    }

    return items;
  }, [width, height, horizontalStep, verticalStep]);

  const minX = Math.min(...hexagons.map((h) => h.x)) - width;
  const maxX = Math.max(...hexagons.map((h) => h.x)) + width * 2;
  const minY = Math.min(...hexagons.map((h) => h.y)) - height;
  const maxY = Math.max(...hexagons.map((h) => h.y)) + height * 2;

  const svgWidth = maxX - minX;
  const svgHeight = maxY - minY;

  const handleMouseMove = (e) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();

    const px = ((e.clientX - rect.left) / rect.width) * svgWidth + minX;
    const py = ((e.clientY - rect.top) / rect.height) * svgHeight + minY;

    setMouse({ x: px, y: py });
  };

  const handleMouseLeave = () => {
    setMouse(null);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="honey-glow honey-glow-1" />
      <div className="honey-glow honey-glow-2" />
      <div className="honey-vignette" />

<svg
  viewBox={`${minX} ${minY} ${svgWidth} ${svgHeight}`}
  className="absolute inset-y-0 left-1/2 h-full w-[108%] max-w-none -translate-x-1/2"
  preserveAspectRatio="xMidYMid slice"
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
>
        <defs>
          <linearGradient id="hexStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4e0c00" />
            <stop offset="45%" stopColor="#c85a00" />
            <stop offset="100%" stopColor="#f2c55c" />
          </linearGradient>

          <radialGradient id="honeyFill" cx="50%" cy="40%" r="72%">
            <stop offset="0%" stopColor="rgba(255,240,170,0.98)" />
            <stop offset="28%" stopColor="rgba(255,204,95,0.95)" />
            <stop offset="58%" stopColor="rgba(227,132,24,0.78)" />
            <stop offset="100%" stopColor="rgba(105,40,0,0.16)" />
          </radialGradient>

          <filter id="glow" x="-90%" y="-90%" width="280%" height="280%">
            <feGaussianBlur stdDeviation="6.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {hexagons.map((hex) => {
          let intensity = 0;

          if (mouse) {
            const dx = mouse.x - hex.cx;
            const dy = mouse.y - hex.cy;
            const dist = Math.hypot(dx, dy);

            const radius = width * 2.15;
            intensity = clamp(1 - dist / radius, 0, 1);
            intensity = Math.pow(intensity, 1.8);
          }

          const fillOpacity = intensity * 0.88;
          const glowOpacity = intensity * 0.72;
          const strokeOpacity = 0.62 + intensity * 0.34;

          return (
            <g key={hex.id} transform={`translate(${hex.x}, ${hex.y})`}>
              <polygon
                points={points}
                fill="rgba(255,255,255,0.006)"
                stroke="url(#hexStroke)"
                strokeWidth={STROKE}
                opacity={strokeOpacity}
                style={{
                  transition:
                    "opacity 180ms ease-out, fill 180ms ease-out, stroke 180ms ease-out",
                }}
              />

              <polygon
                points={points}
                fill="url(#honeyFill)"
                opacity={fillOpacity}
                style={{
                  transition: "opacity 220ms ease-out",
                }}
              />

              <polygon
                points={points}
                fill="url(#honeyFill)"
                opacity={glowOpacity}
                filter="url(#glow)"
                style={{
                  transition: "opacity 280ms ease-out",
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}