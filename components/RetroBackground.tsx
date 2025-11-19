import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Float, GradientTexture } from '@react-three/drei';
import * as THREE from 'three';

// Moving Grid Component
const RetroGrid = () => {
  const gridRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (gridRef.current) {
      // Move grid towards camera to simulate driving
      gridRef.current.position.z += delta * 10;
      if (gridRef.current.position.z > 20) {
        gridRef.current.position.z = 0;
      }
    }
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <mesh ref={gridRef}>
        <planeGeometry args={[200, 200, 40, 40]} />
        <meshBasicMaterial 
          color="#d946ef" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>
    </group>
  );
};

// A Retro Sun
const Sun = () => {
  return (
    <mesh position={[0, 5, -40]}>
      <circleGeometry args={[15, 32]} />
      <meshBasicMaterial color="#ffaa00">
        <GradientTexture
          attach="map"
          stops={[0, 1]} 
          colors={['#ff0080', '#ffcc00']} 
        />
      </meshBasicMaterial>
    </mesh>
  );
};

// Floating Geometric shapes for ambiance
const FloatingShapes = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[-15, 5, -20]} rotation={[0, 0.5, 0]}>
        <icosahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color="#00f3ff" wireframe />
      </mesh>
      <mesh position={[15, 8, -25]} rotation={[0.5, 0, 0]}>
        <octahedronGeometry args={[3, 0]} />
        <meshStandardMaterial color="#ff00ff" wireframe />
      </mesh>
    </Float>
  );
}

const RetroBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-[#120326] to-[#2d0b4e]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={75} />
        <fog attach="fog" args={['#2d0b4e', 10, 60]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00f3ff" intensity={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sun />
        <RetroGrid />
        <FloatingShapes />
      </Canvas>
    </div>
  );
};

export default RetroBackground;