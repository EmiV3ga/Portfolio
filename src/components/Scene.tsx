import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const gltf = useGLTF('https://threejs.org/examples/models/gltf/LittlestTokyo.glb');
  const mixer = useRef(); 

  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={gltf.scene} scale={0.01} position={[0, -1, 0]} />;
}

export default function Scene() {
  return (
    <div className="h-[50vh] w-full bg-gradient-to-b from-primary-dark to-primary">
      <Canvas
        camera={{ position: [5, 2, 5], fov: 50 }} // Ajusta el campo de visión (fov) para controlar el zoom inicial
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model />
        <OrbitControls
          enableZoom={true} // Habilita el zoom con la rueda del mouse
          minDistance={3}  // Distancia mínima de la cámara al objeto
          maxDistance={10} // Distancia máxima de la cámara al objeto
        />
      </Canvas>
    </div>
  );
}