"use client";

const bees = [
  {
    id: 1,
    size: 18,
    top: "18%",
    left: "34%",
    delay: "0s",
    duration: "5.4s",
    driftX: -8,
    driftY: -14,
    rotate: 10,
  },
  {
    id: 2,
    size: 16,
    top: "30%",
    left: "56%",
    delay: "0.8s",
    duration: "4.8s",
    driftX: 10,
    driftY: -10,
    rotate: -8,
  },
  {
    id: 3,
    size: 15,
    top: "44%",
    left: "68%",
    delay: "1.3s",
    duration: "5.1s",
    driftX: 8,
    driftY: -16,
    rotate: 14,
  },
  {
    id: 4,
    size: 17,
    top: "56%",
    left: "26%",
    delay: "0.4s",
    duration: "5.7s",
    driftX: -10,
    driftY: -12,
    rotate: -12,
  },
  {
    id: 5,
    size: 14,
    top: "64%",
    left: "52%",
    delay: "1.1s",
    duration: "4.9s",
    driftX: 6,
    driftY: -9,
    rotate: 6,
  },
  {
    id: 6,
    size: 13,
    top: "72%",
    left: "64%",
    delay: "1.7s",
    duration: "5.8s",
    driftX: 9,
    driftY: -8,
    rotate: -10,
  },
];

function MiniBee({ bee }) {
  return (
    <div
      className="absolute"
      style={{
        top: bee.top,
        left: bee.left,
        width: `${bee.size}px`,
        height: `${bee.size * 0.72}px`,
        animation: `beeOrbit ${bee.duration} ease-in-out infinite`,
        animationDelay: bee.delay,
        ["--drift-x"]: `${bee.driftX}px`,
        ["--drift-y"]: `${bee.driftY}px`,
        ["--bee-rotate"]: `${bee.rotate}deg`,
      }}
    >
      <div className="relative h-full w-full">
        <div
          className="absolute left-[22%] top-[4%] h-[42%] w-[34%] rounded-full border border-white/30 bg-white/30 blur-[0.4px]"
          style={{
            transform: "rotate(-26deg)",
            animation: `beeWingLeft 0.22s ease-in-out infinite alternate`,
          }}
        />
        <div
          className="absolute right-[20%] top-[4%] h-[42%] w-[34%] rounded-full border border-white/30 bg-white/30 blur-[0.4px]"
          style={{
            transform: "rotate(26deg)",
            animation: `beeWingRight 0.22s ease-in-out infinite alternate`,
          }}
        />

        <div className="absolute left-[14%] top-[28%] h-[52%] w-[72%] rounded-full bg-[#f2ba2a] shadow-[0_0_8px_rgba(255,196,66,0.28)]">
          <div className="absolute left-[2%] top-[16%] h-[68%] w-[18%] rounded-full bg-[#2f2414]" />
          <div className="absolute left-[40%] top-[14%] h-[72%] w-[14%] rounded-full bg-[#2f2414]" />
          <div className="absolute right-[6%] top-[20%] h-[60%] w-[13%] rounded-full bg-[#2f2414]" />
        </div>

        <div className="absolute right-[6%] top-[34%] h-[24%] w-[20%] rounded-full bg-[#2f2414]" />

        <div className="absolute inset-[-10px] rounded-full bg-amber-200/12 blur-xl" />
      </div>

      <style jsx>{`
        @keyframes beeOrbit {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(var(--bee-rotate)) scale(1);
          }
          20% {
            transform: translate3d(calc(var(--drift-x) * 0.55), calc(var(--drift-y) * 0.45), 0)
              rotate(calc(var(--bee-rotate) + 5deg)) scale(1.03);
          }
          45% {
            transform: translate3d(var(--drift-x), var(--drift-y), 0)
              rotate(calc(var(--bee-rotate) - 4deg)) scale(0.98);
          }
          70% {
            transform: translate3d(calc(var(--drift-x) * -0.45), calc(var(--drift-y) * 0.35), 0)
              rotate(calc(var(--bee-rotate) + 7deg)) scale(1.02);
          }
        }

        @keyframes beeWingLeft {
          from {
            transform: rotate(-34deg) translateY(0);
            opacity: 0.55;
          }
          to {
            transform: rotate(-14deg) translateY(-1px);
            opacity: 0.92;
          }
        }

        @keyframes beeWingRight {
          from {
            transform: rotate(34deg) translateY(0);
            opacity: 0.55;
          }
          to {
            transform: rotate(14deg) translateY(-1px);
            opacity: 0.92;
          }
        }
      `}</style>
    </div>
  );
}

export default function AboutBeeParticles() {
  return (
    <div className="pointer-events-none absolute bottom-[8px] right-[6px] z-10 h-[150px] w-[140px] lg:hidden sm:bottom-[10px] sm:right-[10px] sm:h-[165px] sm:w-[155px] md:bottom-[14px] md:right-[16px] md:h-[180px] md:w-[180px]">
      <div className="absolute left-1/2 top-1/2 h-24 w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/6 blur-3xl" />

      <div className="absolute inset-0">
        {bees.map((bee) => (
          <MiniBee key={bee.id} bee={bee} />
        ))}
      </div>
    </div>
  );
}