"use client";

import { useEffect, useRef } from "react";

const HEX_SIZE = 17;
const STROKE = 1.15;
const EXTRA_PADDING = 4;
const INTERACTION_RADIUS_MULTIPLIER = 2.5;
const DESKTOP_BREAKPOINT = 1280;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function hexVertices(cx, cy, size) {
  const points = [];

  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    points.push({
      x: cx + size * Math.cos(angle),
      y: cy + size * Math.sin(angle),
    });
  }

  return points;
}

function drawHexPath(ctx, cx, cy, size) {
  const points = hexVertices(cx, cy, size);

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  ctx.closePath();
}

function drawHoneyInside(ctx, cx, cy, size, level, time, phase) {
  if (level <= 0.001) return;

  const power = Math.pow(level, 1.35);

  const shimmer = 0.5 + 0.5 * Math.sin(time * 0.0016 + phase);
  const shimmerSoft = 0.5 + 0.5 * Math.sin(time * 0.0011 + phase * 0.7);
  const driftX = Math.sin(time * 0.0012 + phase) * 1.2 * level;
  const driftY = Math.cos(time * 0.001 + phase * 1.13) * 0.75 * level;
  const specShiftX = Math.sin(time * 0.0018 + phase * 1.4) * 1.6 * level;
  const specShiftY = Math.cos(time * 0.0015 + phase * 0.9) * 0.9 * level;

  ctx.save();
  drawHexPath(ctx, cx, cy, size - 0.55);
  ctx.clip();

  const fillGradient = ctx.createLinearGradient(
    cx + driftX * 0.15,
    cy - size * 1.05 + driftY,
    cx - driftX * 0.08,
    cy + size * 1.1
  );
  fillGradient.addColorStop(
    0,
    `rgba(255, 247, 205, ${0.04 + power * (0.24 + shimmer * 0.05)})`
  );
  fillGradient.addColorStop(
    0.18,
    `rgba(255, 224, 142, ${0.08 + power * (0.4 + shimmer * 0.06)})`
  );
  fillGradient.addColorStop(
    0.46,
    `rgba(255, 186, 66, ${0.14 + power * (0.54 + shimmerSoft * 0.08)})`
  );
  fillGradient.addColorStop(
    0.78,
    `rgba(214, 116, 12, ${0.11 + power * (0.34 + shimmer * 0.04)})`
  );
  fillGradient.addColorStop(
    1,
    `rgba(118, 44, 0, ${0.07 + power * (0.2 + shimmerSoft * 0.03)})`
  );

  ctx.fillStyle = fillGradient;
  ctx.fillRect(cx - size * 1.6, cy - size * 1.6, size * 3.2, size * 3.2);

  const warmCore = ctx.createRadialGradient(
    cx - size * 0.18 + driftX,
    cy - size * 0.22 + driftY,
    size * 0.08,
    cx + driftX * 0.4,
    cy + driftY * 0.25,
    size * (1.18 + shimmer * 0.04)
  );
  warmCore.addColorStop(
    0,
    `rgba(255, 248, 215, ${0.09 + power * (0.3 + shimmer * 0.06)})`
  );
  warmCore.addColorStop(
    0.28,
    `rgba(255, 214, 112, ${0.07 + power * (0.24 + shimmerSoft * 0.05)})`
  );
  warmCore.addColorStop(
    0.65,
    `rgba(255, 170, 45, ${0.04 + power * (0.15 + shimmer * 0.04)})`
  );
  warmCore.addColorStop(1, "rgba(255, 140, 20, 0)");

  ctx.fillStyle = warmCore;
  ctx.fillRect(cx - size * 1.6, cy - size * 1.6, size * 3.2, size * 3.2);

  const lowerDensity = ctx.createLinearGradient(
    cx,
    cy - size * 0.1,
    cx,
    cy + size * 1.05 + driftY * 0.4
  );
  lowerDensity.addColorStop(0, "rgba(120, 40, 0, 0)");
  lowerDensity.addColorStop(
    0.35,
    `rgba(160, 68, 0, ${0.02 + power * (0.11 + shimmerSoft * 0.03)})`
  );
  lowerDensity.addColorStop(
    1,
    `rgba(110, 34, 0, ${0.05 + power * (0.26 + shimmer * 0.04)})`
  );

  ctx.fillStyle = lowerDensity;
  ctx.fillRect(cx - size * 1.5, cy - size * 0.2, size * 3, size * 1.8);

  const specular = ctx.createLinearGradient(
    cx - size * 0.95 + specShiftX,
    cy - size * 0.9 + specShiftY,
    cx + size * 0.35 + specShiftX * 0.25,
    cy + size * 0.1 + specShiftY * 0.25
  );
  specular.addColorStop(
    0,
    `rgba(255, 255, 245, ${0.03 + power * (0.32 + shimmer * 0.08)})`
  );
  specular.addColorStop(
    0.3,
    `rgba(255, 245, 200, ${0.02 + power * (0.24 + shimmerSoft * 0.06)})`
  );
  specular.addColorStop(
    0.7,
    `rgba(255, 220, 145, ${0.01 + power * (0.14 + shimmer * 0.04)})`
  );
  specular.addColorStop(1, "rgba(255, 210, 120, 0)");

  ctx.fillStyle = specular;
  ctx.beginPath();
  ctx.ellipse(
    cx - size * 0.12 + specShiftX,
    cy - size * 0.48 + specShiftY,
    size * (0.88 + shimmer * 0.03),
    size * (0.36 + shimmerSoft * 0.02),
    -0.28,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.restore();
}

export default function HoneycombGridCanvas({ interactive = true }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const layoutRef = useRef(null);
  const baseCanvasRef = useRef(null);
  const resizeRafRef = useRef(null);

  const interactiveRef = useRef(interactive);
  const isDesktopRef = useRef(true);

  const pointerRef = useRef({
    clientX: null,
    clientY: null,
    x: null,
    y: null,
    active: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getInteractiveState = () => {
      return interactiveRef.current && isDesktopRef.current;
    };

    const buildLayout = (cssWidth, cssHeight) => {
      const hexWidth = Math.sqrt(3) * HEX_SIZE;
      const hexHeight = HEX_SIZE * 2;
      const horizontalStep = hexWidth;
      const verticalStep = HEX_SIZE * 1.5;

      const cols =
        Math.ceil(cssWidth / horizontalStep) + EXTRA_PADDING * 2 + 2;
      const rows =
        Math.ceil(cssHeight / verticalStep) + EXTRA_PADDING * 2 + 2;

      const startRow = -EXTRA_PADDING;
      const endRow = rows - EXTRA_PADDING;
      const startCol = -EXTRA_PADDING;
      const endCol = cols - EXTRA_PADDING;

      const items = [];

      for (let row = startRow; row < endRow; row++) {
        for (let col = startCol; col < endCol; col++) {
          const cx =
            col * horizontalStep +
            (Math.abs(row) % 2 ? hexWidth / 2 : 0) +
            hexWidth / 2;
          const cy = row * verticalStep + hexHeight / 2;

          items.push({
            row,
            col,
            cx,
            cy,
            level: 0,
            phase: (row * 0.73 + col * 1.17) % (Math.PI * 2),
          });
        }
      }

      return {
        cssWidth,
        cssHeight,
        hexWidth,
        hexHeight,
        horizontalStep,
        verticalStep,
        items,
      };
    };

    const buildBaseCanvas = () => {
      const layout = layoutRef.current;
      if (!layout) return;

      const { cssWidth, cssHeight, items } = layout;

      const baseCanvas = document.createElement("canvas");
      baseCanvas.width = Math.max(1, Math.round(cssWidth));
      baseCanvas.height = Math.max(1, Math.round(cssHeight));

      const baseCtx = baseCanvas.getContext("2d");
      if (!baseCtx) return;

      baseCtx.clearRect(0, 0, cssWidth, cssHeight);

      const strokeGradient = baseCtx.createLinearGradient(
        0,
        0,
        cssWidth,
        cssHeight
      );
      strokeGradient.addColorStop(0, "rgba(78, 12, 0, 0.95)");
      strokeGradient.addColorStop(0.42, "rgba(200, 90, 0, 0.92)");
      strokeGradient.addColorStop(1, "rgba(242, 197, 92, 0.92)");

      const innerStrokeGradient = baseCtx.createLinearGradient(
        cssWidth * 0.1,
        0,
        cssWidth * 0.9,
        cssHeight
      );
      innerStrokeGradient.addColorStop(0, "rgba(255, 214, 128, 0.05)");
      innerStrokeGradient.addColorStop(0.5, "rgba(255, 225, 165, 0.16)");
      innerStrokeGradient.addColorStop(1, "rgba(255, 205, 110, 0.07)");

      const fillGradient = baseCtx.createRadialGradient(
        cssWidth * 0.5,
        cssHeight * 0.42,
        cssWidth * 0.07,
        cssWidth * 0.5,
        cssHeight * 0.42,
        cssWidth * 0.75
      );
      fillGradient.addColorStop(0, "rgba(255, 232, 160, 0.03)");
      fillGradient.addColorStop(0.33, "rgba(255, 186, 76, 0.018)");
      fillGradient.addColorStop(0.68, "rgba(168, 84, 7, 0.01)");
      fillGradient.addColorStop(1, "rgba(25, 8, 0, 0)");

      for (const hex of items) {
        drawHexPath(baseCtx, hex.cx, hex.cy, HEX_SIZE);
        baseCtx.fillStyle = fillGradient;
        baseCtx.fill();

        baseCtx.lineWidth = STROKE;
        baseCtx.strokeStyle = strokeGradient;
        baseCtx.stroke();

        drawHexPath(baseCtx, hex.cx, hex.cy, HEX_SIZE - 0.3);
        baseCtx.lineWidth = 0.45;
        baseCtx.strokeStyle = innerStrokeGradient;
        baseCtx.stroke();
      }

      baseCanvasRef.current = baseCanvas;
    };

    const updatePointerLocalPosition = () => {
      if (
        pointerRef.current.clientX === null ||
        pointerRef.current.clientY === null ||
        !containerRef.current
      ) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      pointerRef.current.x = pointerRef.current.clientX - rect.left;
      pointerRef.current.y = pointerRef.current.clientY - rect.top;
    };

    const resetLevels = () => {
      const layout = layoutRef.current;
      if (!layout) return;

      for (const hex of layout.items) {
        hex.level = 0;
      }
    };

    const updateLevels = () => {
      const layout = layoutRef.current;
      if (!layout) return false;

      const { items, hexWidth } = layout;
      const radius = hexWidth * INTERACTION_RADIUS_MULTIPLIER;
      const radiusSq = radius * radius;
      const { x, y, active } = pointerRef.current;

      let hasActive = false;

      for (const hex of items) {
        let target = 0;

        if (getInteractiveState() && active && x !== null && y !== null) {
          const dx = x - hex.cx;
          const dy = y - hex.cy;
          const distSq = dx * dx + dy * dy;

          if (distSq <= radiusSq) {
            const dist = Math.sqrt(distSq);
            let intensity = 1 - dist / radius;
            intensity = clamp(intensity, 0, 1);
            intensity = Math.pow(intensity, 1.55);
            intensity = Math.min(1, intensity * 1.32);
            target = intensity;
          }
        }

        hex.level = target;

        if (target > 0.001) {
          hasActive = true;
        }
      }

      return hasActive;
    };

    const drawInteractive = (time) => {
      if (!getInteractiveState()) return;

      const layout = layoutRef.current;
      if (!layout) return;

      for (const hex of layout.items) {
        const level = hex.level;
        if (level < 0.01) continue;

        const edgeBoost = Math.pow(level, 1.25);

        drawHoneyInside(ctx, hex.cx, hex.cy, HEX_SIZE, level, time, hex.phase);

        ctx.save();
        ctx.shadowBlur = 10 + edgeBoost * 10;
        ctx.shadowColor = `rgba(255, 192, 88, ${edgeBoost * 0.18})`;

        ctx.lineWidth = STROKE + edgeBoost * 0.24;
        ctx.strokeStyle = `rgba(255, 214, 124, ${0.14 + edgeBoost * 0.46})`;
        drawHexPath(ctx, hex.cx, hex.cy, HEX_SIZE);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.lineWidth = 0.55 + edgeBoost * 0.14;
        ctx.strokeStyle = `rgba(255, 241, 200, ${0.06 + edgeBoost * 0.22})`;
        drawHexPath(ctx, hex.cx, hex.cy, HEX_SIZE - 0.28);
        ctx.stroke();

        ctx.restore();
      }
    };

    const draw = (time = performance.now()) => {
      const layout = layoutRef.current;
      const baseCanvas = baseCanvasRef.current;

      if (!layout || !baseCanvas) {
        frameRef.current = null;
        return;
      }

      const { cssWidth, cssHeight } = layout;
      const hasActive = updateLevels();

      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.drawImage(baseCanvas, 0, 0);
      drawInteractive(time);

      frameRef.current = null;

      if (getInteractiveState() && hasActive) {
        scheduleDraw();
      }
    };

    const scheduleDraw = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(draw);
    };

    const updateDeviceMode = () => {
      const nextIsDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
      const modeChanged = isDesktopRef.current !== nextIsDesktop;

      isDesktopRef.current = nextIsDesktop;

      if (!nextIsDesktop) {
        pointerRef.current.active = false;
        pointerRef.current.x = null;
        pointerRef.current.y = null;
        pointerRef.current.clientX = null;
        pointerRef.current.clientY = null;
        resetLevels();
      }

      if (modeChanged) {
        scheduleDraw();
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const cssWidth = Math.round(rect.width);
      const cssHeight = Math.round(rect.height);

      if (cssWidth < 20 || cssHeight < 20) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      layoutRef.current = buildLayout(cssWidth, cssHeight);
      buildBaseCanvas();
      updatePointerLocalPosition();
      scheduleDraw();
    };

    const requestResize = () => {
      if (resizeRafRef.current) return;

      resizeRafRef.current = requestAnimationFrame(() => {
        resizeRafRef.current = null;
        updateDeviceMode();
        resize();
      });
    };

    const handlePointerMove = (event) => {
      if (!getInteractiveState()) return;

      pointerRef.current.clientX = event.clientX;
      pointerRef.current.clientY = event.clientY;
      pointerRef.current.active = true;

      updatePointerLocalPosition();
      scheduleDraw();
    };

    const handlePointerLeave = () => {
      if (!getInteractiveState()) return;

      pointerRef.current.active = false;
      scheduleDraw();
    };

    const handleScroll = () => {
      if (!getInteractiveState()) return;

      updatePointerLocalPosition();
      scheduleDraw();
    };

    interactiveRef.current = interactive;
    updateDeviceMode();
    resize();

    const observer = new ResizeObserver(requestResize);
    observer.observe(container);

    window.addEventListener("resize", requestResize);
    window.addEventListener("orientationchange", requestResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", requestResize);
      window.removeEventListener("orientationchange", requestResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      if (resizeRafRef.current) {
        cancelAnimationFrame(resizeRafRef.current);
        resizeRafRef.current = null;
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}