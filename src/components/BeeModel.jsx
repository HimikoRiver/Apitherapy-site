"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";

function Bee() {
  const groupRef = useRef();
  const { scene, animations } = useGLTF("/models/bee.glb");
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (!actions) return;

    Object.values(actions).forEach((action) => {
      if (!action) return;
      action.reset().fadeIn(0.35).play();
    });

    return () => {
      Object.values(actions).forEach((action) => {
        if (!action) return;
        action.fadeOut(0.2);
      });
    };
  }, [actions]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Пчела летает значительно ниже
    groupRef.current.position.y = Math.sin(t * 1.8) * 0.04 - 0.42;
    groupRef.current.position.x = Math.cos(t * 0.9) * 0.06;
    groupRef.current.rotation.z = Math.sin(t * 1.15) * 0.05;
  });

  return (
    <group
      ref={groupRef}
      scale={0.085}
      position={[0.2, -0.42, 0]}
      rotation={[0.1, -1.05, 0.02]}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/bee.glb");

export default function BeeModel() {
  return (
    <div className="h-full w-full overflow-visible">
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0.15, 6.8]} fov={30} />

          <ambientLight intensity={1.55} />
          <directionalLight position={[5, 6, 6]} intensity={2.35} />
          <directionalLight position={[-4, 3, 2]} intensity={1.1} />
          <pointLight position={[0, 1, 4]} intensity={1.0} />
          <pointLight position={[2, -1, 3]} intensity={0.65} />

          <Bee />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.55}
            rotateSpeed={0.75}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 1.85}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}