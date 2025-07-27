import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// ✨ Galaxy Tunnel
const GalaxyTunnel = () => {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.z += 0.001;
    mesh.current.rotation.x += 0.0005;
  });

  return (
    <mesh ref={mesh} rotation={[0, 0, 0]}>
      <torusGeometry args={[10, 2.5, 16, 100]} />
      <meshStandardMaterial
        color="#9900ff"
        emissive="#cc66ff"
        emissiveIntensity={2}
        side={THREE.DoubleSide}
        wireframe
      />
    </mesh>
  );
};

// 🔲 Glowing Cubes
const GlowingCubes = () => {
  const group = useRef();
  const cubes = useMemo(() => {
    return Array.from({ length: 30 }, () => [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
    ]);
  }, []);

  useFrame(() => {
    group.current.rotation.y += 0.002;
    group.current.rotation.x += 0.001;
  });

  return (
    <group ref={group}>
      {cubes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial
            emissive={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
            emissiveIntensity={2.5}
            color="black"
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
};

// ☄️ Cosmic Dust Particles
const CosmicDust = () => {
  const points = useRef();

  const particles = useMemo(() => {
    const vertices = [];
    for (let i = 0; i < 8000; i++) {
      vertices.push(
        THREE.MathUtils.randFloatSpread(400),
        THREE.MathUtils.randFloatSpread(400),
        THREE.MathUtils.randFloatSpread(400)
      );
    }
    return new THREE.BufferAttribute(new Float32Array(vertices), 3);
  }, []);

  useFrame(() => {
    points.current.rotation.y += 0.0004;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" {...particles} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.4} sizeAttenuation />
    </points>
  );
};

// 🌀 Portal Effect
const PortalEffect = () => {
  const ring = useRef();
  useFrame(() => {
    if (ring.current) {
      ring.current.rotation.z += 0.003;
      ring.current.scale.x = 1 + Math.sin(Date.now() * 0.002) * 0.05;
      ring.current.scale.y = 1 + Math.cos(Date.now() * 0.002) * 0.05;
    }
  });

  return (
    <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -5]}>
      <ringGeometry args={[2.3, 3.5, 64]} />
      <meshBasicMaterial
        color="#ff00ff"
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// 🚀 Main Canvas
const RotatingEarth = () => {
  return (
    <Canvas
      className="absolute inset-0 z-0"
      camera={{ position: [0, 0, 14], fov: 65 }}
    >
      {/* 🌟 Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight color="#00ffff" position={[5, 10, 10]} intensity={1.5} />
      <pointLight color="#ff00ff" position={[-10, -10, -10]} intensity={1.2} />

      {/* 🌌 Background */}
      <Stars radius={120} depth={60} count={10000} factor={5} fade speed={1} />

      <GalaxyTunnel />
      <GlowingCubes />
      <CosmicDust />
      <PortalEffect />

      {/* 🧭 Controls */}
      <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
};

export default RotatingEarth;
