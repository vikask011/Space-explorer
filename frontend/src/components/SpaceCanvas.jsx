// components/SpaceCanvas.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

const RotatingPlanet = () => {
  const planetRef = useRef();
  const ringRef = useRef();

  useFrame(() => {
    if (planetRef.current) planetRef.current.rotation.y += 0.003;
    if (ringRef.current) ringRef.current.rotation.z += 0.0015;
  });

  return (
    <group>
  


    </group>
  );
};

const SpaceCanvas = () => {
  return (
    <Canvas
      className="absolute inset-0 z-0"
      camera={{ position: [0, 0, 7], fov: 60 }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} />
     <Stars
  radius={100}
  depth={50}
  count={7000}
  factor={5}        // ⬆️ bigger and brighter
  saturation={0.5}     // ⬆️ more vivid
  fade
  speed={0.5}
/>


      <RotatingPlanet />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
};

export default SpaceCanvas;
