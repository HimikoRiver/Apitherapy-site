"use client";

import { motion } from "framer-motion";

const bees = [
  {
    id: 1,
    size: 90,
    top: "12%",
    left: "8%",
    x: [0, 70, 140, 80, 0],
    y: [0, -30, 10, 60, 0],
    rotate: [0, 8, -5, 4, 0],
    duration: 14,
  },
  {
    id: 2,
    size: 85,
    top: "20%",
    left: "72%",
    x: [0, -90, -150, -70, 0],
    y: [0, 40, -20, -60, 0],
    rotate: [0, -10, 7, -4, 0],
    duration: 12,
  },
  {
    id: 3,
    size: 95,
    top: "60%",
    left: "12%",
    x: [0, 60, 150, 70, 0],
    y: [0, -70, -10, 45, 0],
    rotate: [0, 7, -6, 3, 0],
    duration: 15,
  },
  {
    id: 4,
    size: 88,
    top: "70%",
    left: "76%",
    x: [0, -70, -130, -55, 0],
    y: [0, -35, 35, 65, 0],
    rotate: [0, -7, 6, -3, 0],
    duration: 13,
  },
];

export default function BeeSwarm() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-50"
    >
      {bees.map((bee) => (
        <motion.div
          key={bee.id}
          className="absolute"
          style={{
            top: bee.top,
            left: bee.left,
            width: `${bee.size}px`,
            height: `${bee.size}px`,
            willChange: "transform",
          }}
          animate={{
            x: bee.x,
            y: bee.y,
            rotate: bee.rotate,
          }}
          transition={{
            duration: bee.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.img
            src="/img/bee1.webp"
            alt=""
            draggable={false}
            className="block h-full w-full object-contain select-none"
            style={{
              filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.35))",
              willChange: "transform",
            }}
            animate={{
              y: [0, -2, 0, 2, 0],
              scale: [1, 1.03, 1, 0.98, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}