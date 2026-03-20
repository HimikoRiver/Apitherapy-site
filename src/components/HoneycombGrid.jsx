"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const HEX_SIZE = 17;
const STROKE = 1.2;
const EXTRA_PADDING = 4;
const INTERACTION_RADIUS_MULTIPLIER = 2.35;

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
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const mouseRef = useRef(null);
  const rafRef = useRef(null);
  const polygonRefs = useRef([]);
  const glowRefs = useRef([]);
  const fillRefs = useRef([]);
  const lastActiveSetRef = useRef(new Set());

  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const width = Math.sqrt(3) * HEX_SIZE;
  const height = HEX_SIZE * 2;
  const verticalStep = HEX_SIZE * 1.5;
  const horizontalStep = width;
  const points = hexPoints(HEX_SIZE);

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

    for (let row = startRow; row < endRow; row++) {
      for (let col = startCol; col < endCol; col++) {
        const x = col * horizontalStep + (Math.abs(row) % 2 ? width / 2 : 0);
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

    const minX = Math.min(...items.map((h) => h.x)) - width;
    const maxX = Math.max(...items.map((h) => h.x)) + width * 2;
    const minY = Math.min(...items.map((h) => h.y)) - height;
    const maxY = Math.max(...items.map((h) => h.y)) + height * 2;

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

  useEffect(() => {
    polygonRefs.current = polygonRefs.current.slice(0, gridMetrics.items.length);
    fillRefs.current = fillRefs.current.slice(0, gridMetrics.items.length);
    glowRefs.current = glowRefs.current.slice(0, gridMetrics.items.length);
  }, [gridMetrics.items.length]);

  useEffect(() => {
    const radius = width * INTERACTION_RADIUS_MULTIPLIER;
    const radiusSq = radius * radius;

    const resetHex = (index) => {
      const strokeEl = polygonRefs.current[index];
      const fillEl = fillRefs.current[index];
      const glowEl = glowRefs.current[index];

      if (strokeEl) strokeEl.style.opacity = "0.62";
      if (fillEl) fillEl.style.opacity = "0";
      if (glowEl) glowEl.style.opacity = "0";
    };

    const animate = () => {
      const mouse = mouseRef.current;
      const activeSet = new Set();

      if (mouse) {
        for (let i = 0; i < gridMetrics.items.length; i++) {
          const hex = gridMetrics.items[i];
          const dx = mouse.x - hex.cx;
          const dy = mouse.y - hex.cy;
          const distSq = dx * dx + dy * dy;

          if (distSq > radiusSq) continue;

          const dist = Math.sqrt(distSq);
          let intensity = clamp(1 - dist / radius, 0, 1);
          intensity = Math.pow(intensity, 1.8);

          const fillOpacity = intensity * 0.82;
          const glowOpacity = intensity * 0.36;
          const strokeOpacity = 0.62 + intensity * 0.28;

          const strokeEl = polygonRefs.current[i];
          const fillEl = fillRefs.current[i];
          const glowEl = glowRefs.current[i];

          if (strokeEl) strokeEl.style.opacity = String(strokeOpacity);
          if (fillEl) fillEl.style.opacity = String(fillOpacity);
          if (glowEl) glowEl.style.opacity = String(glowOpacity);

          activeSet.add(i);
        }
      }

      for (const index of lastActiveSetRef.current) {
        if (!activeSet.has(index)) {
          resetHex(index);
        }
      }

      lastActiveSetRef.current = activeSet;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gridMetrics.items, width]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const px =
        ((e.clientX - rect.left) / rect.width) * gridMetrics.svgWidth +
        gridMetrics.minX;
      const py =
        ((e.clientY - rect.top) / rect.height) * gridMetrics.svgHeight +
        gridMetrics.minY;

      mouseRef.current = { x: px, y: py };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("blur", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("blur", handleMouseLeave);
    };
  }, [gridMetrics.minX, gridMetrics.minY, gridMetrics.svgWidth, gridMetrics.svgHeight]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <div className="honey-glow honey-glow-1" />
      <div className="honey-glow honey-glow-2" />
      <div className="honey-vignette" />

      <svg
        ref={svgRef}
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

          <radialGradient id="honeyFill" cx="50%" cy="40%" r="72%">
            <stop offset="0%" stopColor="rgba(255,240,170,0.96)" />
            <stop offset="28%" stopColor="rgba(255,204,95,0.9)" />
            <stop offset="58%" stopColor="rgba(227,132,24,0.6)" />
            <stop offset="100%" stopColor="rgba(105,40,0,0.1)" />
          </radialGradient>

          <filter id="glow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {gridMetrics.items.map((hex, index) => (
          <g key={hex.id} transform={`translate(${hex.x}, ${hex.y})`}>
            <polygon
              ref={(el) => {
                polygonRefs.current[index] = el;
              }}
              points={points}
              fill="rgba(255,255,255,0.004)"
              stroke="url(#hexStroke)"
              strokeWidth={STROKE}
              opacity="0.62"
              vectorEffect="non-scaling-stroke"
              style={{
                transition: "opacity 140ms ease-out",
              }}
            />

            <polygon
              ref={(el) => {
                fillRefs.current[index] = el;
              }}
              points={points}
              fill="url(#honeyFill)"
              opacity="0"
              style={{
                transition: "opacity 140ms ease-out",
              }}
            />

            <polygon
              ref={(el) => {
                glowRefs.current[index] = el;
              }}
              points={points}
              fill="url(#honeyFill)"
              opacity="0"
              filter="url(#glow)"
              style={{
                transition: "opacity 180ms ease-out",
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}