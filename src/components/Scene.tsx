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
      group.current.rotation.y += 0.001; // Rota el modelo en el eje Y
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.01} // Escala moderada
      position={[0, -0.5, 0]} // Ajusta la posición del modelo (más abajo)
    />
  );
}

export default function Scene() {
  return (
    <div className="h-[50vh] w-full"> {/* Altura moderada */}
      <Canvas
        style={{
          background: 'linear-gradient(45deg, #0B2B26, #163832, #235347, #8EB69B, #DAF1DE)', // Degradado con ángulo de 45°
        }}
        camera={{ position: [0, 0, 5], fov: 50 }} // Ajusta la posición de la cámara
      >
        <ambientLight intensity={1.0} /> {/* Luz ambiental */}
        <pointLight position={[5, 5, 5]} intensity={1.0} /> {/* Luz puntual */}
        <Model />
        <OrbitControls
          enableZoom={true} {/* Permitir zoom */}
          minDistance={3} {/* Distancia mínima de la cámara */}
          maxDistance={10} {/* Distancia máxima de la cámara */}
        />
      </Canvas>
    </div>
  );
}