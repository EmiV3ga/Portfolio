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
      group.current.rotation.y += 0.1 // Rota el modelo en el eje Y
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.01} // Escala más grande
      position={[0, -0,5, 0]} // Ajusta la posición del modelo (más abajo)
    />
  );
}

export default function Scene() {
  return (
    <div className="h-[60vh] w-%60"> {/* Altura completa de la pantalla */}
      <Canvas
        style={{
          background: 'linear-gradient(45deg, #0B2B26, #163832, #235347, #8EB69B, #DAF1DE)', // Degradado con ángulo de 45°
        }}
        camera={{ position: [0, -0,5, 0], fov: 50 }} // Ajusta la posición de la cámara
      >
        <ambientLight intensity={1.0} /> {/* Más luz ambiental */}
        <pointLight position={[0, -0,5, 0]} intensity={1.0} /> {/* Más luz puntual */}
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