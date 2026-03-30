"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const HEX_SIZE = 17;
const STROKE = 1.2;
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

export default function HoneycombGrid() {
  const containerRef = useRef(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const width = Math.sqrt(3) * HEX_SIZE;
  const height = HEX_SIZE * 2;
  const verticalStep = HEX_SIZE * 1.5;
  const horizontalStep = width;
  const points = useMemo(() => hexPoints(HEX_SIZE), []);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();

      setViewport({
        width: rect.width,
        height: rect.height,
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const gridMetrics = useMemo(() => {
    const safeWidth = Math.max(viewport.width, 320);
    const safeHeight = Math.max(viewport.height, 320);

    const cols =
      Math.ceil(safeWidth / horizontalStep) + EXTRA_PADDING * 2 + 2;
    const rows =
      Math.ceil(safeHeight / verticalStep) + EXTRA_PADDING * 2 + 2;

    const startRow = -EXTRA_PADDING;
    const endRow = rows - EXTRA_PADDING;
    const startCol = -EXTRA_PADDING;
    const endCol = cols - EXTRA_PADDING;

    const items = [];

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (let row = startRow; row < endRow; row++) {
      for (let col = startCol; col < endCol; col++) {
        const x = col * horizontalStep + (Math.abs(row) % 2 ? width / 2 : 0);
        const y = row * verticalStep;

        items.push({
          id: `${row}-${col}`,
          x,
          y,
        });

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }

    minX -= width;
    maxX += width * 2;
    minY -= height;
    maxY += height * 2;

    const svgWidth = maxX - minX;
    const svgHeight = maxY - minY;

    return {
      items,
      minX,
      minY,
      svgWidth,
      svgHeight,
    };
  }, [viewport.width, viewport.height, width, height, horizontalStep, verticalStep]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="honey-glow honey-glow-1" />
      <div className="honey-glow honey-glow-2" />
      <div className="honey-vignette" />

      <svg
        viewBox={`${gridMetrics.minX} ${gridMetrics.minY} ${gridMetrics.svgWidth} ${gridMetrics.svgHeight}`}
        width={gridMetrics.svgWidth}
        height={gridMetrics.svgHeight}
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `${gridMetrics.svgWidth}px`,
          height: `${gridMetrics.svgHeight}px`,
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="hexStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4e0c00" />
            <stop offset="45%" stopColor="#c85a00" />
            <stop offset="100%" stopColor="#f2c55c" />
          </linearGradient>
        </defs>

        {gridMetrics.items.map((hex) => (
          <g key={hex.id} transform={`translate(${hex.x}, ${hex.y})`}>
            <polygon
              points={points}
              fill="rgba(255,255,255,0.004)"
              stroke="url(#hexStroke)"
              strokeWidth={STROKE}
              opacity="0.62"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}