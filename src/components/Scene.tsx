import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, useAnimations } from '@react-three/drei';

function Model() {
  const group = useRef(); // Referencia al grupo del modelo
  const { scene, animations } = useGLTF('https://threejs.org/examples/models/gltf/LittlestTokyo.glb');
  const { actions } = useAnimations(animations, group); // Cargar animaciones

  // Reproducir la animación automáticamente
  useEffect(() => {
    if (actions && actions['Take 001']) {
      actions['Take 001'].play(); // Reproduce la animación llamada 'Take 001'
    }
  }, [actions]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.01}
      position={[0, 1, 0]} // Ajusta la posición del modelo
    />
  );
}

export default function Scene() {
  return (
    <div className="h-[50vh] w-full bg-gradient-to-b from-primary-dark to-primary">
      <Canvas
        camera={{ position: [5, 2, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model />
        <OrbitControls
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}