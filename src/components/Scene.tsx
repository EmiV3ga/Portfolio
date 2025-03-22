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
      scale={0.02} // Escala más grande (ajustada)
      position={[0, 0, 0]} // Centrado en la escena (ajustado)
    />
  );
}

export default function Scene() {
  return (
    <div className="h-[50vh] w-full">
      <Canvas
        style={{
          background: 'linear-gradient(45deg, #0B2B26, #163832, #235347, #8EB69B, #DAF1DE)', // Degradado con ángulo de 45° (ajustado)
        }}
        camera={{ position: [2, 2, 5], fov: 50 }} // Ajusta la posición de la cámara
      >
        <ambientLight intensity={1.0} /> {/* Más luz ambiental (ajustada) */}
        <pointLight position={[5, 5, 5]} intensity={1.0} /> {/* Más luz puntual (ajustada) */}
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