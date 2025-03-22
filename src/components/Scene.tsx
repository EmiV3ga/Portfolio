import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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

  // Agregar rotación continua
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += 0.005; // Rota el modelo en el eje Y
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.01}
      position={[0, 0.5, 0]} // Ajusta la posición del modelo
    />
  );
}

export default function Scene() {
  return (
    <div className="h-[50vh] w-full bg-gradient-to-b from-primary-dark to-primary">
      <Canvas
        camera={{ position: [2, 2, 5], fov: 50 }} // Ajusta la posición de la cámara
      >
        <ambientLight intensity={0.8} /> {/* Luz ambiental suave */}
        <pointLight position={[5, 5, 5]} intensity={0.5} /> {/* Luz puntual tenue */}
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