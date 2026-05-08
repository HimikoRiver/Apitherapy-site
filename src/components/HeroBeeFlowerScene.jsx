"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  PerspectiveCamera,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { Box3, Vector3 } from "three";

const BEE_SURFACE_OFFSET_Y = -0.28;
const BEE_OFFSET_X = -0.06;
const BEE_OFFSET_Z = 0.02;
const BEE_SCALE = 0.045;

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function Flower({ onActiveChange, flowerPivotRef }) {
  const modelRef = useRef(null);

  const tiltX = useRef(-0.06);
  const tiltZ = useRef(-0.06);
  const targetX = useRef(-0.06);
  const targetZ = useRef(-0.06);

  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const { scene } = useGLTF("/models/flower-optimized.glb", true);

  useEffect(() => {
    scene.traverse((c) => {
      if (!c.isMesh) return;

      c.castShadow = false;
      c.receiveShadow = false;

      if (c.material) {
        c.material.roughness = 0.72;
        c.material.metalness = 0;
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (!flowerPivotRef.current) return;

    const t = clock.getElapsedTime();

    tiltX.current += (targetX.current - tiltX.current) * 0.08;
    tiltZ.current += (targetZ.current - tiltZ.current) * 0.08;

    flowerPivotRef.current.rotation.x =
      tiltX.current + Math.sin(t * 0.45) * 0.004;

    flowerPivotRef.current.rotation.y = -0.68;

    flowerPivotRef.current.rotation.z =
      tiltZ.current + Math.sin(t * 0.55) * 0.004;
  });

  return (
    <group position={[0.35, -0.80, -0.25]} scale={1.45}>
      <group
        ref={flowerPivotRef}
        rotation={[-0.06, -0.68, -0.06]}
        onPointerOver={(e) => {
          e.stopPropagation();
          onActiveChange(true);
          document.body.style.cursor = "grab";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();

          if (!dragging.current) {
            targetX.current = -0.06;
            targetZ.current = -0.06;
            onActiveChange(false);
            document.body.style.cursor = "default";
          }
        }}
        onPointerDown={(e) => {
          e.stopPropagation();

          dragging.current = true;
          last.current = { x: e.clientX, y: e.clientY };

          document.body.style.cursor = "grabbing";
          onActiveChange(true);

          e.target.setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;

          const dx = e.clientX - last.current.x;
          const dy = e.clientY - last.current.y;

          last.current = { x: e.clientX, y: e.clientY };

          targetZ.current = clamp(targetZ.current - dx * 0.002, -0.18, 0.08);
          targetX.current = clamp(targetX.current - dy * 0.002, -0.16, 0.06);
        }}
        onPointerUp={(e) => {
          e.stopPropagation();

          dragging.current = false;

          targetX.current = -0.06;
          targetZ.current = -0.06;

          document.body.style.cursor = "grab";
          onActiveChange(false);

          e.target.releasePointerCapture?.(e.pointerId);
        }}
      >
        <Float speed={0.35} rotationIntensity={0.01} floatIntensity={0.01}>
          <primitive ref={modelRef} object={scene} />
        </Float>
      </group>
    </group>
  );
}

function Bee({ flowerPivotRef }) {
  const groupRef = useRef(null);
  const box = useRef(new Box3());
  const target = useRef(new Vector3());

  const { scene, animations } = useGLTF("/models/bee-optimized.glb");
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    Object.values(actions || {}).forEach((a) => {
      a?.reset().fadeIn(0.3).play();
    });
  }, [actions]);

  useFrame(({ clock }) => {
    if (!groupRef.current || !flowerPivotRef.current) return;

    const t = clock.getElapsedTime();

    box.current.setFromObject(flowerPivotRef.current);

    const cx = (box.current.min.x + box.current.max.x) / 2;
    const cz = (box.current.min.z + box.current.max.z) / 2;

    target.current.set(
      cx + BEE_OFFSET_X,
      box.current.max.y + BEE_SURFACE_OFFSET_Y,
      cz + BEE_OFFSET_Z
    );

    groupRef.current.position.set(
      target.current.x,
      target.current.y + Math.sin(t * 1.8) * 0.002,
      target.current.z
    );

    groupRef.current.lookAt(cx, target.current.y, cz);
    groupRef.current.rotateX(-0.5);
    groupRef.current.rotateZ(0.08);
  });

  return (
    <group ref={groupRef} scale={BEE_SCALE}>
      <primitive object={scene} />
    </group>
  );
}

export default function HeroBeeFlowerScene() {
  const flowerPivotRef = useRef(null);
  const [active, setActive] = useState(false);

  return (
    <div className="h-full w-full overflow-visible touch-pan-y">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0.18, 6.8]} fov={30} />

          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 6, 6]} intensity={2.3} />

          <Flower
            onActiveChange={setActive}
            flowerPivotRef={flowerPivotRef}
          />

          <Bee flowerPivotRef={flowerPivotRef} />

          <OrbitControls
            enabled={!active}
            enableRotate={!active}
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.8}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 1.85}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/bee-optimized.glb");
useGLTF.preload("/models/flower-optimized.glb", true);