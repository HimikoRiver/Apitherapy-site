"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Float, useGLTF } from "@react-three/drei";

function FlowerScene() {
  const rootRef = useRef(null);
  const { scene } = useGLTF("/models/flower-optimized.glb", true);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.roughness = 0.7;
          child.material.metalness = 0;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (!rootRef.current) return;

    const t = clock.getElapsedTime();

    rootRef.current.rotation.z = -0.08 + Math.sin(t * 0.6) * 0.01;
    rootRef.current.rotation.x = -0.1 + Math.sin(t * 0.5) * 0.005;
  });

  return (
    <group
      ref={rootRef}
      position={[0.08, -0.95, -0.2]}
      rotation={[-0.1, -0.72, -0.08]}
      scale={0.9}
    >
      <Float
        speed={0.35}
        rotationIntensity={0.015}
        floatIntensity={0.015}
        floatingRange={[-0.004, 0.004]}
      >
        <Center bottom>
          <primitive object={scene} />
        </Center>
      </Float>
    </group>
  );
}

export default function FlowerModel() {
  return (
    <Canvas
      shadows
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      camera={{
        position: [0, 0.35, 5.2],
        fov: 27,
      }}
      className="h-full w-full"
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} />
      <pointLight position={[-2, 2, 2]} intensity={0.75} color="#f6c35c" />

      <Suspense fallback={null}>
        <FlowerScene />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/flower-optimized.glb", true);