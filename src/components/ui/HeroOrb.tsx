import { Environment, Float } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

export function OrbMesh() {
  const meshRef = useRef<Mesh>(null);

  // بنجيب أبعاد الـ Viewport الحقيقية للكانفاس
  const { width, height } = useThree((state) => state.viewport);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const time = state.clock.getElapsedTime();
    mesh.rotation.y = time * 0.4;
    mesh.rotation.x = Math.sin(time * 0.3) * 0.15;
  });

  // حساب الحجم المناسب (Radio & Scale) بناءً على أصغر بُعد عشان يفضل متناسق تماماً وما يخرجش بره الشاشة
  const isMobile = width < 6;
  const responsiveScale = isMobile ? Math.min(width, height) * 0.28 : 1.5;

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={responsiveScale}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={0.95}
          roughness={0.05}
          transmission={0.3}
          thickness={3.0}
          ior={2.0}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </Float>
  );
}

export default function HeroOrbCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex h-full w-full items-center justify-center overflow-hidden">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={4} />
        <pointLight position={[0, -4, -2]} intensity={3} color="#6390ff" />
        <pointLight position={[0, 4, 2]} intensity={2} color="#ffffff" />

        <Environment preset="night" />
        <OrbMesh />
      </Canvas>
    </div>
  );
}
