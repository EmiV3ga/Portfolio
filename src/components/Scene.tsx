import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, useAnimations } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

function Model() {
  const group = useRef();
  const { scene, animations } = useGLTF('https://threejs.org/examples/models/gltf/LittlestTokyo.glb');
  const { actions } = useAnimations(animations, group);

  // Aplicar materiales personalizados
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({
          color: '#8EB69B',
          metalness: 0.5,
          roughness: 0.5,
        });
      }
    });
  }, [scene]);

  // Reproducir la animación automáticamente
  useEffect(() => {
    if (actions && actions['Take 001']) {
      actions['Take 001'].play();
    }
  }, [actions]);

  // Rotación continua
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.01}
      position={[0, 0.5, 0]}
      castShadow
    />
  );
}

export default function Scene() {
  return (
    <div className="h-[50vh] w-full bg-gradient-to-b from-primary-dark to-primary">
      <Canvas
        camera={{ position: [2, 2, 5], fov: 45 }}
        shadows
      >
        {/* Luces */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          color="#ffffff"
          castShadow
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.5}
          color="#ffffff"
        />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#ffffff" />

        {/* Modelo 3D */}
        <Model />

        {/* Plano para sombras */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#163832" />
        </mesh>

        {/* Controles de órbita */}
        <OrbitControls
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}